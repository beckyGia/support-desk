import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// @desc    Register a new user
// @route   /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); //400 is client error
    throw new Error("User Already Exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10); //genSalt - rounds — Number of rounds to use, defaults to 10 if omitted
  const hashedPassword = await bcrypt.hash(password, salt); //hash - Asynchronously generates a hash for the given string.

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      //201 is for creating
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error("Invalid User Data");
  }
});

// @desc    Login a user
// @route   /api/users/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const comparePassword = await bcrypt.compare(password, user.password);

  // Check user and the passwords match
  if (user && comparePassword) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401); //401 is an unauthorized
    throw new Error("Invalid credentials");
  }
});

// @desc    Get a new user
// @route   /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
