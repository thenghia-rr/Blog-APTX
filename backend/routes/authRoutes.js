// import express from "express";
// import { OAuth2Client } from "google-auth-library";
// import passport from "passport";
// import { authGoogle } from "../controllers/authControllers.js";
// import UserModel from "../models/User.js";
// const router = express.Router();
// import dotenv from "dotenv";
// dotenv.config();

// const client = new OAuth2Client(process.env.LOGIN_CLIENT_ID);

// // [POST] /api/auth/google/
// router.post("/google", async (req, res) => {
//   const { token } = req.body;
//   // console.log('Received token:', token);

//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.LOGIN_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const userId = payload["sub"];

//     let user = await UserModel.findOne({ googleId: userId });

//     console.log("Auth route", user)
//     if (!user) {
//       user = new UserModel({
//         googleId: userId,
//         name: payload["name"],
//         email: payload["email"],
//         avatar: payload["picture"],
//       });
//       await user.save();
//     }

//     const jwtToken = await user.generateJWT();
//     console.log("JWT TOKEN: ", jwtToken)
//     res.json({ token: jwtToken });
//   } catch (error) {
//     res.status(400).json({ error: "Invalid Google token" });
//   }
// });

// // [GET] /api/auth/google/
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     session: false,
//   })
// );

// // [GET] /api/auth/google/callback
// router.get(
//   "/google/callback",
//   (req, res, next) => {
//     passport.authenticate("google", (err, profile) => {
//       req.user = profile;
//       next();
//     })(req, res, next);
//   },
//   (req, res) => {
//     res.redirect(`${process.env.URL_CLIENT_APP}/login`);
//   }
// );



// export default router;
