import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "rahasia123");
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Token tidak valid" });
  }
};

export default authMiddleware;
