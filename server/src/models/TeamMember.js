const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema(
      {
            name: {
                  type: String,
                  required: [true, "Team member name is required"],
                  trim: true,
            },
            email: {
                  type: String,
                  required: [true, "Team member email is required"],
                  match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email address"],
            },
            position: {
                  type: String,
                  required: [true, "Position is required"],
                  enum: ["President", "Vice President Operations", "Vice President Logistics", "General Manager", "General Secretary", "Society Manager", "Event Coordinator", "Information Secretary", "Member", "Other"],
                  default: "Member",
            },
            image: {
                  type: String,
                  default: null,
            },
            bio: {
                  type: String,
                  default: "",
            },
            phone: {
                  type: String,
                  default: null,
            },
            socialLinks: {
                  linkedin: {
                        type: String,
                        default: null,
                  },
                  github: {
                        type: String,
                        default: null,
                  },
                  twitter: {
                        type: String,
                        default: null,
                  },
                  portfolio: {
                        type: String,
                        default: null,
                  },
            },
            isActive: {
                  type: Boolean,
                  default: true,
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

module.exports = mongoose.model("TeamMember", teamMemberSchema);
