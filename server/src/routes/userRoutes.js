const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");
const { validateRegister, validateLogin, validateChangePassword, validateMongoId } = require("../middleware/validation");

// Public routes
router.post("/register", validateRegister, userController.register);
router.post("/login", validateLogin, userController.login);

// Protected routes
router.get("/profile", protect, userController.getProfile);
router.put("/profile", protect, userController.updateProfile);
router.post("/change-password", protect, validateChangePassword, userController.changePassword);
router.delete("/account", protect, userController.deleteAccount);

// Admin routes
router.get("/all", protect, adminOnly, userController.getAllUsers);
router.get("/:id", protect, validateMongoId, userController.getUserById);
router.put("/:id/deactivate", protect, adminOnly, validateMongoId, userController.deactivateUser);
router.put("/:id/activate", protect, adminOnly, validateMongoId, userController.activateUser);

module.exports = router;
