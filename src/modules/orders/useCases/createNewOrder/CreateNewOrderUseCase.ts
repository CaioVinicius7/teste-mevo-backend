import { inject, injectable } from "tsyringe";

import { Order } from "@prisma/client";

import { AppError } from "../../../../shared/errors/AppError";
import { IClientsRepository } from "../../../clients/repositories/IClientsRepository";
import { IProductsRepository } from "../../../products/repositories/IProductsRepository";
import { IOrdersRepository } from "../../repositories/IOrdersRepository";

interface IProducts {
	productId: string;
	quantity: number;
}

interface IRequest {
	clientId: string;
	orderedProducts: IProducts[];
}

@injectable()
export class CreateNewOrderUseCase {
	constructor(
		@inject("OrdersRepository")
		private ordersRepository: IOrdersRepository,
		@inject("ClientsRepository")
		private clientsRepository: IClientsRepository,
		@inject("ProductsRepository")
		private productsRepository: IProductsRepository
	) {}

	async execute({ clientId, orderedProducts }: IRequest): Promise<Order> {
		if (!orderedProducts.length) {
			throw new AppError("The products list is empty");
		}

		const clientExists = await this.clientsRepository.getById(clientId);

		if (!clientExists) {
			throw new AppError("A client with this id does not exists", 401);
		}

		const productsIds = orderedProducts.map((product) => {
			return product.productId;
		});

		const productsExists = await this.productsRepository.checkProductsById(
			productsIds
		);

		if (productsExists.length < orderedProducts.length) {
			throw new AppError("One or more products contains an incorrect id");
		}

		const productsQuantityIsAvailable = productsExists.filter((product) => {
			const orderedQuantityIsAvailable = orderedProducts.find(
				(orderedProduct) =>
					orderedProduct.productId === product.id &&
					orderedProduct.quantity <= product.current_quantity
			);

			if (orderedQuantityIsAvailable) {
				return product;
			}
		});

		if (productsQuantityIsAvailable.length < orderedProducts.length) {
			throw new AppError("one or more requested products are out of stock");
		}

		const order = await this.ordersRepository.create({
			clientId,
			status: "waiting for approval",
			productsIds: productsIds.map((productId) => {
				return {
					product_id: productId
				};
			})
		});

		const updatedProductsQuantity = productsExists.map((product) => {
			const orderedProduct = orderedProducts.find(
				(orderedProduct) => orderedProduct.productId === product.id
			);

			return {
				id: product.id,
				quantity: product.current_quantity - orderedProduct!.quantity
			};
		});

		await this.productsRepository.updateProductsQuantity(
			updatedProductsQuantity
		);

		return order;
	}
}
