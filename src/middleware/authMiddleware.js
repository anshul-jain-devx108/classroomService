// const admin = require("../config/firebaseAdmin");

// const authMiddleware = async (req, res, next) => {
//   try {
//     let token = null;

//     // 🔍 Log all cookies received
//     console.log("Received Cookies:", req.cookies);

//     if (req.cookies?.authToken) { 
//       token = req.cookies.authToken; 
//     } else if (req.headers.authorization?.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     console.log("Extracted Token:", token); // ✅ Check if the token is extracted

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     // Verify Firebase token
//     const decodedToken = await admin.auth().verifyIdToken(token);
    
//     if (!decodedToken || !decodedToken.email) {
//       return res.status(403).json({ error: "Forbidden: Invalid token payload" });
//     }

//     req.user = decodedToken; // Attach user info to request
//     console.log("Decoded User:", decodedToken.email);

//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error.message);
//     return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
//   }
// };

// module.exports = authMiddleware;


// const admin = require("../config/firebaseAdmin");

// const authMiddleware = async (req, res, next) => {
//   try {
//     let token = null;

//     if (req.cookies?.authToken) {
//       token = req.cookies.authToken;
//       console.log("🔹 Token from cookies:", token);
//     } else if (req.headers.authorization?.startsWith("Bearer ")) {
//       token = req.headers.authorization.split(" ")[1];
//       console.log("🔹 Token from Authorization header:", token);
//     }

//     if (!token) {
//       console.error("❌ Unauthorized: No token provided");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const decodedToken = await admin.auth().verifyIdToken(token);
//     console.log("✅ Decoded Token:", decodedToken);

//     if (!decodedToken || !decodedToken.email) {
//       console.error("❌ Forbidden: Invalid token payload");
//       return res.status(403).json({ error: "Forbidden: Invalid token payload" });
//     }

//     req.user = decodedTokenjj;
//     next();
//   } catch (error) {
//     console.error("❌ Auth Middleware Error:", error.message);
//     return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
//   }
// };

// module.exports = authMiddleware;


const axios = require("axios");

const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies?.authToken) {
      token = req.cookies.authToken;
      console.log("🔹 Token from cookies:", token);
    } else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔹 Token from Authorization header:", token);
    }

    if (!token) {
      console.error("❌ Unauthorized: No token provided");
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify Google OAuth Access Token
    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);

    if (!googleResponse.data || !googleResponse.data.email) {
      console.error("❌ Invalid OAuth Token");
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    console.log("✅ Google OAuth Token Verified:", googleResponse.data);
    req.user = googleResponse.data;
    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.response?.data || error.message);
    return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
