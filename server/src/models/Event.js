const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
      {
            title: {
                  type: String,
                  required: [true, "Event title is required"],
                  trim: true,
            },
            description: {
                  type: String,
                  required: [true, "Event description is required"],
            },
            date: {
                  type: Date,
                  required: [true, "Event date is required"],
            },
            location: {
                  type: String,
                  required: [true, "Event location is required"],
            },
            category: {
                  type: String,
                  enum: ["workshop", "competition", "seminar", "hackathon", "networking", "other"],
                  default: "workshop",
            },
            image: {
                  type: String,
                  default: null,
            },
            maxParticipants: {
                  type: Number,
                  default: null,
            },
            registrations: [
                  {
                        userId: {
                              type: mongoose.Schema.Types.ObjectId,
                              ref: "User",
                        },
                        registeredAt: {
                              type: Date,
                              default: Date.now,
                        },
                  },
            ],
            status: {
                  type: String,
                  enum: ["upcoming", "ongoing", "completed", "cancelled"],
                  default: "upcoming",
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

module.exports = mongoose.model("Event", eventSchema);
