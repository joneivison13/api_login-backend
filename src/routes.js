const express = require("express");
const multer = require("multer");
const path = require("path");
const UserController = require("./Controllers/UserController");
const route = express.Router();

// const uploadSingle = multer({ dest: `${__dirname}/temp/uploads/images` });
const storageData = multer.diskStorage({
  destination: function (req, file, cb) {
    // error first callback
    cb(null, path.resolve(__dirname, "..", "temp", "uploads", "images"));
  },
  filename: function (req, file, cb) {
    // error first callback
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageData });

route.get("/", (req, res) => {
  return res.json({ ok: true });
});

route.post("/store", upload.single("file"), UserController.store);
route.put("/update/:id", upload.single("file"), UserController.update);
route.get("/list/:id", upload.single("file"), UserController.show);

module.exports = route;
