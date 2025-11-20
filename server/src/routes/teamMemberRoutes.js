const express = require("express");
const router = express.Router();
const teamMemberController = require("../controllers/teamMemberController");
const { protect, adminOnly } = require("../middleware/auth");
const { validateCreateTeamMember, validateUpdateTeamMember, validateMongoId } = require("../middleware/validation");

// Public routes
router.get("/", teamMemberController.getAllTeamMembers);
router.get("/active", teamMemberController.getActiveTeamMembers);
router.get("/:id", validateMongoId, teamMemberController.getTeamMemberById);

// Admin routes
router.post("/", protect, adminOnly, validateCreateTeamMember, teamMemberController.createTeamMember);
router.put("/:id", protect, adminOnly, validateMongoId, validateUpdateTeamMember, teamMemberController.updateTeamMember);
router.delete("/:id", protect, adminOnly, validateMongoId, teamMemberController.deleteTeamMember);
router.patch("/:id/deactivate", protect, adminOnly, validateMongoId, teamMemberController.deactivateTeamMember);
router.patch("/:id/activate", protect, adminOnly, validateMongoId, teamMemberController.activateTeamMember);

module.exports = router;
