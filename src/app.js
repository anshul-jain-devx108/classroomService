// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const classroomRoutes = require("./routes/classroomRoutes");

// const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/classrooms", classroomRoutes);

// module.exports = app;

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const classroomRoutes = require("./routes/classroomRoutes");
// const userRoutes = require("./routes/userRoutes");

// const app = express();

// // Enable CORS to allow frontend requests
// app.use(
//   cors({
//     origin: "https://learn-sphere-ai-powered-educational-platform.vercel.app", // Ensure this matches your frontend URL
//     credentials: true, // Allows sending cookies with requests
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// // Middleware to parse JSON and cookies
// app.use(express.json());
// app.use(cookieParser());
// app.options("*", cors());


// // Classroom API routes
// app.use("/api/classrooms", classroomRoutes);

// //User API routes
// app.use("/api/users", userRoutes);

// module.exports = app;


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const classroomRoutes = require("./routes/classroomRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

const corsOptions = {
  origin: "https://learn-sphere-ai-powered-educational-platform.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS with options
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests correctly
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use("/api/classrooms", classroomRoutes);
app.use("/api/users", userRoutes);

module.exports = app;

