const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { protect, adminOnly } = require("../middleware/auth");
const { validateCreateEvent, validateUpdateEvent, validateMongoId } = require("../middleware/validation");

// Public routes
router.get("/", eventController.getAllEvents);
router.get("/:id", validateMongoId, eventController.getEventById);

// Protected user routes
router.post("/:id/register", protect, validateMongoId, eventController.registerForEvent);
router.delete("/:id/unregister", protect, validateMongoId, eventController.unregisterFromEvent);
router.get("/user/my-events", protect, eventController.getUserEvents);

// Admin routes
router.post("/", protect, adminOnly, validateCreateEvent, eventController.createEvent);
router.put("/:id", protect, adminOnly, validateMongoId, validateUpdateEvent, eventController.updateEvent);
router.delete("/:id", protect, adminOnly, validateMongoId, eventController.deleteEvent);

module.exports = router;
