import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";

// [GET] /api/users
const getAllUsers = async (req, res, next) => {
  try {
    const filter = req.query.search;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" }; // i => Không phân biệt hoa thường
    }

    let query = UserModel.find(where); // KHông cần dùng await
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await UserModel.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: "descending" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// [POST] /api/users/register
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if the user exists or not
    let user = await UserModel.findOne({ email });

    if (user) {
      // return res.status(400).json({ message: "User have already registered" });
      throw new Error("User have already registered");
    }

    // Create a new user
    user = await UserModel.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      password: user.password,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    // return res.status(500).json({ message: error.message });
    next(error);
  }
};

// [POST] api/users/login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Email not found");
    }

    if (await user.comparePassword(password)) {
      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Email or Password Invalid");
    }
  } catch (error) {
    next(error);
  }
};

// [GET] api/users/profile
const userProfile = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user._id); // req.user (authMiddleware)

    if (user) {
      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// // [PUT] api/users/update-profile
// const updateProfile = async (req, res, next) => {
//   try {
//     // Lấy userId cần cập nhật từ tham số URL
//     const userIdToUpdate = req.params.userId;

//     // Lấy userId của người dùng hiện tại từ đối tượng req.user
//     let userId = req.user._id;

//     // Kiểm tra nếu người dùng hiện tại không phải là admin và userId hiện tại không trùng với userId cần cập nhật
//     if (!req.user.admin && userId !== userIdToUpdate) {
//       let error = new Error("Forbidden resource"); // Tạo lỗi với thông báo "Forbidden resource"
//       error.statusCode = 403; // Đặt mã trạng thái lỗi là 403 (Forbidden)
//       throw error; // Ném lỗi để chặn tiếp tục xử lý
//     }

//     // Tìm người dùng cần cập nhật trong cơ sở dữ liệu
//     let user = await UserModel.findById(userIdToUpdate);

//     // Nếu không tìm thấy người dùng, ném lỗi "User Not Found"
//     if (!user) {
//       throw new Error("User Not Found");
//     }

//     // Kiểm tra nếu thuộc tính 'admin' có tồn tại trong body của yêu cầu và người dùng hiện tại là admin
//     if (typeof req.body.admin !== "undefined" && req.user.admin) {
//       // Nếu điều kiện thỏa mãn, cập nhật thuộc tính 'admin' của người dùng cần cập nhật
//       user.admin = req.body.admin;
//     }

//     // Lấy thông tin cần cập nhật từ body của yêu cầu
//     const { name, email, password } = req.body;
//     user.name = name || user.name; // Cập nhật tên người dùng nếu có, ngược lại giữ nguyên
//     user.email = email || user.email; // Cập nhật email người dùng nếu có, ngược lại giữ nguyên

//     // Kiểm tra nếu thuộc tính 'admin' có tồn tại trong body của yêu cầu và người dùng hiện tại là admin
//     if (typeof req.body.admin !== "undefined" && req.user.admin) {
//       // Nếu điều kiện thỏa mãn, cập nhật thuộc tính 'admin' của người dùng cần cập nhật
//       user.admin = req.body.admin;
//     }

//     // Lưu thay đổi người dùng vào cơ sở dữ liệu
//     const userUpdated = await user.save();

//     // Trả về thông tin người dùng đã cập nhật
//     return res.status(200).json({
//       _id: userUpdated._id,
//       avatar: userUpdated.avatar,
//       name: userUpdated.name,
//       email: userUpdated.email,
//       verified: userUpdated.verified,
//       admin: userUpdated.admin,
//       token: await userUpdated.generateJWT(), // Tạo và trả về JWT mới
//     });
//   } catch (error) {
//     next(error); // Chuyển lỗi đến middleware xử lý lỗi
//   }
// };

const updateProfile = async (req, res, next) => {
  try {
    // Lấy userId cần cập nhật từ tham số URL
    const userIdToUpdate = req.params.userId;

    // Lấy userId của người dùng hiện tại từ đối tượng req.user
    const userId = req.user._id.toString(); // Chuyển đổi userId thành chuỗi để so sánh chính xác

    // Kiểm tra nếu người dùng hiện tại không phải là admin và userId hiện tại không trùng với userId cần cập nhật
    if (!req.user.admin && userId !== userIdToUpdate) {
      const error = new Error("Forbidden resource"); // Tạo lỗi với thông báo "Forbidden resource"
      error.statusCode = 403; // Đặt mã trạng thái lỗi là 403 (Forbidden)
      throw error; // Ném lỗi để chặn tiếp tục xử lý
    }

    // Tìm người dùng cần cập nhật trong cơ sở dữ liệu
    let user = await UserModel.findById(userIdToUpdate);

    // Nếu không tìm thấy người dùng, ném lỗi "User Not Found"
    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }

    // Cập nhật thuộc tính người dùng nếu có trong body của yêu cầu
    const { name, email, password, admin } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Assuming password is hashed in a pre-save hook
    if (typeof admin !== "undefined" && req.user.admin) {
      user.admin = admin;
    }

    // Lưu thay đổi người dùng vào cơ sở dữ liệu
    const userUpdated = await user.save();

    // Trả về thông tin người dùng đã cập nhật
    return res.status(200).json({
      _id: userUpdated._id,
      avatar: userUpdated.avatar,
      name: userUpdated.name,
      email: userUpdated.email,
      verified: userUpdated.verified,
      admin: userUpdated.admin,
      token: await userUpdated.generateJWT(), // Tạo và trả về JWT mới
    });
  } catch (error) {
    next(error); // Chuyển lỗi đến middleware xử lý lỗi
  }
};

// [PUT] api/users/update-profile-picture
const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred while uploading picture" + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          let updatedUser = await UserModel.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();

          res.status(200).json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await UserModel.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);

          res.status(200).json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// [DELETE] /api/users/:id
const deleteUser = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.params.userId);

    if (!user) {
      const error = new Error("User Not Found");
      return next(error);
    }

    const postsToDelete = await PostModel.find({ user: user._id });
    const postIdsToDelete = postsToDelete.map((post) => post._id);

    // Remove all comments related to the user
    await CommentModel.deleteMany({
      post: { $in: postIdsToDelete },
    });

    // Remove all posts related to the user
    await PostModel.deleteMany({
      _id: { $in: postIdsToDelete },
    });

    // Remove post's photo
    postsToDelete.forEach((post) => {
      fileRemover(post.photo);
    });

    // Delete the user
    await UserModel.findByIdAndDelete(req.params.userId);
    fileRemover(user.avatar);

    res.json({
      message: "User is deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllUsers,
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  deleteUser,
};
