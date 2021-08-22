import * as express from "express";
import * as filesController from "../controllers/files.controller";
import { initializeMulter } from "../utils/files-utils";

const uploadImg = initializeMulter();

const filesRouter = express.Router();

filesRouter.post("/img/", uploadImg, filesController.uploadFile);
filesRouter.delete("/img/", filesController.deleteFile);

export default filesRouter;