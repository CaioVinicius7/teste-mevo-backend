import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import Express from "express";

import "../../container";
import { router } from "./routes/index";

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(router);

export { app };
