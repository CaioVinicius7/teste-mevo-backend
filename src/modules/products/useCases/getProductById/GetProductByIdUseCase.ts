import { injectable, inject } from "tsyringe";

import { Product } from "@prisma/client";

import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
export class GetProductByIdUseCase {
	constructor(
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(id: string): Promise<Product | null> {
		const product = await this.productsRepository.getById(id);

		return product;
	}
}
