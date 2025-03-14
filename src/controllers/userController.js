const { db } = require('../config/firebaseAdmin');
const User = require('../models/UserModel');

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, location, subject, education } = req.body;
    const newUser = await db.collection('users').doc(email).set({
      name, email, phone, location, subject, education, classrooms: []
    });
    res.status(201).json({ id: email, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('users').doc(id).update(req.body);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('users').doc(id).delete();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
