import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./src/routers/index.js";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/api",router);

const PORT = process.env.APP_PORT || 2888;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});