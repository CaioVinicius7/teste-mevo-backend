import { Product } from "@prisma/client";

export interface IProductsRepository {
	getAll(): Promise<Product[]>;
}
