import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetProductByIdUseCase } from "./GetProductByIdUseCase";

export class GetProductByIdController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		const getProductByIdUseCase = container.resolve(GetProductByIdUseCase);

		const result = await getProductByIdUseCase.execute(id);

		return res.status(200).json(result);
	}
}
