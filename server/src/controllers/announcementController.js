const Announcement = require("../models/Announcement");
const { validationResult } = require("express-validator");

// Create announcement (Admin only)
exports.createAnnouncement = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { title, content, category, image, isPinned, isPublished } = req.body;

            const announcement = new Announcement({
                  title,
                  content,
                  category: category || "news",
                  image,
                  isPinned: isPinned || false,
                  isPublished: isPublished !== false,
                  createdBy: req.user._id,
            });

            await announcement.save();

            res.status(201).json({
                  status: "success",
                  message: "Announcement created successfully",
                  data: { announcement },
            });
      } catch (error) {
            next(error);
      }
};

// Get all announcements
exports.getAllAnnouncements = async (req, res, next) => {
      try {
            const { category, isPinned } = req.query;

            const filter = { isPublished: true };
            if (category) filter.category = category;
            if (isPinned === "true") filter.isPinned = true;

            const announcements = await Announcement.find(filter).populate("createdBy", "fullName email").sort({ isPinned: -1, createdAt: -1 });

            res.status(200).json({
                  status: "success",
                  message: "Announcements retrieved successfully",
                  data: {
                        count: announcements.length,
                        announcements,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get all announcements (Admin - includes unpublished)
exports.getAllAnnouncementsAdmin = async (req, res, next) => {
      try {
            const { category } = req.query;

            const filter = {};
            if (category) filter.category = category;

            const announcements = await Announcement.find(filter).populate("createdBy", "fullName email").sort({ isPinned: -1, createdAt: -1 });

            res.status(200).json({
                  status: "success",
                  message: "Announcements retrieved successfully",
                  data: {
                        count: announcements.length,
                        announcements,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get announcement by ID
exports.getAnnouncementById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const announcement = await Announcement.findById(id).populate("createdBy", "fullName email");

            if (!announcement) {
                  return res.status(404).json({
                        status: "error",
                        message: "Announcement not found",
                        data: null,
                  });
            }

            // If not published and user is not admin, return not found
            if (!announcement.isPublished && req.user.role !== "admin") {
                  return res.status(404).json({
                        status: "error",
                        message: "Announcement not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Announcement retrieved successfully",
                  data: { announcement },
            });
      } catch (error) {
            next(error);
      }
};

// Update announcement (Admin only)
exports.updateAnnouncement = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { id } = req.params;
            const { title, content, category, image, isPinned, isPublished } = req.body;

            const announcement = await Announcement.findById(id);

            if (!announcement) {
                  return res.status(404).json({
                        status: "error",
                        message: "Announcement not found",
                        data: null,
                  });
            }

            // Update fields
            if (title) announcement.title = title;
            if (content) announcement.content = content;
            if (category) announcement.category = category;
            if (image) announcement.image = image;
            if (isPinned !== undefined) announcement.isPinned = isPinned;
            if (isPublished !== undefined) announcement.isPublished = isPublished;
            announcement.updatedAt = Date.now();

            await announcement.save();

            res.status(200).json({
                  status: "success",
                  message: "Announcement updated successfully",
                  data: { announcement },
            });
      } catch (error) {
            next(error);
      }
};

// Delete announcement (Admin only)
exports.deleteAnnouncement = async (req, res, next) => {
      try {
            const { id } = req.params;

            const announcement = await Announcement.findByIdAndDelete(id);

            if (!announcement) {
                  return res.status(404).json({
                        status: "error",
                        message: "Announcement not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Announcement deleted successfully",
                  data: null,
            });
      } catch (error) {
            next(error);
      }
};

// Toggle pin announcement (Admin only)
exports.togglePinAnnouncement = async (req, res, next) => {
      try {
            const { id } = req.params;

            const announcement = await Announcement.findById(id);

            if (!announcement) {
                  return res.status(404).json({
                        status: "error",
                        message: "Announcement not found",
                        data: null,
                  });
            }

            announcement.isPinned = !announcement.isPinned;
            announcement.updatedAt = Date.now();
            await announcement.save();

            res.status(200).json({
                  status: "success",
                  message: "Announcement pin status updated successfully",
                  data: { announcement },
            });
      } catch (error) {
            next(error);
      }
};

// Publish/Unpublish announcement (Admin only)
exports.togglePublishAnnouncement = async (req, res, next) => {
      try {
            const { id } = req.params;

            const announcement = await Announcement.findById(id);

            if (!announcement) {
                  return res.status(404).json({
                        status: "error",
                        message: "Announcement not found",
                        data: null,
                  });
            }

            announcement.isPublished = !announcement.isPublished;
            announcement.updatedAt = Date.now();
            await announcement.save();

            res.status(200).json({
                  status: "success",
                  message: "Announcement publish status updated successfully",
                  data: { announcement },
            });
      } catch (error) {
            next(error);
      }
};
