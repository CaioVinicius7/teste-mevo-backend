import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateNewOrderUseCase } from "./CreateNewOrderUseCase";

export class CreateNewOrderController {
	async handle(req: Request, res: Response): Promise<Response> {
		const { clientId, products } = req.body;

		const createNewOrderUseCase = container.resolve(CreateNewOrderUseCase);

		const result = await createNewOrderUseCase.execute({
			clientId,
			orderedProducts: products
		});

		return res.status(201).json(result);
	}
}
