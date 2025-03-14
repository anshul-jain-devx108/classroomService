const express = require("express");
const router = express.Router();
const classroomController = require("../controllers/classroomController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new classroom (Only authenticated users)
router.post("/", authMiddleware, classroomController.createClassroom);

// Get all classrooms (Only authenticated users)
router.get("/", authMiddleware, classroomController.getAllClassrooms);

// Get a classroom by ID
router.get("/:id", authMiddleware, classroomController.getClassroomById);

// Update a classroom (Only the owner can update)
router.put("/:id", authMiddleware, classroomController.updateClassroom);

// Delete a classroom (Only the owner can delete)
router.delete("/:id", authMiddleware, classroomController.deleteClassroom);

module.exports = router;
