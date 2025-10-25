import express from "express";
import * as goalController from "../controllers/goalController.js";
import * as userController from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"


const api = express.Router();


api.get("/goal", protect, goalController.lihatSemuaTujuan);
api.post("/goal", protect ,goalController.buatTujuan);
api.put("/goal/:id", protect,goalController.updateTujuan);
api.delete("/goal/:id",protect ,goalController.hapusTujuan);
api.get("/profile", protect, userController.UserProfile);

api.post("/register", userController.register)
api.post("/login", userController.login)

export default api;