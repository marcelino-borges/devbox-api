import * as express from "express";
import cors from "cors";
import * as portfolioController from "./../controllers/portfolio-controller";

const portfolioRouter = express.Router();

var corsWhitelist = [
    'http://devbox.eng.br',
    'https://devbox.eng.br'
];

var corsOptions = {
    origin: function (origin: any, callback: any) {
        if (corsWhitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    optionsSuccessStatus: 200, // legacy browser support
}

portfolioRouter.get("/", cors(corsOptions), portfolioController.getAllJobs);
portfolioRouter.get("/id/:id", cors(corsOptions), portfolioController.getJobById);
portfolioRouter.get("/name/:name", cors(corsOptions), portfolioController.getJobByName);

export default portfolioRouter;