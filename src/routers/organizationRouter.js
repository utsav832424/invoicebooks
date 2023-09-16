import express from "express";
import controller from "../controllers/index.js";
const router = express.Router();
import multer from "multer";
const upload = multer().array();

router.post("/addorganization",upload,controller.organizationController.addOrganization);
router.get("/getorganization",controller.organizationController.getOrganization);
router.post("/updateorganization",upload,controller.organizationController.updateOrganization);

export default router;