import express from "express";
import controller from "../controllers/index.js";
const router = express.Router();
import multer from "multer";
const upload = multer().array();

router.post("/addproduct", upload, controller.productController.addProduct);
router.get("/getproduct", controller.productController.getProduct);
router.post("/updateproduct", upload, controller.productController.updateProduct);


export default router;