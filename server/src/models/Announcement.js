const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
      {
            title: {
                  type: String,
                  required: [true, "Announcement title is required"],
                  trim: true,
            },
            content: {
                  type: String,
                  required: [true, "Announcement content is required"],
            },
            category: {
                  type: String,
                  enum: ["news", "update", "achievement", "urgent", "other"],
                  default: "news",
            },
            image: {
                  type: String,
                  default: null,
            },
            isPinned: {
                  type: Boolean,
                  default: false,
            },
            isPublished: {
                  type: Boolean,
                  default: true,
            },
            createdBy: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
                  required: true,
            },
            createdAt: {
                  type: Date,
                  default: Date.now,
            },
            updatedAt: {
                  type: Date,
                  default: Date.now,
            },
      },
      { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
