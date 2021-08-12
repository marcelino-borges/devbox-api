import dotenv from "dotenv";
import helmet from 'helmet';
import express from "express";
import cors from "cors";
import portfolioRouter from "./routes/portfolio-routes";
import teamRouter from "./routes/team-routes";
import * as portfolioController from "./controllers/portfolio-controller";

dotenv.config();
let PORT = parseInt(process.env.PORT as string, 10);
console.log("PORT: ", PORT);

const app = express();

app.use(helmet());
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.json());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "devbox.eng.br"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//app.use("/api/v1/portfolio", portfolioRouter);

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

app.get("/api/v1/portfolio", cors(), portfolioController.getAllJobs);
app.use("/api/v1/team", teamRouter);

console.log("PORT being used: ", PORT);

app.listen(PORT || 8080, () => {
    console.log(`Listening on port ${PORT}`);
});
