import * as express from "express";
import * as logsController from "../controllers/logs-controller";

const logsRouter = express.Router();

logsRouter.get("/", logsController.getAllLogs);
logsRouter.get("/type/:type", logsController.getLogsByType);
logsRouter.post("/", logsController.createLog);
logsRouter.put("/", logsController.updateLog);
logsRouter.delete("/id/:id", logsController.deleteLog);

export default logsRouter;