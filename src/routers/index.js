import express from "express";
const router = express.Router();
import userRouter from "./userRouter.js";
import organizationRouter from "./organizationRouter.js";
import clientRouter from "./clientRouter.js";
import productRouter from "./productRouter.js";
import invoiceRouter from "./invoiceRouter.js";

router.use("/user", userRouter);
router.use("/organization", organizationRouter);
router.use("/client", clientRouter);
router.use("/product",productRouter);
router.use("/invoice",invoiceRouter);

export default router;