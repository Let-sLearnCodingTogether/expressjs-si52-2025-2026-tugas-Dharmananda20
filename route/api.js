import express from "express";
import * as goalController from "../controllers/goalController.js";


const api = express.Router();


api.get("/goal", goalController.lihatSemuaTujuan);
api.post("/goal", goalController.buatTujuan);
api.put("/goal/:id", goalController.updateTujuan);
api.delete("/goal/:id", goalController.hapusTujuan);


export default api;