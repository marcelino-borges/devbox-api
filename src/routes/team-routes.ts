import * as express from "express";
import cors from "cors";
import * as teamController from "./../controllers/team-controller";

const teamRouter = express.Router();

var corsWhitelist = [
    'http://devbox.eng.br',
    'https://devbox.eng.br'
];

var corsOptions = {
    origin: function (origin: any, callback: any) {
        if (corsWhitelist.indexOf(origin) !== -1) {
            console.log("origin known");
            callback(null, true);
        } else {
            console.log("origin not known");
            callback(new Error('Not allowed by CORS'));
        }
      },
    optionsSuccessStatus: 200, // legacy browser support
}

teamRouter.get("/", cors(corsOptions), teamController.getAllMembers);
teamRouter.get("/id/:id", cors(corsOptions), teamController.getMemberById);
teamRouter.get("/name", cors(corsOptions), teamController.getMemberByName);

export default teamRouter;