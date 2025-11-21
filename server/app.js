require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const connectDB = require("./config/database");
const { createAdminUser } = require("./config/seedAdmin");
const errorHandler = require("./src/middleware/errorHandler");

// Routes
const userRoutes = require("./src/routes/userRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const announcementRoutes = require("./src/routes/announcementRoutes");
const teamMemberRoutes = require("./src/routes/teamMemberRoutes");

// Initialize Express app
const app = express();

// ==================== Middleware ====================

// Security middleware
app.use(helmet());

// CORS middleware
app.use(
      cors({
            origin: process.env.CORS_ORIGIN || "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            credentials: true,
            optionsSuccessStatus: 200,
      })
);

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// ==================== Routes ====================

// Health check endpoint
app.get("/api/health", (req, res) => {
      res.status(200).json({
            status: "success",
            message: "CSS Society API is running",
            timestamp: new Date().toISOString(),
      });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/team-members", teamMemberRoutes);

// Root endpoint
app.get("/", (req, res) => {
      res.status(200).json({
            status: "success",
            message: "CSS Society Backend API",
            version: "1.0.0",
            timestamp: new Date().toISOString(),
            documentation: "https://github.com/MAhmad25/CSS-Society-Project",
      });
});

// 404 Not Found handler
app.use("*", (req, res) => {
      res.status(404).json({
            status: "error",
            message: "Route not found",
            path: req.originalUrl,
      });
});

// Global error handling middleware
app.use(errorHandler);

// ==================== Database Connection ====================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
      try {
            // Connect to MongoDB
            await connectDB();

            // Create admin user if it doesn't exist
            await createAdminUser();

            // Start server
            app.listen("https://css-society-project-ty9c.vercel.app/", () => {
                  console.log("\n" + "=".repeat(50));
                  console.log("🚀 CSS Society API Server Started");
                  console.log("=".repeat(50));
                  console.log(`📍 Server Running on: http://localhost:${PORT}`);
                  console.log(`🌍 Environment: ${NODE_ENV}`);
                  console.log(`📚 API Base URL: http://localhost:${PORT}/api`);
                  console.log("=".repeat(50) + "\n");
            });
      } catch (error) {
            console.error("❌ Failed to start server:", error.message);
            process.exit(1);
      }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
      console.error("❌ Unhandled Rejection:", err.message);
      process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
      console.error("❌ Uncaught Exception:", err.message);
      process.exit(1);
});

// Start the server
startServer();

module.exports = app;
