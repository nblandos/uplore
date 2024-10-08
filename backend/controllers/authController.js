import User from "../models/userModel.js";
import { setAuthTokenCookie } from "../utils/tokenUtils.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      return res
        .status(400)
        .json({ error: "Email/Username and password are required" });
    }

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid email/username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Invalid email/username or password" });
    }
    setAuthTokenCookie(user._id, res);

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      followedGames: user.followedGames,
    });
  } catch (error) {
    console.log("Error in login controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email or Username already in use",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();

      setAuthTokenCookie(newUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
        followedGames: newUser.followedGames,
      });
    } else {
      return res.status(400).json({
        error: "Failed to create user",
      });
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getAuthenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getAuthenticatedUser controller: ", error.message);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
