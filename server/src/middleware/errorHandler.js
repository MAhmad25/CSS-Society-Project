// Global error handling middleware
const errorHandler = (err, req, res, next) => {
      const errorResponse = {
            status: "error",
            message: err.message || "Something went wrong",
            error: process.env.NODE_ENV === "development" ? err : {},
      };

      // Mongoose validation error
      if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({
                  status: "error",
                  message: "Validation error",
                  data: messages,
            });
      }

      // Mongoose duplicate key error
      if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({
                  status: "error",
                  message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
                  data: { field },
            });
      }

      // JWT errors
      if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                  status: "error",
                  message: "Invalid token",
                  data: null,
            });
      }

      if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                  status: "error",
                  message: "Token expired",
                  data: null,
            });
      }

      // Default error response
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
