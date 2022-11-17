import { ICreateOrderDTO } from "src/modules/orders/dtos/ICreateOrderDTO";

import { Order } from "@prisma/client";

import { prisma } from "../../../../../database/prismaClient";
import { IOrdersRepository } from "../../../repositories/IOrdersRepository";

export class OrdersRepository implements IOrdersRepository {
	async create({
		clientId,
		status,
		productsIds
	}: ICreateOrderDTO): Promise<Order> {
		const order = await prisma.order.create({
			data: {
				client_id: clientId,
				status,
				Product_Order: {
					createMany: {
						data: productsIds
					}
				}
			}
		});

		return order;
	}
}
