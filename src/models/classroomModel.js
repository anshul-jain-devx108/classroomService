// const { db, admin } = require("../config/firebaseAdmin");

// const Classroom = {
//   create: async (data, ownerEmail) => {
//     const classroomRef = db.collection("classrooms").doc();
//     const classroomData = { id: classroomRef.id, ...data, owner_email: ownerEmail };

//     await classroomRef.set(classroomData);

//     // Map Classroom to Teacher (Users Collection)
//     const userRef = db.collection("users").doc(ownerEmail);
//     const userDoc = await userRef.get();

//     if (userDoc.exists) {
//       await userRef.update({
//         classrooms: admin.firestore.FieldValue.arrayUnion(classroomRef.id),
//       });
//     } else {
//       await userRef.set({ classrooms: [classroomRef.id] });
//     }

//     return classroomData;
//   },

//   getAll: async () => {
//     const snapshot = await db.collection("classrooms").get();
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   },

//   getById: async (id) => {
//     const doc = await db.collection("classrooms").doc(id).get();
//     if (!doc.exists) return null;
//     return { id: doc.id, ...doc.data() };
//   },

//   update: async (id, data) => {
//     await db.collection("classrooms").doc(id).update(data);
//     return { id, ...data };
//   },

//   delete: async (id) => {
//     await db.collection("classrooms").doc(id).delete();
//     return { message: "Classroom deleted successfully" };
//   },
// };

// module.exports = Classroom;



const { db, admin } = require("../config/firebaseAdmin"); // ✅ Import Firestore

if (!db) {
    throw new Error("❌ Firestore instance (db) is undefined!");
}

const Classroom = {
  create: async (data, ownerEmail) => {
    const classroomRef = db.collection("classrooms").doc();
    const classroomData = { id: classroomRef.id, ...data, owner_email: ownerEmail };

    await classroomRef.set(classroomData);

    // Map Classroom to Teacher (Users Collection)
    const userRef = db.collection("users").doc(ownerEmail);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      await userRef.update({
        classrooms: admin.firestore.FieldValue.arrayUnion(classroomRef.id),
      });
    } else {
      await userRef.set({ classrooms: [classroomRef.id] });
    }

    return classroomData;
  },

  // getAll: async () => {
  //   const snapshot = await db.collection("classrooms").get();
  //   return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // },

  getAll: async (userEmail) => {
  const snapshot = await db.collection("classrooms")
    .where("owner_email", "==", userEmail) // 🔹 Filter by owner_email
    .get();

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
},


  getById: async (id) => {
    const doc = await db.collection("classrooms").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  update: async (id, data) => {
    await db.collection("classrooms").doc(id).update(data);
    return { id, ...data };
  },

  delete: async (id) => {
    await db.collection("classrooms").doc(id).delete();
    return { message: "Classroom deleted successfully" };
  },
};

module.exports = Classroom;
