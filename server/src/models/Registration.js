const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
      {
            firstName: {
                  type: String,
                  required: [true, "First name is required"],
                  trim: true,
            },
            lastName: {
                  type: String,
                  required: [true, "Last name is required"],
                  trim: true,
            },
            email: {
                  type: String,
                  required: [true, "Email is required"],
                  trim: true,
                  lowercase: true,
            },
            subject: {
                  type: String,
                  required: [true, "Subject is required"],
                  trim: true,
            },
            message: {
                  type: String,
                  default: null,
                  trim: true,
            },
      },
      { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
