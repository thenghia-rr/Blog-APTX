import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import UserModel from "../models/User.js";
import { fileRemover } from "../utils/fileRemover.js";

// GET /api/users/all-users
const getAllUsers = async (req, res, next) => {
  try {
    let user = await UserModel.find({});
    if (user) {
      return res.status(200).json({
        count: user.length,
        data: user,
      });
    }
  } catch (error) {
    next(error);
  }
};

// POST /api/users/register
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

// POST api/users/login
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

// GET api/users/profile
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

// PUT api/users/update-profile
const updateProfile = async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user._id); // req.user (authMiddleware)

    if (!user) {
      throw new Error("User Not Found");
    }

    const { name, email, password } = req.body;
    user.name = name || user.name;
    user.email = email || user.email;
    if (password && password.length < 6) {
      throw new Error("Password length must be at least 6 characters");
    } else if (password) {
      user.password = password;
    }

    const userUpdated = await user.save();
    return res.status(200).json({
      _id: userUpdated._id,
      avatar: userUpdated.avatar,
      name: userUpdated.name,
      email: userUpdated.email,
      verified: userUpdated.verified,
      admin: userUpdated.admin,
      token: await userUpdated.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

// PUT api/users/update-profile-picture
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

export {
  getAllUsers,
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
};
