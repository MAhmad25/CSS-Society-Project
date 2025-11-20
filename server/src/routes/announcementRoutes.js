const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const { protect, adminOnly } = require("../middleware/auth");
const { validateCreateAnnouncement, validateUpdateAnnouncement, validateMongoId } = require("../middleware/validation");

// Public routes (get published announcements)
router.get("/", announcementController.getAllAnnouncements);
router.get("/:id", validateMongoId, protect, announcementController.getAnnouncementById);

// Admin routes
router.post("/", protect, adminOnly, validateCreateAnnouncement, announcementController.createAnnouncement);
router.get("/admin/all", protect, adminOnly, announcementController.getAllAnnouncementsAdmin);
router.put("/:id", protect, adminOnly, validateMongoId, validateUpdateAnnouncement, announcementController.updateAnnouncement);
router.delete("/:id", protect, adminOnly, validateMongoId, announcementController.deleteAnnouncement);
router.patch("/:id/toggle-pin", protect, adminOnly, validateMongoId, announcementController.togglePinAnnouncement);
router.patch("/:id/toggle-publish", protect, adminOnly, validateMongoId, announcementController.togglePublishAnnouncement);

module.exports = router;
