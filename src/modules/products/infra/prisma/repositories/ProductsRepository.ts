import { Product } from "@prisma/client";

import { prisma } from "../../../../../database/prismaClient";
import { IProductsRepository } from "../../../repositories/IProductsRepository";

export class ProductsRepository implements IProductsRepository {
	async getAll(): Promise<Product[]> {
		const products = await prisma.product.findMany();

		return products;
	}

	async getById(id: string): Promise<Product | null> {
		const product = await prisma.product.findUnique({
			where: {
				id
			}
		});

		return product;
	}
}
