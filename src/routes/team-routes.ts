import * as express from "express";
import cors from "cors";
import * as teamController from "./../controllers/team-controller";

const teamRouter = express.Router();

teamRouter.get("/", teamController.getAllMembers);
teamRouter.get("/id/:id", teamController.getMemberById);
teamRouter.get("/name", teamController.getMemberByName);
teamRouter.get("/email/:email", teamController.getMemberByEmail);

export default teamRouter;