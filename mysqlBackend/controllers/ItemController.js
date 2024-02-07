const fs = require("fs");
const { db } = require("../config/db");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const JWT = require("jsonwebtoken");
const axios = require("axios");
dotenv.config();

const PORT = process.env.PORT;

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (userId === null || itemId === null) {
      return res.status(500).send("user ID and Item ID are required");
    }

    // Check if the item is already in the cart
    db.query(
      "SELECT * FROM carts WHERE user_id = ? AND item_id = ?",
      [userId, itemId],
      async (selectErr, selectResult) => {
        if (selectErr) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (selectResult && selectResult.length > 0) {
          // Item already exists in the cart
          return res.status(400).json({
            success: false,
            message: "Item already added to the cart.",
          });
        }

        // If the item is not in the cart, insert it
        db.query(
          "INSERT INTO carts (user_id, item_id) VALUES (?, ?)",
          [userId, itemId],
          async (insertErr, result) => {
            if (insertErr) {
              return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
            }

            res.status(200).json({
              success: true,
              message: "Item added to the cart successfully.",
            });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCourse = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const thumbnail = req.file;

    if (!thumbnail) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }
    const imageUrl = `http://localhost:${PORT}/thumbnails/${thumbnail.filename}`;

    db.query(
      "INSERT INTO courses (course_name,	description,	price,	category,	thumbnails) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, category, imageUrl],
      async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Error saving the course" });
        }

        const courseId = result.insertId;
        res.status(201).json({
          success: true,
          message: "Course created successfully.",
          courseId: courseId,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    db.query("SELECT * FROM courses", async (err, result) => {
      if (err) {
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      res.status(200).json(result);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const coursePage = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    db.query(
      "SELECT * FROM courses WHERE course_id = ?",
      [courseId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const editCourse = async (req, res) => {
  console.log(req);
  try {
    const courseId = req.params.courseId;
    const { name, description, price, category } = req.body;
    const thumbnail = req.file;

    console.log("140", req.file);
    // console.log(req.body);
    console.log(thumbnail);
    if (!thumbnail) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }
    const imageUrl = `http://localhost:${PORT}/thumbnails/${thumbnail.filename}`;

    db.query(
      "SELECT * FROM courses WHERE course_id = ?",
      [courseId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (result.length === 0) {
          res.status(404).json({ success: false, message: "Course not found" });
        }

        const existingCourse = result[0];
        db.query(
          "UPDATE courses SET course_name = ?, description = ?, price = ?, category = ?,thumbnails = ? WHERE course_id = ?",
          [name, description, price, category, imageUrl, courseId],
          async (err, result) => {
            if (err) {
              res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
            }

            return res
              .status(200)
              .json({ success: true, course: existingCourse.course_id });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    db.query(
      "SELECT * FROM courses WHERE course_id = ?",
      [courseId],
      async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Course not found" });
        }

        db.query(
          "DELETE FROM courses WHERE course_id = ?",
          [courseId],
          async (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Error while deleting course",
              });
            }

            res.status(200).json({
              success: true,
              message: "Course deleted successfully",
              courseId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log("error :", error);
  }
};

const addCourseVideos = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, chapterID, duration, description } = req.body;
    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const videoUrl = `http://localhost:${PORT}/videoCourse/${videoFile.filename}`;
    console.log(videoUrl);

    db.query(
      "INSERT INTO course_videos (course_id,	title, chapter_id, video_url,	duration,	description	) VALUES (?, ?, ?, ?, ?, ?)",
      [courseId, title, chapterID, videoUrl, duration, description],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        const videoID = result.insertId;

        res.status(200).json({
          success: true,
          message: "Video added to the course successfully.",
          videoId: videoID,
          result: result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addChapters = (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { chapterName } = req.body;
    const wordFile = req.file;
    if (!wordFile) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const wordFileUrl = `http://localhost:${PORT}/videoCourse/${wordFile.filename}`;
    console.log(wordFileUrl);

    db.query(
      "INSERT INTO chapters (course_id,	ch_name,	question_sheet	) VALUES (?, ?, ?)",
      [courseId, chapterName, wordFileUrl],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        const fileID = result.insertId;

        res.status(200).json({
          success: true,
          message: "Video added to the course successfully.",
          fileID: fileID,
          result: result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const videoListViaCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    db.query(
      "SELECT * FROM course_videos WHERE course_id = ?",
      [courseId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        res.status(200).json({ success: true, message: result });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (userId === null || itemId === null) {
      return res.status(500).send("user ID and Item ID are required");
    }

    const getQuery = `SELECT * FROM wishlists WHERE user_id = ? AND item_id = ?`;
    db.query(getQuery, [userId, productId], (err, result) => {
      if (err) {
        return res.status(400).send(err);
      }
      if (result && result.length > 0) {
        return res.status(400).send("item is already in the wishlist");
      }

      const insertQuery = `INSERT INTO wishlists (user_id, item_id) VALUES (?, ?)`;
      db.query(insertQuery, [userId, productId], (insertErr, insertResult) => {
        if (insertErr) {
          return res.status(400).send(err);
        } else {
          return res.status(200).send("Item Added Successfully");
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;

    db.query(
      "SELECT * FROM wishlists WHERE user_id = ?",
      [userId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }
        res.status(200).json({ success: true, message: result });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// const addtocartBack = async (req, res) => {
//   try {
//     const { userId, productId } = req.params;

//     db.query(
//       "SELECT * FROM carts WHERE user_id = ?",
//       [userId],
//       async (err, result) => {
//         if (err) {
//           res
//             .status(500)
//             .json({ success: false, message: "Internal Server Error" });
//         }

//         if (result.length === 0) {
//           await db.query("INSERT INTO carts (user_id,	item_id) VALUES (?,?)", [
//             userId,
//             productId,
//           ]);
//         } else {
//           const isProductInCart = result[0].item_id.includes(productId);
//           if (!isProductInCart) {
//             await db.query(
//               "UPDATE carts SET item_id = CONCAT(item_id, ',',?) WHERE user_id = ?",
//               [userId, productId]
//             );
//           }
//         }
//         res.status(201).json({
//           success: true,
//           message: "Product added to cart successfully",
//           result,
//         });
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    db.query(
      "SELECT * FROM carts WHERE user_id =?",
      [userId],
      async (err, result) => {
        if (err) {
          res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({ success: true, message: result });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllChaptersViaCourse = (req, res) => {
  try {
    const courseId = req.params.courseId;
    db.query(
      "SELECT * FROM chapters WHERE course_id = ?",
      [courseId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        res.status(200).json({ success: true, message: result });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllVideosViaCourseIdChapterId = (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;

    db.query(
      "SELECT * FROM course_videos WHERE course_id = ? AND chapter_id = ?",
      [courseId, chapterId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        res.status(200).json({ success: true, message: result });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const downloadQuestionSheet = (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    db.query(
      "SELECT * FROM chapters WHERE course_id = ? AND ch_id = ?",
      [courseId, chapterId],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        } else {
          const questionSheetUrl = result[0].question_sheet;
          const fileExtension = questionSheetUrl.split(".").pop().toLowerCase();
          try {
            let contentType = "application/pdf";
            const response = await axios.get(questionSheetUrl, {
              responseType: "stream",
            });
            res.setHeader(
              "Content-Disposition",
              `attachment; filename=Question-paper.${fileExtension}`
            );
            res.setHeader("Content-Type", contentType);

            // Pipe the response data stream to the response object
            response.data.pipe(res);
          } catch (downloadError) {
            console.error("Error downloading birth certificate:");
            res
              .status(500)
              .json({ error: "Error downloading birth certificate" });
          }
        }

        // res.status(200).json({ success: true, message: result });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const UploadAnswerSheet = (req, res) => {
  try {
    const courseId = req.params.courseId;
    const chapterId = req.params.chapterId;
    const studentId = req.params.studentId;
    const ansFile = req.file;
    if (!ansFile) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const answerUrl = `http://localhost:${PORT}/answerFolder/${ansFile.filename}`;
    console.log(answerUrl);

    db.query(
      "INSERT INTO answer_table (course_id,	ch_id, student_id, answer_sheet	) VALUES (?, ?, ?, ?)",
      [courseId, chapterId, studentId, answerUrl],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }

        const answerID = result.insertId;

        res.status(200).json({
          success: true,
          message: "answer added successfully.",
          answerID: answerID,
          result: result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const BoughtCourses = (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;
    const student_email = req.body;

    db.query(
      "INSERT INTO bought_courses (user_id	course_id	student_email	) VALUES (?, ?, ?)",
      [userId, courseId, student_email],
      async (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        res.status(200).json({
          success: true,
          message: "Course successfully Purchased",
          result: result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const CoursePayment = async (req, res) => {
  try {
    const {
      student_id,
      student_name,
      course_id,
      student_email,
      amount,
      status,
    } = req.body;
    console.log(status, "status 1118");
    // Retrieve the highest receipt number from the database
    const receiptQuery =
      "SELECT MAX(CAST(SUBSTRING_INDEX(receipt, '/', -1) AS SIGNED)) AS maxReceiptNum FROM bought_courses";

    // console.log("Receipt Query:", receiptQuery);
    db.query(receiptQuery, (receiptErr, receiptResult) => {
      if (receiptErr) {
        console.error("Error retrieving receipt:", receiptErr);
        res.status(500).json({ error: "Failed to create order" });
        return;
      }

      const maxReceiptNum = receiptResult[0].maxReceiptNum || 0;
      const newReceiptNum = maxReceiptNum + 1;
      console.log(newReceiptNum, "849");
      const newReceipt = `FRCP/2024-25/${newReceiptNum}`;

      // Retrieve the highest pay_id from the database with the '23_24' prefix
      const newPayIdQuery =
        "SELECT MAX(CAST(SUBSTRING_INDEX(buy_id, '/', -1) AS SIGNED)) AS maxPayIdNum FROM bought_courses";
      db.query(newPayIdQuery, (newPayIdErr, newPayIdResult) => {
        if (newPayIdErr) {
          console.error("Error retrieving maxPayIdNum:", newPayIdErr);
          res.status(500).json({ error: "Failed to create order" });
          return;
        }

        const maxPayIdNum = newPayIdResult[0].maxPayIdNum;
        console.log(maxPayIdNum, "626");
        const newPayIdNum = maxPayIdNum + 1;
        console.log(newPayIdNum, "628");
        const newPayId = `FRM/2024-25/${newPayIdNum}`;

        // Insert the new order with the generated receipt and updated pay_id
        const insertQuery =
          "INSERT INTO bought_courses (buy_id, student_id, student_name, course_id,	student_email, receipt, amount,	status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
          insertQuery,
          [
            newPayId,
            student_id,
            student_name,
            JSON.stringify(course_id),
            student_email,
            newReceipt,
            amount,
            status,
          ],
          (insertErr, insertResult) => {
            if (insertErr) {
              console.error("Error creating order:", insertErr);
              res.status(500).json({ error: "Failed to create order" });
              // logger.registrationLogger.log(
              //   "error",
              //   "Failed to create order",
              //   error
              // );
            } else {
              const orderId = insertResult.insertId;
              const order = {
                id: orderId,
                name: student_name,
                receipt: newReceipt,
                amount: amount,
                currency: "INR",
                status: status,
              };
              res.status(201).send(order);
              // logger.registrationLogger.log(
              //   "info",
              //   "Payment order created",
              //   order
              // );
            }
          }
        );
      });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
    // logger.registrationLogger.log("error", "Failed to create order", error);
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { paymentId, receipt } = req.body;
    db.query(
      "SELECT * FROM bought_courses WHERE receipt = ?",
      [receipt],
      (err, result) => {
        if (err) {
          console.log(err, "715");
        } else {
          console.log(result.length, "717");
          if (result.length === 0) {
            return res.status(400).json({
              success: false,
              message:
                "Receipt not found in the database. Payment cannot be verified.",
            });
          } else {
            db.query(
              "UPDATE bought_courses SET rzrpay_id = ? WHERE receipt = ?",
              [paymentId, receipt],
              (err, result) => {
                if (err) {
                  res.status(400).json({ message: err });
                } else {
                  res.status(200).json({
                    status: "success",
                    message: "PaymentId added to existing receipt",
                    id: paymentId,
                  });
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateStatus = (req, res) => {
  try {
    const id = req.params.orderId;
    const statusText = req.body.status;
    console.log(id, statusText, "720");
    const updateQuery =
      "UPDATE bought_courses SET status = ? WHERE rzrpay_id = ?";

    db.query(updateQuery, [statusText, id], (err, result) => {
      if (err) {
        console.error("Error updating status:", err);
        res.status(500).send("Error updating status");
      } else {
        console.log("status updated successfully");
        res.send("status updated successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCart = (req, res) => {
  try {
    const id = req.params.userId;
    const deleteQuery = "DELETE FROM carts WHERE user_id = ?";
    db.query(deleteQuery, [id], (err, results) => {
      if (err) {
        console.error("Error executing DELETE query:", err);
        return res.status(500).json({ error: "Database query error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "user not found" });
      }

      return res.status(200).json({ message: "cart deleted successfully" });
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to delete cart" });
  }
};

const PurchasedCourseViaUser = (req, res) => {
  try {
    const studentId = req.params.id;
    db.query(
      "SELECT * FROM bought_courses WHERE student_id = ?",
      [studentId],
      (err, result) => {
        if (err) {
          console.log(err, "800");
          return res.status(500).json({ err });
        } else {
          console.log(result.length, "803");
          return res.status(200).json({ result });
        }
      }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const deleteCourseFromWishlist = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    db.query(
      "SELECT * FROM wishlists WHERE item_id = ?",
      [courseId],
      async (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal Server Error" });
        }

        if (result.length === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Course not found" });
        }

        db.query(
          "DELETE FROM wishlists WHERE item_id = ?",
          [courseId],
          async (err, result) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: "Error while deleting course",
              });
            }

            res.status(200).json({
              success: true,
              message: "Course deleted successfully",
              courseId,
            });
          }
        );
      }
    );
  } catch (error) {
    console.log("error :", error);
  }
};

module.exports = {
  addToCart,
  createCourse,
  getAllCourses,
  // thumbnail,
  coursePage,
  editCourse,
  deleteCourse,
  addCourseVideos,
  videoListViaCourseId,
  addToWishlist,
  getWishlistItems,
  // addtocartBack,
  getCartItems,
  addChapters,
  getAllChaptersViaCourse,
  getAllVideosViaCourseIdChapterId,
  downloadQuestionSheet,
  UploadAnswerSheet,
  BoughtCourses,
  CoursePayment,
  verifyPayment,
  updateStatus,
  deleteCart,
  PurchasedCourseViaUser,
  deleteCourseFromWishlist,
};
