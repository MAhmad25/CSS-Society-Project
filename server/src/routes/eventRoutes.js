const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const cloudinary = require("../middleware/cloudinary");
const Event = require("../models/Event");
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

// Upload event image
router.post("/:id/image", protect, adminOnly, upload.single("image"), async (req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ status: "error", message: "No image file provided" });
            }
            cloudinary.uploader
                  .upload_stream({ resource_type: "image", folder: "css" }, async (error, result) => {
                        if (error) {
                              return res.status(500).json({ status: "error", message: "Cloudinary upload failed", error });
                        }
                        const event = await Event.findByIdAndUpdate(req.params.id, { image: result.secure_url }, { new: true });
                        res.status(200).json({ status: "success", data: { event } });
                  })
                  .end(req.file.buffer);
      } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
      }
});

module.exports = router;
