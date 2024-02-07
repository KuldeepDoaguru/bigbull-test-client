const mysql = require("mysql");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const JWT = require("jsonwebtoken");
const { db } = require("../config/db");

dotenv.config();

const PORT = process.env.PORT;

const registerController = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      gender,
      password,
      cpassword,
      country,
      state,
      city,
      address,
      dob,
      refferelCode,
    } = req.body;

    const profilePicture = req.file;
    console.log(profilePicture, "pro");
    if (!profilePicture) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const imageUrl = `http://localhost:${PORT}/profilePicture/${profilePicture.originalname}`;

    console.log("Received request:", req.body);
    console.log("profilePicture:", imageUrl);

    // Validations
    const requiredFields = [
      name,
      email,
      gender,
      password,
      cpassword,
      phone,
      country,
      state,
      city,
      address,
      dob,
    ];
    if (requiredFields.some((field) => !field)) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== cpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Hash the "password" and "cpassword"
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const hashedCPassword = bcrypt.hashSync(cpassword, saltRounds);

    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM register WHERE email = ?";
    console.log("email", email);

    db.query(checkUserQuery, [email], (err, result) => {
      if (err) {
        console.error("Error checking if user exists in MySQL:", err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        // Check if there are any rows in the result
        if (result.length > 0) {
          return res.status(400).send("User already exists.");
        } else {
          // User not found, proceed with registration
          const insertUserQuery = `
            INSERT INTO register (
              name, email, phone, gender, password, cpassword, country, state, city, address, dob, profile_picture, refferel_code
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const insertUserParams = [
            name,
            email,
            phone,
            gender,
            hashedPassword,
            hashedCPassword,
            country,
            state,
            city,
            address,
            dob,
            imageUrl,
            refferelCode,
          ];

          db.query(
            insertUserQuery,
            insertUserParams,
            (insertErr, insertResult) => {
              if (insertErr) {
                console.error("Error inserting user:", insertErr);
                res.status(500).json({ error: "Internal server error" });
              } else {
                console.log("User registered successfully");
                return res.status(200).json({
                  success: true,
                  message: "User registered successfully",
                });
              }
            }
          );
        }
      }
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check user in MySQL
    const checkUserQuery = "SELECT * FROM register WHERE email = ?";
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error checking user in MySQL:", err);
        return res.status(500).send({
          success: false,
          message: "Internal server error",
          error: err,
        });
      }

      console.log(results.length, "157");
      if (results.length === 0) {
        return res.status(404).send("Email is not registered");
      }

      const user = results[0];

      // Compare passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).send("Invalid Password");
      }

      // Generate token
      const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(200).send({
        success: true,
        message: "Login successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
        token,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in login", error });
  }
};

const sendOtp = (req, res) => {
  const { email } = req.body;

  // random otp
  function generateOTP(length) {
    const chars = "0123456789";
    let otp = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      otp += chars[randomIndex];
    }

    return otp;
  }

  const OTP = generateOTP(6);

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${OTP}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json("An error occurred while sending the email.");
      } else {
        console.log("OTP sent:", info.response);

        // Assuming you have a 'db' object for database operations
        db.query(
          "INSERT INTO otpcollections (email, code) VALUES (?, ?) ON DUPLICATE KEY UPDATE code = VALUES(code)",
          [email, OTP],
          (err, result) => {
            if (err) {
              console.error(err);
              return res.status(500).send({ message: "Failed to store OTP" });
            }

            res.status(200).json({ message: "OTP sent successfully" });
          }
        );
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred.");
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, password, cpassword, otp } = req.body;

    if (!email || !password || !cpassword || !otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid email, password, or OTP",
      });
    }

    // Fetch the user based on the provided email
    db.query(
      "SELECT * FROM register WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: false,
            message: "Error fetching user",
            error: err.message,
          });
        }

        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        const user = result[0];

        // Check if OTP is valid
        db.query(
          "SELECT * FROM otpcollections WHERE email = ? AND code = ?",
          [email, otp],
          (err, result) => {
            if (err) {
              return res.status(400).json({
                success: false,
                message: "Invalid OTP",
              });
            }
          }
        );

        // Hash both the "password" and "cpassword"
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const hashedCPassword = await bcrypt.hash(cpassword, saltRounds);

        // Update password and cpassword in the users table
        db.query(
          "UPDATE register SET password = ?, cpassword = ? WHERE id = ?",
          [hashedPassword, hashedCPassword, user.id],
          (updateErr, updateResult) => {
            if (updateErr) {
              console.error(updateErr);
              return res.status(500).json({
                success: false,
                message: "Error updating password",
                error: updateErr.message,
              });
            }

            // Delete the used OTP from the otp table
            db.query(
              "DELETE FROM otpcollections WHERE email = ?",
              [email],
              (deleteErr) => {
                if (deleteErr) {
                  console.error(deleteErr);
                  return res.status(500).json({
                    success: false,
                    message: "Error deleting OTP",
                    error: deleteErr.message,
                  });
                }

                res.status(200).json({
                  success: true,
                  message: "Password Reset Successfully",
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const manageUsers = async (req, res) => {
  db.query("SELECT * FROM register", (error, results) => {
    if (error) {
      console.error(error);
    } else {
      res.send(results);
    }
  });
};

const updateUsers = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phone, gender, country, state, city, address, dob } =
      req.body;

    const profilePicture = req.file;
    console.log(profilePicture.filename, "pro");
    // if (!profilePicture) {
    //   return res.status(400).json({ error: "No file uploaded." });
    // }

    const imageUrl = `http://localhost:${PORT}/profilePicture/${profilePicture?.filename}`;

    db.query(
      `SELECT * FROM register WHERE id = ?`,
      [userId],
      async (err, result) => {
        if (err) {
          return res.status(404).send({
            success: false,
            message: "User not found",
          });
        }
        if (result && result.length > 0) {
          const updateFields = [];
          const updateValues = [];

          if (name) {
            updateFields.push("name = ?");
            updateValues.push(name);
          }

          if (email) {
            updateFields.push("email = ?");
            updateValues.push(email);
          }

          if (phone) {
            updateFields.push("phone = ?");
            updateValues.push(phone);
          }

          if (gender) {
            updateFields.push("gender = ?");
            updateValues.push(gender);
          }

          if (country) {
            updateFields.push("country = ?");
            updateValues.push(country);
          }

          if (state) {
            updateFields.push("state = ?");
            updateValues.push(state);
          }

          if (city) {
            updateFields.push("city = ?");
            updateValues.push(city);
          }

          if (address) {
            updateFields.push("address = ?");
            updateValues.push(address);
          }

          if (dob) {
            updateFields.push("dob = ?");
            updateValues.push(dob);
          }

          if (profilePicture) {
            updateFields.push("profile_picture = ?");
            updateValues.push(imageUrl);
          }

          console.log(updateFields, "447");
          if (updateFields.length === 0) {
            return res.status(400).json({
              success: false,
              message: "No fields to update",
            });
          }

          const updateQuery = `UPDATE register SET ${updateFields.join(
            ", "
          )} WHERE id = ?`;

          db.query(updateQuery, [...updateValues, userId], (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Failed to update details",
              });
            } else {
              return res.status(200).json({
                success: true,
                message: "Details updated successfully",
              });
            }
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "failed to update data",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getUserViaId = async (req, res) => {
  try {
    const { id } = req.params;
    db.query(
      `SELECT register.*, user_bio.bio
    FROM register
    LEFT JOIN user_bio ON register.id = user_bio.user_id
    WHERE register.id = ?`,
      [id],
      (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error retrieving user: " + err.message,
          });
        }
        // Check if user with the given ID exists
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
        res.status(200).json({
          success: true,
          user: result[0], // Assuming you want to send the first user if found
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const AdminRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query(
      "SELECT * FROM admin_register WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: "false", message: "internal server error" });
        }
        if (result.length > 0) {
          return res.status(200).json({
            success: "false",
            message: "Admin already registered, Please login",
          });
        }

        const insertUserParams = [email, hashedPassword, "notactive"];
        db.query(
          "INSERT INTO admin_register (email, password, status) VALUES(?,?, ?)",
          insertUserParams,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({
                success: false,
                message: "Error registering admin user",
              });
            }
            res.status(201).json({
              success: true,
              message: "Admin registered successfull",
              adminuser: {
                id: result.insertId,
                email,
                status: "notactive",
              },
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const adminLoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    db.query(
      "SELECT * FROM admin_register WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Email is not registered",
          });
        }

        const user = result[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(200).json({
            success: "false",
            message: "Invalid password",
          });
        }

        const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          success: "true",
          message: "Login successful",
          user: {
            id: user.admin_id,
            email: user.email,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: "false", message: "Login failed", error: error });
  }
};

// otpsend and update
// function generateOTP() {
//   const digits = "0123456789";
//   let otp = "";
//   for (let i = 0; i < 6; i++) {
//     const randomIndex = Math.floor(Math.random() * 10);
//     otp += digits[randomIndex];
//   }
//   return otp;
// }

// const saveOrUpdateOTP = async (email, otp) => {
//   try {
//     const [existingOTP = []] = await db.query(
//       "SELECT * FROM otpcollections WHERE email = ? ",
//       [email]
//     );

//     const expiresIn = new Date(Date.now() + 5 * 60 * 1000).toISOString();

//     if (existingOTP.length > 0) {
//       await db.query(
//         "UPDATE otpcollections SET code = ?, expiresIn = ? WHERE email = ?",
//         [otp, expiresIn, email]
//       );
//     } else {
//       const createdAt = new Date().toISOString();
//       await db.query(
//         "INSERT INTO otpcollections (email, code, expiresIn, createdAt) VALUES (?, ?, ?, ?)",
//         [email, otp, expiresIn, createdAt]
//       );
//     }
//   } catch (error) {
//     console.error("Error saving or updating OTP:", error);
//     throw error;
//   }
// };

const sendOtpAdmin = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a 6-digit OTP
    const otp = generateOTP();

    // Save or update the OTP in the database
    await saveOrUpdateOTP(email, otp);

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "OTP for Admin Login",
      text: `Hello Admin,\n\nYour OTP for Admin Login is: ${otp}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: " + error);
        res.status(500).json({ error: "Failed to send OTP" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error: " + error);
    res.status(500).json({ error: "An error occurred" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    db.query(
      "SELECT * FROM otpcollections WHERE email = ? AND code = ?",
      [email, otp],
      async (err, result) => {
        console.log("result: ", result);
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
        if (result.length > 0) {
          return res.status(200).json({
            success: true,
            message: "OTP verification success",
          });
        } else {
          return res.status(404).json({
            success: false,
            message: "Invalid email or OTP",
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateAdminPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid email, password, or OTP",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.query(
      "SELECT * FROM admin_register WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "user not found" });
        }

        const user = result[0];

        db.query(
          "UPDATE admin_register SET password = ? WHERE email = ?",
          [hashedPassword, email],
          (err) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
            }

            res
              .status(200)
              .json({ success: true, message: "successfully updated" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const updateProfilePicture = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profilePicture = req.file.filename;
    console.log(profilePicture);

    if (!profilePicture) {
      return res
        .status(400)
        .json({ error: "Please provide a valid profile picture." });
    }

    const imageUrl = `http://localhost:${PORT}/profilePicture/${profilePicture}`;

    db.query(
      "SELECT * FROM register WHERE id = ?",
      [userId],
      async (err, result) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .json({ status: "false", message: "Internal Server Error" });
        }
        if (result.length === 0) {
          return res.status(404).json({ error: "user not found" });
        }

        const user = result[0];

        db.query(
          "UPDATE register SET profile_picture = ? WHERE id = ?",
          [imageUrl, userId],
          async (err, result) => {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .json({ success: false, message: "Internal server error" });
            }
            return res
              .status(200)
              .json({ success: true, message: "Profile updated successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const profilePictureView = async (req, res) => {
  try {
    const userId = req.params.userId;

    db.query(
      "SELECT * FROM register WHERE id = ?",
      [userId],
      async (err, result) => {
        if (err) {
          res.status(500).json({ status: "false", message: "Invalid User ID" });
        }

        if (result.length === 0) {
          return res
            .status(404)
            .json({ status: "false", message: "User not found" });
        }

        const user = result[0];

        console.log("user:", user);
        if (!user.profile_picture || user.profile_picture.length === 0) {
          return res.status(404).json({
            status: "false",
            message: "users profile picture not found",
          });
        }

        res.send(result.profile_picture);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const contactRequest = async (req, res) => {
  try {
    const { email, name, message, number } = req.body;

    if (!email || !name || !message || !number) {
      return res
        .status(400)
        .json({ error: "Missing required fields in the request." });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAILSENDER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    console.log("email", email);
    const mailOptions = {
      from: process.env.EMAILSENDER,
      to: email,
      subject: "Enquiry from website",
      text: `Hello ${name},\n\nYou wrote: "${message}"\n\nYour contact number is: ${number}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.response);

    // Save data to the database
    const insertQuery = `INSERT INTO inquiry_mail (name, email, mobile, message) VALUES (?, ?, ?, ?)`;
    const values = [name, email, number, message];

    const result = await db.query(insertQuery, values);

    console.log("Data saved to the database:", result);

    res.status(200).send("Email sent and data saved successfully!");
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
};

const addUserBio = (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  try {
    const getQuery = `SELECT * FROM user_bio WHERE user_id = ?`;
    db.query(getQuery, id, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid ID" });
      }
      if (result.length > 0) {
        res.status(500).json({ message: "BIO already exists" });
      } else {
        const insertQuery = "INSERT INTO user_bio (user_id, bio) VALUES (?, ?)";
        db.query(insertQuery, [id, text], (resErr, resResult) => {
          if (resErr) {
            console.error(resErr); // Log the actual error for debugging
            res
              .status(500)
              .json({ message: "Error creating bio", error: resErr.message });
          } else {
            res.status(200).json({ resResult });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while saving data to the database");
  }
};

const updateUserBio = (req, res) => {
  const id = req.params.id;
  const newText = req.body.text;
  try {
    const getQuery = `SELECT * FROM user_bio WHERE user_id = ?`;
    db.query(getQuery, id, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid ID" });
      }
      if (result && result.length > 0) {
        const updateQuery = `UPDATE user_bio SET bio = ? WHERE user_id = ?`;
        db.query(updateQuery, [newText, id], (resErr, resResult) => {
          if (resErr) {
            res.status(500).json({ error: "Error updating bio" });
          } else {
            res.status(200).json({ message: "Bio updated successfully" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while updating");
  }
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  try {
    const deleteQuery = `DELETE FROM register WHERE id = ?`;
    db.query(deleteQuery, id, (err, result) => {
      if (err) {
        res.status(500).send("invalid user ID");
      }
      res.status(500).send("User Deleted Successfully");
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while deleting");
  }
};

const getUserDeleteReason = (req, res) => {
  const id = req.params.id;
  const text = req.body.text;
  try {
    const insertQuery = `INSERT INTO account_delete_reason (user_id, reason) VALUES (?,?)`;
    db.query(insertQuery, [id, text], (err, result) => {
      if (err) {
        res.status(500).json({ error: "Invalid ID" });
      } else {
        res.status(200).json({ message: "Reason Submitted successfully" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerController,
  loginController,
  sendOtp,
  updatePassword,
  manageUsers,
  updateUsers,
  getUserViaId,
  AdminRegister,
  adminLoginUser,
  verifyOtp,
  updateAdminPassword,
  updateProfilePicture,
  profilePictureView,
  contactRequest,
  addUserBio,
  updateUserBio,
  deleteUser,
  getUserDeleteReason,
};
