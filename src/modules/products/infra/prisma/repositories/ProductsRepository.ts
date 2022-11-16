import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { Product } from "@prisma/client";

import { prisma } from "../../../../../database/prismaClient";

export class ProductsRepository implements IProductsRepository {
	async getAll(): Promise<Product[]> {
		const products = await prisma.product.findMany();

		return products;
	}
}
