import { Order } from "@prisma/client";

import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";

export interface IOrdersRepository {
	create({ clientId, status, productsIds }: ICreateOrderDTO): Promise<Order>;
}
