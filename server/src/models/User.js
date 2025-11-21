const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
      {
            email: {
                  type: String,
                  required: [true, "Email is required"],
                  unique: true,
                  lowercase: true,
                  match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email address"],
            },
            password: {
                  type: String,
                  required: [true, "Password is required"],
                  minlength: [8, "Password must be at least 8 characters"],
                  select: false, // Don't return password by default
            },
            fullName: {
                  type: String,
                  required: [true, "Full name is required"],
                  trim: true,
            },
            role: {
                  type: String,
                  enum: ["admin", "user"],
                  default: "user",
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

userSchema.pre("save", async function (next) {
      if (!this.isModified("password")) {
            return next();
      }

      try {
            const salt = await bcryptjs.genSalt(10);
            this.password = await bcryptjs.hash(this.password, salt);
            next();
      } catch (error) {
            next(error);
      }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
      return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
