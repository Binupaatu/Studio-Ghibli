const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
// POST /users/login - User login
authController;
router.post("/login", authController.authenticateUser);

// POST /users - Create a new user
router.post("/",userController.createUser);

// GET /users - Retrieve all users
router.get("/", authMiddleware, userController.getAllUsers);

// GET /users/:id - Retrieve a user by ID
router.get("/:id",authMiddleware, userController.getUserById);

// PUT /users/:id - Update a user's details
router.put("/:id", authMiddleware, userController.updateUser);

// DELETE /users/:id - Delete a user
router.delete("/:id", authMiddleware, userController.deleteUser);

// POST /users/logout - User logout
router.post("/logout", authMiddleware, userController.logoutUser);

// GET /users/:id/profile - Get user's profile
router.get("/:id/profile", authMiddleware, userController.getUserProfile);

// PUT /users/:id/password - Update user's password
router.put("/:id/password", authMiddleware, userController.updatePassword);

module.exports = router;
