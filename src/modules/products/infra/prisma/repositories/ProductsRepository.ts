import { Product } from "@prisma/client";

import { prisma } from "../../../../../database/prismaClient";
import { IUpdateProductQuantityDTO } from "../../../dtos/IUpdateProductQuantityDTO";
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

	async checkProductsById(ids: string[]): Promise<Product[]> {
		const products = await prisma.product.findMany({
			where: {
				id: {
					in: ids
				}
			}
		});

		return products;
	}

	async updateProductsQuantity(
		data: IUpdateProductQuantityDTO[]
	): Promise<void> {
		const queries = data.map((productData) => {
			return prisma.product.update({
				data: {
					current_quantity: productData.quantity
				},
				where: {
					id: productData.id
				}
			});
		});

		await prisma.$transaction(queries);
	}
}
