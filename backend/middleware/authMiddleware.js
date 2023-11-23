import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

// NOTE: When test API using Post Man (Authorization -> Bearer Token)
export const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not Authorized, No Token");
    error.statusCode = 401;
    next(error);
  }
};

// Check permision Admin 
export const authAdmin = (req, res,next) => {
  if(req.user && req.user.admin) {
    next();
  }
  else {
    let error = new Error('Not authorized as an Admin');
    error.statusCode = 401;
    next(error);
  }
}