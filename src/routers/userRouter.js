import express from "express";
import controller from "../controllers/index.js";
const router = express.Router();
import multer from "multer";
const upload = multer().array();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      var fileData = file.originalname.split('.');
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileData[fileData.length - 1])
    }
  }); 
  
  var fileupload = multer({storage:storage});
  
router.post("/adduser",upload,controller.userController.addUser);
router.post("/login",upload,controller.userController.login);
router.post("/updateuser",upload,controller.userController.updateuser);
router.get("/getalluser",upload,controller.userController.getAlluser);
router.post("/profile_pic",fileupload.single("image"),controller.userController.profile_update);
router.post("/changepass",upload,controller.userController.change_password);

export default router;