import express from "express";
import controller from "../controllers/index.js";
const router = express.Router();
import multer from "multer";
const upload = multer().array();

router.post("/addclient",upload,controller.clientController.addclient);
router.get("/getclient",controller.clientController.getclient);
router.post("/updateclient",upload,controller.clientController.updateclient);

export default router;