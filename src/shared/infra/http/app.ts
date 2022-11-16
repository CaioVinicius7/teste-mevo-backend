import "dotenv/config";
import "reflect-metadata";

import cors from "cors";
import Express, { Request, Response } from "express";

const app = Express();

app.use(cors());
app.use(Express.json());

app.get("/", (req: Request, res: Response) => {
	return res.status(200).json({
		message: "Success"
	});
});

export { app };
