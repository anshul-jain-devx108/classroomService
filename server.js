require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 5001;

// Start the server with error handling
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});
