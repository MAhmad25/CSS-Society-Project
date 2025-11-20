const TeamMember = require("../models/TeamMember");
const { validationResult } = require("express-validator");

// Create team member (Admin only)
exports.createTeamMember = async (req, res, next) => {
      try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        status: "error",
                        message: "Validation error",
                        data: errors.array(),
                  });
            }

            const { name, email, position, image, bio, phone, socialLinks, isActive } = req.body;

            const teamMember = new TeamMember({
                  name,
                  email,
                  position: position || "Member",
                  image,
                  bio,
                  phone,
                  socialLinks,
                  isActive: isActive !== false,
            });

            await teamMember.save();

            res.status(201).json({
                  status: "success",
                  message: "Team member added successfully",
                  data: { teamMember },
            });
      } catch (error) {
            next(error);
      }
};

// Get all team members
exports.getAllTeamMembers = async (req, res, next) => {
      try {
            const { position, isActive } = req.query;

            const filter = {};
            if (position) filter.position = position;
            if (isActive === "true") filter.isActive = true;
            else if (isActive === "false") filter.isActive = false;

            const teamMembers = await TeamMember.find(filter).sort({ position: 1 });

            res.status(200).json({
                  status: "success",
                  message: "Team members retrieved successfully",
                  data: {
                        count: teamMembers.length,
                        teamMembers,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get active team members only
exports.getActiveTeamMembers = async (req, res, next) => {
      try {
            const teamMembers = await TeamMember.find({ isActive: true }).sort({ position: 1 });

            res.status(200).json({
                  status: "success",
                  message: "Active team members retrieved successfully",
                  data: {
                        count: teamMembers.length,
                        teamMembers,
                  },
            });
      } catch (error) {
            next(error);
      }
};

// Get team member by ID
exports.getTeamMemberById = async (req, res, next) => {
      try {
            const { id } = req.params;

            const teamMember = await TeamMember.findById(id);

            if (!teamMember) {
                  return res.status(404).json({
                        status: "error",
                        message: "Team member not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Team member retrieved successfully",
                  data: { teamMember },
            });
      } catch (error) {
            next(error);
      }
};

// Update team member (Admin only)
exports.updateTeamMember = async (req, res, next) => {
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
            const { name, email, position, image, bio, phone, socialLinks, isActive } = req.body;

            const teamMember = await TeamMember.findById(id);

            if (!teamMember) {
                  return res.status(404).json({
                        status: "error",
                        message: "Team member not found",
                        data: null,
                  });
            }

            // Check if email is being changed and if it's already taken
            if (email && email !== teamMember.email) {
                  const existingMember = await TeamMember.findOne({ email });
                  if (existingMember) {
                        return res.status(400).json({
                              status: "error",
                              message: "Email already in use",
                              data: null,
                        });
                  }
            }

            // Update fields
            if (name) teamMember.name = name;
            if (email) teamMember.email = email;
            if (position) teamMember.position = position;
            if (image) teamMember.image = image;
            if (bio) teamMember.bio = bio;
            if (phone) teamMember.phone = phone;
            if (socialLinks) teamMember.socialLinks = socialLinks;
            if (isActive !== undefined) teamMember.isActive = isActive;
            teamMember.updatedAt = Date.now();

            await teamMember.save();

            res.status(200).json({
                  status: "success",
                  message: "Team member updated successfully",
                  data: { teamMember },
            });
      } catch (error) {
            next(error);
      }
};

// Delete team member (Admin only)
exports.deleteTeamMember = async (req, res, next) => {
      try {
            const { id } = req.params;

            const teamMember = await TeamMember.findByIdAndDelete(id);

            if (!teamMember) {
                  return res.status(404).json({
                        status: "error",
                        message: "Team member not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Team member deleted successfully",
                  data: null,
            });
      } catch (error) {
            next(error);
      }
};

// Deactivate team member (Admin only)
exports.deactivateTeamMember = async (req, res, next) => {
      try {
            const { id } = req.params;

            const teamMember = await TeamMember.findByIdAndUpdate(id, { isActive: false, updatedAt: Date.now() }, { new: true });

            if (!teamMember) {
                  return res.status(404).json({
                        status: "error",
                        message: "Team member not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Team member deactivated successfully",
                  data: { teamMember },
            });
      } catch (error) {
            next(error);
      }
};

// Activate team member (Admin only)
exports.activateTeamMember = async (req, res, next) => {
      try {
            const { id } = req.params;

            const teamMember = await TeamMember.findByIdAndUpdate(id, { isActive: true, updatedAt: Date.now() }, { new: true });

            if (!teamMember) {
                  return res.status(404).json({
                        status: "error",
                        message: "Team member not found",
                        data: null,
                  });
            }

            res.status(200).json({
                  status: "success",
                  message: "Team member activated successfully",
                  data: { teamMember },
            });
      } catch (error) {
            next(error);
      }
};
