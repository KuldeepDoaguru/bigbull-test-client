const fs = require("fs");
const { db } = require("../config/db");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity, price } = req.body;

    // Check if the user's cart exists; create it if not
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [],
      });
    }

    // Add the item to the cart
    cart.items.push({
      product: productId,
      quantity,
      price,
    });

    await cart.save();

    res.status(201).json({ message: "Item added to the cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCourse = async (req, res) => {
  try {
    // Extract course data from the request body
    const { name, description, price, category } = req.body;

    // Get the uploaded file (thumbnail)
    const thumbnails = req.file;
    console.log(thumbnails.filename, "40");

    if (!thumbnails) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }
    const imageUrl = `http://localhost:6600/thumbnails/${thumbnails.filename}`;

    const values = [name, description, price, category, imageUrl];
    const insertQuery = `INSERT INTO courses (course_name, description, price, category, thumbnails) VALUES (?, ?, ?,?, ?)`;

    db.query(insertQuery, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllCourses = async (req, res) => {
  try {
    db.query("SELECT * FROM courses", (err, result) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch data" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const thumbnail = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);

    console.log("Course:", course);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("Thumbnails:", course.thumbnails);

    if (!course.thumbnails || course.thumbnails.length === 0) {
      return res.status(404).json({ error: "Course thumbnails not found" });
    }

    // Send the image data as the response
    res.send(course.thumbnails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const coursePage = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const getQuery = `SELECT * FROM courses WHERE course_id = ?`;
    db.query(getQuery, courseId, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Invalid course ID" });
      }
      if (result.length === 0) {
        res.status(404).json({ error: "Failed to fetch Data" });
      } else {
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { name, description, price, category } = req.body;
    const thumbnails = req.file;
    console.log(thumbnails.filename, "40");

    if (!thumbnails) {
      return res.status(400).json({ error: "Thumbnail is required" });
    }
    const imageUrl = `http://localhost:6060/thumbnails/${thumbnails.filename}`;

    const getQuery = `SELECT * FROM courses WHERE course_id = ?`;
    db.query(getQuery, courseId, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Invalid Course ID" });
      }
      if (result && result.length > 0) {
        const updateFields = [];
        const updateValues = [];

        if (name) {
          updateFields.push("course_name = ?");
          updateValues.push(name);
        }

        if (description) {
          updateFields.push("description = ?");
          updateValues.push(description);
        }

        if (price) {
          updateFields.push("price = ?");
          updateValues.push(price);
        }

        if (category) {
          updateFields.push("category = ?");
          updateValues.push(category);
        }

        if (thumbnails) {
          updateFields.push("thumbnails = ?");
          updateValues.push(imageUrl);
        }

        const updateQuery = `UPDATE courses SET ${updateFields.join(
          ", "
        )} WHERE course_id = ?`;

        db.query(updateQuery, [...updateValues, courseId], (err, result) => {
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
          message: "User not found",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    // Find the existing course by ID
    const existingCourse = await Course.findById(courseId);
    if (!existingCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    // Delete the existing course
    await existingCourse.deleteOne();
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log("error :", error);
  }
};

const addCourseVideos = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, duration, category, description } = req.body;
    const videoFile = req.file; // The uploaded video file

    if (!videoFile) {
      return res.status(400).json({ error: "Video file is required" });
    }

    // Ensure that "url" is set to "videoFile.filename"
    const videoUrl = videoFile.originalname;

    // Create a new video object
    const video = {
      title,
      url: videoUrl,
      duration,
      description,
      category,
    };

    // Find the course by ID and push the new video to its 'videos' array
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    course.videos.push(video);

    // Save the updated course document
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const videoListViaCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    console.log(courseId);
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.send(course.videos);
    console.log(course.videos);
    console.log(course);
  } catch (error) {
    console.log(error);
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the user's wishlist or create a new one if it doesn't exist
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        items: [productId],
      });
    } else {
      // Check if the product is already in the wishlist
      if (!wishlist.items.includes(productId)) {
        wishlist.items.push(productId);
      }
    }

    await wishlist.save();

    res
      .status(201)
      .json({ message: "Product added to the wishlist successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({ error: "Item not found in the wishlist" });
    }

    return res.status(200).json({ wishlist });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addtocartBack = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the user's wishlist or create a new one if it doesn't exist
    let wishlist = await Cart.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Cart({
        user: userId,
        items: [productId],
      });
    } else {
      // Check if the product is already in the wishlist
      if (!wishlist.items.includes(productId)) {
        wishlist.items.push(productId);
      }
    }

    await wishlist.save();

    res.status(201).json({ message: "Product added to the cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const CartItem = await Cart.findOne({ user: userId });

    if (!CartItem) {
      return res.status(404).json({ error: "Item not found in the Cart" });
    }

    return res.status(200).json({ CartItem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const LeaderBoardData = (req, res) => {
  try {
    const getQuery = `SELECT * FROM register
    JOIN bought_courses ON register.id = bought_courses.student_id`;
    db.query(getQuery, (err, result) => {
      if (err) {
        res.status(500).json({ error: "failed to fetch data" });
      } else {
        res.status(200).json({ result });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addToCart,
  createCourse,
  getAllCourses,
  thumbnail,
  coursePage,
  editCourse,
  deleteCourse,
  addCourseVideos,
  videoListViaCourseId,
  addToWishlist,
  addtocartBack,
  getCartItems,
  getWishlistItems,
  LeaderBoardData,
};
