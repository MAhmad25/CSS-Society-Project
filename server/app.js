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
const registrationRoutes = require("./src/routes/registrationRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");

const app = express();

// ==================== Middleware ====================

app.use(helmet());

// CORS middleware
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173", "https://css-society-project-q6pq.vercel.app", "https://localhost:3000"];

const corsOptions = {
      origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin) || process.env.CORS_ORIGIN === origin) {
                  callback(null, true);
            } else {
                  callback(null, true);
            }
      },
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(mongoSanitize());

app.options("*", cors(corsOptions));

// Health check endpoint
app.get("/api/health", (_, res) => {
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
app.use("/api/registrations", registrationRoutes);
console.log("[server] mounted /api/registrations route");
app.use("/api/uploads", uploadRoutes);
console.log("[server] mounted /api/uploads route");

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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const startServer = async () => {
      try {
            // Connect to MongoDB
            await connectDB();

            // Create admin user if it doesn't exist
            await createAdminUser();

            // Start server
            app.listen(PORT, () => {
                  console.log("\n" + "=".repeat(50));
                  console.log(" CSS Society API Server Started");
                  console.log("=".repeat(50));
                  console.log(`Server Running on Port: ${PORT}`);
                  console.log(`Environment: ${NODE_ENV}`);
                  console.log(`API Base URL: /api`);
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
