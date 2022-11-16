import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

export class GetAllProductsController {
	async handle(req: Request, res: Response): Promise<Response> {
		const getAllProductsUseCase = container.resolve(GetAllProductsUseCase);

		const result = await getAllProductsUseCase.execute();

		return res.status(200).json(result);
	}
}
