const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const { validateRegistration } = require("../middleware/validation");
const { protect, adminOnly } = require("../middleware/auth");

// Public: create registration
router.post("/", validateRegistration, registrationController.createRegistration);

// Admin: view all registrations
router.get("/", protect, adminOnly, registrationController.getAllRegistrations);

module.exports = router;
