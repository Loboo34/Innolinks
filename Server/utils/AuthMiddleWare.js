const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/jwtConfig");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const [Bearer, authToken] = token.split(" ");

  if (Bearer !== "Bearer" || !authToken) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  console.log("Received Token:", authToken); // Debugging line

  jwt.verify(authToken, jwtSecret, (error, decoded) => {
    if (error) {
      console.error("JWT Verification Error:", error); // Debugging line
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = authMiddleware;
