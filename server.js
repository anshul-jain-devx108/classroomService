require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.port || 5001;

// Start the server with error handling
app.listen(PORT, "0.0.0.0",() => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});
