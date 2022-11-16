import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAllClientsUseCase } from "./GetAllClientsUseCase";

export class GetAllClientsController {
	async handle(req: Request, res: Response): Promise<Response> {
		const getAllClientsUseCase = container.resolve(GetAllClientsUseCase);

		const result = await getAllClientsUseCase.execute();

		return res.status(200).json(result);
	}
}
