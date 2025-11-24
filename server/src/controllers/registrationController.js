const Registration = require("../models/Registration");
const { validationResult } = require("express-validator");

// Create new registration
exports.createRegistration = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({ status: "error", message: "Validation error", data: errors.array() });
            }

            const { firstName, lastName, email, subject, message } = req.body;

            const registration = new Registration({
                  firstName,
                  lastName,
                  email,
                  subject,
                  message: message || null,
            });

            await registration.save();

            res.status(201).json({ status: "success", message: "Registration saved successfully", data: { registration } });
      } catch (error) {
            next(error);
      }
};

// Optional: list registrations (admin)
exports.getAllRegistrations = async (req, res, next) => {
      try {
            const regs = await Registration.find().sort({ createdAt: -1 });
            res.status(200).json({ status: "success", message: "Registrations retrieved", data: { count: regs.length, registrations: regs } });
      } catch (err) {
            next(err);
      }
};
