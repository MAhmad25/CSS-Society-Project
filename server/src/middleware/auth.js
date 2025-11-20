const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verify JWT Token
const verifyToken = (token) => {
      try {
            return jwt.verify(token, process.env.JWT_SECRET);
      } catch (error) {
            throw error;
      }
};

// Protect routes - verify user is authenticated
const protect = async (req, res, next) => {
      let token;

      // Get token from header
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
      }

      if (!token) {
            return res.status(401).json({
                  status: "error",
                  message: "No token provided. Please authenticate",
                  data: null,
            });
      }

      try {
            const decoded = verifyToken(token);
            req.user = await User.findById(decoded.id);

            if (!req.user) {
                  return res.status(404).json({
                        status: "error",
                        message: "User not found",
                        data: null,
                  });
            }

            if (!req.user.isActive) {
                  return res.status(403).json({
                        status: "error",
                        message: "User account is deactivated",
                        data: null,
                  });
            }

            next();
      } catch (error) {
            return res.status(401).json({
                  status: "error",
                  message: "Invalid or expired token",
                  data: null,
            });
      }
};

// Restrict to admin only
const adminOnly = (req, res, next) => {
      if (req.user.role !== "admin") {
            return res.status(403).json({
                  status: "error",
                  message: "Access denied. Admin privileges required",
                  data: null,
            });
      }
      next();
};

// Generate JWT Token
const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE || "7d",
      });
};

module.exports = {
      protect,
      adminOnly,
      verifyToken,
      generateToken,
};
