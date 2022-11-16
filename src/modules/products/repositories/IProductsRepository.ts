import { Product } from "@prisma/client";

export interface IProductsRepository {
	getAll(): Promise<Product[]>;
	getById(id: string): Promise<Product | null>;
}
