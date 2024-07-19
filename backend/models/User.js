import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    avatarId: { type: String, default: "" },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: Boolean, require: false },
    admin: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Hash password user by Bcryptjs
// key word "this" is user in UserController
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  return next();
});

// Authenticate using JWT
UserSchema.methods.generateJWT = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Compare password Bcryptjs
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// Method to generate reset password token
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '10m',
  });

  this.resetPasswordToken = resetToken;
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const UserModel = model("User", UserSchema);
export default UserModel;
