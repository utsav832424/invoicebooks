import express from "express";
import controller from "../controllers/index.js";
const router = express.Router();
import multer from "multer";
const upload = multer().array();

router.post("/addinvoice", upload, controller.invoiceController.addInvoice);
router.get("/getinvoices", upload, controller.invoiceController.getInvoices);
router.get("/getinvoicesbyid", upload, controller.invoiceController.getInvoicesByid);
router.post("/updateInvoice", upload, controller.invoiceController.updateInvoice);
router.post("/deleteInvoice", upload, controller.invoiceController.deleteInvoice);

export default router;