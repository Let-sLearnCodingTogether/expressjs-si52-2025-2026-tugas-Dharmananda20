import express from "express";
import * as goalController from "../controllers/goalController.js";
import * as userController from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js";


const api = express.Router();


api.get("/goal", authMiddleware, goalController.lihatSemuaTujuan);
api.post("/goal", authMiddleware, goalController.buatTujuan);
api.put("/goal/:id", authMiddleware, goalController.updateTujuan);
api.delete("/goal/:id", authMiddleware, goalController.hapusTujuan);

api.post("/register", userController.register)
api.post("/login", userController.login)

export default api;