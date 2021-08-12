import * as express from "express";
import * as portfolioController from "./../controllers/portfolio-controller";

const portfolioRouter = express.Router();

portfolioRouter.get("/", portfolioController.getAllJobs);
portfolioRouter.get("/id/:id", portfolioController.getJobById);
portfolioRouter.get("/name/:name", portfolioController.getJobByName);

export default portfolioRouter;