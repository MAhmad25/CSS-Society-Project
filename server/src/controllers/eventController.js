const Event = require("../models/Event");
const { validationResult } = require("express-validator");

// Create new event (Admin only)
exports.createEvent = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { title, description, date, location, category, maxParticipants, image } = req.body;

            const event = new Event({
                  title,
                  description,
                  date,
                  location,
                  category: category || "workshop",
                  maxParticipants,
                  image,
                  createdBy: req.user._id,
            });

            await event.save();

            res.status(201).json({
                  status: "success",
                  message: "Event created successfully",
                  data: { event },
            });
      } catch (error) {
            next(error);
      }
};

// Get all events
exports.getAllEvents = async (req, res, next) => {
      try {
            const { category, status } = req.query;

            const filter = {};
            if (category) filter.category = category;
            if (status) filter.status = status;

            const events = await Event.find(filter).populate("createdBy", "fullName email").populate("registrations.userId", "fullName email").sort({ date: 1 });

            res.status(200).json({
                  status: "success",
                  message: "Events retrieved successfully",
                  data: {
                        count: events.length,
                        events,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get event by ID
exports.getEventById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const event = await Event.findById(id).populate("createdBy", "fullName email").populate("registrations.userId", "fullName email");

            if (!event) {
                  return res.status(404).json({
                        status: "error",
                        message: "Event not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Event retrieved successfully",
                  data: { event },
            });
      } catch (error) {
            next(error);
      }
};

// Update event (Admin only)
exports.updateEvent = async (req, res, next) => {
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
            const { title, description, date, location, category, maxParticipants, status, image } = req.body;

            const event = await Event.findById(id);

            if (!event) {
                  return res.status(404).json({
                        status: "error",
                        message: "Event not found",
                        data: null,
                  });
            }

            // Update fields
            if (title) event.title = title;
            if (description) event.description = description;
            if (date) event.date = date;
            if (location) event.location = location;
            if (category) event.category = category;
            if (maxParticipants !== undefined) event.maxParticipants = maxParticipants;
            if (status) event.status = status;
            if (image) event.image = image;
            event.updatedAt = Date.now();

            await event.save();

            res.status(200).json({
                  status: "success",
                  message: "Event updated successfully",
                  data: { event },
            });
      } catch (error) {
            next(error);
      }
};

// Delete event (Admin only)
exports.deleteEvent = async (req, res, next) => {
      try {
            const { id } = req.params;

            const event = await Event.findByIdAndDelete(id);

            if (!event) {
                  return res.status(404).json({
                        status: "error",
                        message: "Event not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Event deleted successfully",
                  data: null,
            });
      } catch (error) {
            next(error);
      }
};

// Register user for event
exports.registerForEvent = async (req, res, next) => {
      try {
            const { id } = req.params;

            const event = await Event.findById(id);

            if (!event) {
                  return res.status(404).json({
                        status: "error",
                        message: "Event not found",
                        data: null,
                  });
            }

            // Check if user already registered
            const isRegistered = event.registrations.some((reg) => reg.userId.toString() === req.user._id.toString());

            if (isRegistered) {
                  return res.status(400).json({
                        status: "error",
                        message: "You are already registered for this event",
                        data: null,
                  });
            }

            // Check if event has reached max capacity
            if (event.maxParticipants && event.registrations.length >= event.maxParticipants) {
                  return res.status(400).json({
                        status: "error",
                        message: "Event has reached maximum capacity",
                        data: null,
                  });
            }

            // Add registration
            event.registrations.push({
                  userId: req.user._id,
                  registeredAt: Date.now(),
            });

            await event.save();

            res.status(200).json({
                  status: "success",
                  message: "Registered for event successfully",
                  data: { event },
            });
      } catch (error) {
            next(error);
      }
};

// Unregister from event
exports.unregisterFromEvent = async (req, res, next) => {
      try {
            const { id } = req.params;

            const event = await Event.findById(id);

            if (!event) {
                  return res.status(404).json({
                        status: "error",
                        message: "Event not found",
                        data: null,
                  });
            }

            // Check if user is registered
            const registrationIndex = event.registrations.findIndex((reg) => reg.userId.toString() === req.user._id.toString());

            if (registrationIndex === -1) {
                  return res.status(400).json({
                        status: "error",
                        message: "You are not registered for this event",
                        data: null,
                  });
            }

            // Remove registration
            event.registrations.splice(registrationIndex, 1);
            await event.save();

            res.status(200).json({
                  status: "success",
                  message: "Unregistered from event successfully",
                  data: { event },
            });
      } catch (error) {
            next(error);
      }
};

// Get user's registered events
exports.getUserEvents = async (req, res, next) => {
      try {
            const events = await Event.find({
                  "registrations.userId": req.user._id,
            })
                  .populate("createdBy", "fullName email")
                  .sort({ date: 1 });

            res.status(200).json({
                  status: "success",
                  message: "User events retrieved successfully",
                  data: {
                        count: events.length,
                        events,
                  },
            });
      } catch (error) {
            next(error);
      }
};
