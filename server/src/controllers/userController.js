const User = require("../models/User");
const { generateToken } = require("../middleware/auth");
const { validationResult } = require("express-validator");

// Register a new user
exports.register = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { email, password, fullName } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                  return res.status(400).json({
                        status: "error",
                        message: "Email already registered",
                        data: null,
                  });
            }

            // Create new user
            const user = new User({
                  email,
                  password,
                  fullName,
                  role: "user",
            });

            await user.save();

            // Generate token
            const token = generateToken(user._id);

            // Return user without password
            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(201).json({
                  status: "success",
                  message: "User registered successfully",
                  data: {
                        user: userResponse,
                        token,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Login user
exports.login = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { email, password } = req.body;

            // Find user and include password field
            const user = await User.findOne({ email }).select("+password");

            if (!user) {
                  return res.status(401).json({
                        status: "error",
                        message: "Invalid email or password",
                        data: null,
                  });
            }

            // Check if user is active
            if (!user.isActive) {
                  return res.status(403).json({
                        status: "error",
                        message: "User account is deactivated",
                        data: null,
                  });
            }

            // Compare passwords
            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                  return res.status(401).json({
                        status: "error",
                        message: "Invalid email or password",
                        data: null,
                  });
            }

            // Generate token
            const token = generateToken(user._id);

            // Return user without password
            const userResponse = user.toObject();
            delete userResponse.password;

            res.status(200).json({
                  status: "success",
                  message: "Login successful",
                  data: {
                        user: userResponse,
                        token,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get current user profile
exports.getProfile = async (req, res, next) => {
      try {
            const user = await User.findById(req.user._id);

            res.status(200).json({
                  status: "success",
                  message: "Profile retrieved successfully",
                  data: { user },
            });
      } catch (error) {
            next(error);
      }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res, next) => {
      try {
            const users = await User.find({ role: "user" }).select("-password");

            res.status(200).json({
                  status: "success",
                  message: "Users retrieved successfully",
                  data: {
                        count: users.length,
                        users,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const user = await User.findById(id).select("-password");

            if (!user) {
                  return res.status(404).json({
                        status: "error",
                        message: "User not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "User retrieved successfully",
                  data: { user },
            });
      } catch (error) {
            next(error);
      }
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
      try {
            const { fullName, email } = req.body;

            // Check if email is being changed and if it's already taken
            if (email && email !== req.user.email) {
                  const existingUser = await User.findOne({ email });
                  if (existingUser) {
                        return res.status(400).json({
                              status: "error",
                              message: "Email already in use",
                              data: null,
                        });
                  }
            }

            const updateData = {};
            if (fullName) updateData.fullName = fullName;
            if (email) updateData.email = email;
            updateData.updatedAt = Date.now();

            const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true, runValidators: true });

            res.status(200).json({
                  status: "success",
                  message: "Profile updated successfully",
                  data: { user },
            });
      } catch (error) {
            next(error);
      }
};

// Change password
exports.changePassword = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { oldPassword, newPassword } = req.body;

            // Get user with password field
            const user = await User.findById(req.user._id).select("+password");

            // Verify old password
            const isPasswordValid = await user.comparePassword(oldPassword);

            if (!isPasswordValid) {
                  return res.status(401).json({
                        status: "error",
                        message: "Current password is incorrect",
                        data: null,
                  });
            }

            // Update password
            user.password = newPassword;
            await user.save();

            res.status(200).json({
                  status: "success",
                  message: "Password changed successfully",
                  data: null,
            });
      } catch (error) {
            next(error);
      }
};

// Delete user account
exports.deleteAccount = async (req, res, next) => {
      try {
            await User.findByIdAndDelete(req.user._id);

            res.status(200).json({
                  status: "success",
                  message: "Account deleted successfully",
                  data: null,
            });
      } catch (error) {
            next(error);
      }
};

// Deactivate user (Admin only)
exports.deactivateUser = async (req, res, next) => {
      try {
            const { id } = req.params;

            const user = await User.findByIdAndUpdate(id, { isActive: false, updatedAt: Date.now() }, { new: true });

            if (!user) {
                  return res.status(404).json({
                        status: "error",
                        message: "User not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "User deactivated successfully",
                  data: { user },
            });
      } catch (error) {
            next(error);
      }
};

// Activate user (Admin only)
exports.activateUser = async (req, res, next) => {
      try {
            const { id } = req.params;

            const user = await User.findByIdAndUpdate(id, { isActive: true, updatedAt: Date.now() }, { new: true });

            if (!user) {
                  return res.status(404).json({
                        status: "error",
                        message: "User not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "User activated successfully",
                  data: { user },
            });
      } catch (error) {
            next(error);
      }
};
