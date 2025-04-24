import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
// import dotenv from "dotenv";
import User from '../vcard/models/usermodel.js';
// const User = require('../models/usermodel.js');

// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

// Ensure environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Google Client ID and Secret must be set in environment variables!");
}

// Configure the Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback", //process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          try {
            user = await new User({
              googleId: profile.id,
              fullname: profile.displayName,
              email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null,
            }).save();
            return done(null, user);
          } catch (error) {
            console.error("Error creating user:", error);
            return done(error, null);
          }
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Serialize user to store user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;


