/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";

import cors from "cors";
import Express, { NextFunction, Request, Response } from "express";

import { AppError } from "../../errors/AppError";
import { router } from "./routes/index";
import "../../container";

const app = Express();

app.use(cors());
app.use(Express.json());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message
		});
	}
});

export { app };
