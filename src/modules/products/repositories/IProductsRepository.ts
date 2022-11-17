import { Product } from "@prisma/client";

import { IUpdateProductQuantityDTO } from "../dtos/IUpdateProductQuantityDTO";

export interface IProductsRepository {
	getAll(): Promise<Product[]>;
	getById(id: string): Promise<Product | null>;
	checkProductsById(ids: string[]): Promise<Product[]>;
	updateProductsQuantity(data: IUpdateProductQuantityDTO[]): Promise<void>;
}
