import { inject, injectable } from "tsyringe";

import { Product } from "@prisma/client";

import { IProductsRepository } from "../../repositories/IProductsRepository";

@injectable()
export class GetAllProductsUseCase {
	constructor(
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute(): Promise<Product[]> {
		const products = await this.productsRepository.getAll();

		return products;
	}
}
