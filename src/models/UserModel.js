const { db, admin } = require("../config/firebaseAdmin");

class User {
    constructor(id, name, email, phone, location, subject, education, classrooms = []) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.location = location;
      this.subject = subject;
      this.education = education;
      this.classrooms = classrooms; // Array of classroom IDs
    }
  }
module.exports = User;