import * as express from "express";
import cors from "cors";
import * as portfolioController from "./../controllers/portfolio-controller";

const portfolioRouter = express.Router();

portfolioRouter.get("/", portfolioController.getAllJobs);
portfolioRouter.get("/id/:id", portfolioController.getJobById);
portfolioRouter.get("/name/:name", portfolioController.getJobByName);
portfolioRouter.post("/", portfolioController.createPortfolio);
portfolioRouter.put("/", portfolioController.updatePortfolio);
portfolioRouter.delete("/", portfolioController.deletePortfolio);

export default portfolioRouter;