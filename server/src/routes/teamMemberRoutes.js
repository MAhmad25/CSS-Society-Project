const express = require("express");
const router = express.Router();
const teamMemberController = require("../controllers/teamMemberController");
const { protect, adminOnly } = require("../middleware/auth");
const { validateCreateTeamMember, validateUpdateTeamMember, validateMongoId } = require("../middleware/validation");
const upload = require("../middleware/multer");
const cloudinary = require("../middleware/cloudinary");
const TeamMember = require("../models/TeamMember");

// Public routes
router.get("/", teamMemberController.getAllTeamMembers);
router.get("/active", teamMemberController.getActiveTeamMembers);
router.get("/:id", validateMongoId, teamMemberController.getTeamMemberById);

// Admin routes
router.post("/", protect, adminOnly, validateCreateTeamMember, teamMemberController.createTeamMember);
router.put("/:id", protect, adminOnly, validateMongoId, validateUpdateTeamMember, teamMemberController.updateTeamMember);
router.delete("/:id", protect, adminOnly, validateMongoId, teamMemberController.deleteTeamMember);

// Upload team member image
router.post("/:id/image", protect, adminOnly, upload.single("image"), async (req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ status: "error", message: "No image file provided" });
            }
            cloudinary.uploader
                  .upload_stream({ resource_type: "image", folder: "css" }, async (error, result) => {
                        if (error) {
                              return res.status(500).json({ status: "error", message: "Cloudinary upload failed", error });
                        }
                        const member = await TeamMember.findByIdAndUpdate(req.params.id, { image: result.secure_url }, { new: true });
                        res.status(200).json({ status: "success", data: { member } });
                  })
                  .end(req.file.buffer);
      } catch (err) {
            res.status(500).json({ status: "error", message: err.message });
      }
});
router.patch("/:id/deactivate", protect, adminOnly, validateMongoId, teamMemberController.deactivateTeamMember);
router.patch("/:id/activate", protect, adminOnly, validateMongoId, teamMemberController.activateTeamMember);

module.exports = router;
