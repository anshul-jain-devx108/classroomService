// const Classroom = require("../models/classroomModel");

// /**
//  * Create a new classroom and assign it to the teacher (owner_email)
//  */
// exports.createClassroom = async (req, res) => {
//   try {
//     console.log("Received Request Body:", req.body);
//     console.log("Authenticated User:", req.user);

//     const { title, subject, room, description } = req.body;

//     if (!title || !subject) {
//       return res.status(400).json({ error: "Title and Subject are required" });
//     }

//     const newClassroom = await Classroom.create({
//       title,
//       subject,
//       room: room || "",
//       description: description || "",
//       createdBy: req.user.email,
//     });

//     res.status(201).json(newClassroom);
//   } catch (error) {
//     console.error("Error creating classroom:", error);
//     res.status(500).json({ error: "Failed to create classroom" });
//   }
// };

// /**
//  * Get all classrooms
//  */
// exports.getAllClassrooms = async (req, res) => {
//   try {
//     const classrooms = await Classroom.getAll();
//     return res.status(200).json({ classrooms });
//   } catch (error) {
//     console.error("Error fetching classrooms:", error);
//     return res.status(500).json({ error: "Failed to fetch classrooms" });
//   }
// };

// /**
//  * Get a single classroom by ID
//  */
// exports.getClassroomById = async (req, res) => {
//   try {
//     const classroom = await Classroom.getById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ error: "Classroom not found" });
//     }
//     return res.status(200).json(classroom);
//   } catch (error) {
//     console.error("Error fetching classroom:", error);
//     return res.status(500).json({ error: "Failed to fetch classroom" });
//   }
// };

// /**
//  * Update a classroom (Only the owner can update)
//  */
// exports.updateClassroom = async (req, res) => {
//   try {
//     const classroom = await Classroom.getById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ error: "Classroom not found" });
//     }

//     if (classroom.owner_email !== req.user.email) {
//       return res.status(403).json({ error: "Unauthorized: You can only update your own classrooms" });
//     }

//     const updatedClassroom = await Classroom.update(req.params.id, req.body);
//     return res.status(200).json({ message: "Classroom updated successfully", classroom: updatedClassroom });
//   } catch (error) {
//     console.error("Error updating classroom:", error);
//     return res.status(500).json({ error: "Failed to update classroom" });
//   }
// };

// /**
//  * Delete a classroom (Only the owner can delete)
//  */
// exports.deleteClassroom = async (req, res) => {
//   try {
//     const classroom = await Classroom.getById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ error: "Classroom not found" });
//     }

//     if (classroom.owner_email !== req.user.email) {
//       return res.status(403).json({ error: "Unauthorized: You can only delete your own classrooms" });
//     }

//     await Classroom.delete(req.params.id);
//     return res.status(200).json({ message: "Classroom deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting classroom:", error);
//     return res.status(500).json({ error: "Failed to delete classroom" });
//   }
// };



const Classroom = require("../models/classroomModel");

exports.createClassroom = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body);
    console.log("Authenticated User:", req.user);

    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const { title, subject, room, description } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ error: "Title and Subject are required" });
    }

    const newClassroom = await Classroom.create(
      {
        title,
        subject,
        room: room || "",
        description: description || "",
        createdBy: req.user.email,
      },
      req.user.email // Pass `ownerEmail`
    );

    res.status(201).json(newClassroom);
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({ error: "Failed to create classroom" });
  }
};

/**
 * Get all classrooms
 */
exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.getAll();
    return res.status(200).json({ classrooms });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};

/**
 * Get a single classroom by ID
 */
// exports.getClassroomById = async (req, res) => {
//   try {
//     const classroom = await Classroom.getById(req.params.id);
//     if (!classroom) {
//       return res.status(404).json({ error: "Classroom not found" });
//     }
//     return res.status(200).json(classroom);
//   } catch (error) {
//     console.error("Error fetching classroom:", error);
//     return res.status(500).json({ error: "Failed to fetch classroom" });
//   }
// };

exports.getAllClassrooms = async (req, res) => {
  try {
    if (!req.user || !req.user.email) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const classrooms = await Classroom.getAll(req.user.email);
    return res.status(200).json({ classrooms });
  } catch (error) {
    console.error("Error fetching classrooms:", error);
    return res.status(500).json({ error: "Failed to fetch classrooms" });
  }
};


/**
 * Update a classroom (Only the owner can update)
 */
exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.getById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    if (classroom.owner_email !== req.user.email) {
      return res.status(403).json({ error: "Unauthorized: You can only update your own classrooms" });
    }

    const updatedClassroom = await Classroom.update(req.params.id, req.body);
    return res.status(200).json({ message: "Classroom updated successfully", classroom: updatedClassroom });
  } catch (error) {
    console.error("Error updating classroom:", error);
    return res.status(500).json({ error: "Failed to update classroom" });
  }
};

/**
 * Delete a classroom (Only the owner can delete)
 */
exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.getById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ error: "Classroom not found" });
    }

    if (classroom.owner_email !== req.user.email) {
      return res.status(403).json({ error: "Unauthorized: You can only delete your own classrooms" });
    }

    await Classroom.delete(req.params.id);
    return res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    console.error("Error deleting classroom:", error);
    return res.status(500).json({ error: "Failed to delete classroom" });
  }
};
