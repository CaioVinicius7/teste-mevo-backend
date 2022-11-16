import { injectable, inject } from "tsyringe";

import { Product } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";
import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
export class GetProductByIdUseCase {
	constructor(
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(id: string): Promise<Product | null> {
		const product = await this.productsRepository.getById(id);

		if (!product) {
			throw new AppError("Product not found", 404);
		}

		return product;
	}
}
