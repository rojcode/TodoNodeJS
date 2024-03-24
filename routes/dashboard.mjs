import { Router } from "express";
import __controller from "../controllers/dashboard.mjs";
import multer from "multer";
import userSetting from "../model/userSettings.mjs";
import path from "path";

const __dashboardRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    const filename = path.basename(file.originalname, extension);
    cb(null, filename + "_" + Date.now() + extension);
  },
});


const __upload = multer({ storage: storage });

__dashboardRouter.get("/",__controller.checkUser);

__dashboardRouter.post(
  "/users/update",
  __upload.single("avatar"),
  __controller.userUpdate
);

__dashboardRouter.post('/users/change',__upload.single("avatar"),__controller.changeSettings);

export default __dashboardRouter;
