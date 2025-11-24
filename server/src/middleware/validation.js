const { body, param } = require("express-validator");

// User validation
const validateRegister = [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"), body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"), body("fullName").trim().notEmpty().withMessage("Full name is required").isLength({ min: 2 }).withMessage("Full name must be at least 2 characters")];

const validateLogin = [body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"), body("password").notEmpty().withMessage("Password is required")];

const validateChangePassword = [
      body("oldPassword").notEmpty().withMessage("Current password is required"),
      body("newPassword").isLength({ min: 8 }).withMessage("New password must be at least 8 characters"),
      body("confirmPassword")
            .custom((value, { req }) => value === req.body.newPassword)
            .withMessage("Passwords do not match"),
];

// Event validation
const validateCreateEvent = [
      body("title").trim().notEmpty().withMessage("Event title is required").isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
      body("description").trim().notEmpty().withMessage("Event description is required").isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
      body("date")
            .notEmpty()
            .withMessage("Event date is required")
            .custom((value) => {
                  const date = new Date(value);
                  if (isNaN(date.getTime())) {
                        throw new Error("Please provide a valid date");
                  }
                  return true;
            })
            .withMessage("Please provide a valid date"),
      body("location").trim().notEmpty().withMessage("Event location is required"),
      body("category").optional().isIn(["workshop", "competition", "seminar", "hackathon", "networking", "other"]).withMessage("Invalid category"),
      body("maxParticipants").optional().isInt({ min: 1 }).withMessage("Max participants must be a positive number"),
];

const validateUpdateEvent = [
      body("title").optional().trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
      body("description").optional().trim().isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
      body("date")
            .optional()
            .custom((value) => {
                  if (!value) return true;
                  const date = new Date(value);
                  if (isNaN(date.getTime())) {
                        throw new Error("Please provide a valid date");
                  }
                  return true;
            })
            .withMessage("Please provide a valid date"),
      body("location").optional().trim(),
      body("category").optional().isIn(["workshop", "competition", "seminar", "hackathon", "networking", "other"]).withMessage("Invalid category"),
      body("status").optional().isIn(["upcoming", "ongoing", "completed", "cancelled"]).withMessage("Invalid status"),
];

// Announcement validation
const validateCreateAnnouncement = [body("title").trim().notEmpty().withMessage("Announcement title is required").isLength({ min: 3 }).withMessage("Title must be at least 3 characters"), body("content").trim().notEmpty().withMessage("Announcement content is required").isLength({ min: 10 }).withMessage("Content must be at least 10 characters"), body("category").optional().isIn(["news", "update", "achievement", "urgent", "other"]).withMessage("Invalid category")];

const validateUpdateAnnouncement = [body("title").optional().trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"), body("content").optional().trim().isLength({ min: 10 }).withMessage("Content must be at least 10 characters"), body("category").optional().isIn(["news", "update", "achievement", "urgent", "other"]).withMessage("Invalid category")];

// Team member validation
const validateCreateTeamMember = [body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"), body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"), body("position").optional().isIn(["President", "Vice President Operations", "Vice President Logistics", "General Manager", "General Secretary", "Society Manager", "Event Coordinator", "Information Secretary", "Member", "Other"]).withMessage("Invalid position")];

const validateUpdateTeamMember = [body("name").optional().trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"), body("email").optional().isEmail().normalizeEmail().withMessage("Please provide a valid email"), body("position").optional().isIn(["President", "Vice President Operations", "Vice President Logistics", "General Manager", "General Secretary", "Society Manager", "Event Coordinator", "Information Secretary", "Member", "Other"]).withMessage("Invalid position")];

// Registration (membership) validation
const validateRegistration = [body("firstName").trim().notEmpty().withMessage("First name is required").isLength({ min: 1 }).withMessage("First name is required"), body("lastName").trim().notEmpty().withMessage("Last name is required").isLength({ min: 1 }).withMessage("Last name is required"), body("email").isEmail().normalizeEmail().withMessage("Please provide a valid email"), body("subject").trim().notEmpty().withMessage("Subject is required").isLength({ min: 3 }).withMessage("Subject must be at least 3 characters"), body("message").optional().trim()];

// ID validation
const validateMongoId = param("id")
      .matches(/^[0-9a-fA-F]{24}$/)
      .withMessage("Invalid ID format");

module.exports = {
      validateRegister,
      validateLogin,
      validateChangePassword,
      validateCreateEvent,
      validateUpdateEvent,
      validateCreateAnnouncement,
      validateUpdateAnnouncement,
      validateCreateTeamMember,
      validateUpdateTeamMember,
      validateRegistration,
      validateMongoId,
};
