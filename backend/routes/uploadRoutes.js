//This is where all the routes are sent from 
import path from "path";
//The path module provides a lot of very useful functionality to access and interact with the file system
import express from "express";
//Express. js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications
import multer from "multer";
//Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files
const router = express.Router();
//The routes is then set from express

//A storage constant should be set to store all the required routes 
const storage = multer.diskStorage({
  //The distination should be set to the file and databse
  destination(req, file, cb) {
    //All the files in the databse are also stored in the uploads 
    cb(null, "uploads/");
  },
  //The file names also require a require object alongside file and cb
  filename(req, file, cb) {
    cb(
      //The file name should be selected witht the data along side it and a null object should be returned 
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//The file types should be checked for the images when uploaded 
function checkFileType(file, cb) {
  //The files types that should be acepted are jpg and png only
  const filetypes = /jpg|jpeg|png/;
  //The exact name of the file type is being set here
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //The mime type of the files should be set here
  const mimetype = filetypes.test(file.mimetype);

  //If the exact name and mime type are true 
  if (extname && mimetype) {
    //Then return the cb object with null and true
    return cb(null, true);
    //Else then return 
  } else {
    //Show a message saying only images are accepted 
    cb("Images only!");
  }
}

//The multer should be set here to the upload file
const upload = multer({
  //The storage and file filter should be done here
  storage,
  fileFilter: function (req, file, cb) {
    //The file types should be checked 
    checkFileType(file, cb);
    //The check is done
  },
});

//The routes would then send the uploaded image using the request and responce object 
router.post("/", upload.single("image"), (req, res) => {
  //The file is then used the responce object to the  file path
  res.send(`/${req.file.path}`);
});

export default router;
//The router is then exported 

