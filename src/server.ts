import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet';
import express from "express";
import connectMongo from "./mongo/config";
import portfolioRouter from "./routes/portfolio-routes";
import teamRouter from "./routes/team-routes";
import filesRouter from "./routes/files.routes";

dotenv.config();

const PORT = parseInt(process.env.PORT as string, 10);

console.log("PORT on env: ", PORT);

const app = express();
connectMongo();

var corsWhitelist = [
  'http://devbox.eng.br',
  'https://devbox.eng.br'
];

var corsOptions = {
    origin: function (origin: any, callback: any) {
        if (corsWhitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    optionsSuccessStatus: 200, // legacy browser support
}
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/portfolio", portfolioRouter);
app.use("/api/v1/team", teamRouter);
app.use("/api/v1/files", filesRouter);

app.listen(PORT || 8080, () => {
    console.log(`Listening on port ${PORT}`);
});
