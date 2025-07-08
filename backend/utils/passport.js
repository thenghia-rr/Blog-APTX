import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/User.js"; // Đường dẫn tới model User của bạn
import dotnev from "dotenv";
dotnev.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.LOGIN_CLIENT_ID,
      clientSecret: process.env.LOGIN_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      try {
        console.log(profile);
        let user = await UserModel.findOne({ googleId: profile.id });

        // if (!user) {
        //   user = new UserModel({
        //     googleId: profile.id,
        //     name: profile.displayName,
        //     avatar: profile.photos[0].value,
        //     email: profile.emails[0].value,
        //   });
        //   await user.save();
        // }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

export default passport;
