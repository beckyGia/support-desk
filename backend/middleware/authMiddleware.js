import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from token
      req.user = await User.findById(decoded.id).select("-password"); //This finds the user in mongodb byt the id gotten from the id and the select removes the password field from the stuff we get from the db

      // NOTE: We need to check if a user was found
      if (!req.user) {
        res.status(401);
        throw new Error("User Not Found");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401); //401 is authorized
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401); //401 is authorized
    throw new Error("Not Authorized");
  }
});
