import { container } from "tsyringe";

import { ClientsRepository } from "../../modules/clients/infra/prisma/repositories/ClientsRepository";
import { IClientsRepository } from "../../modules/clients/repositories/IClientsRepository";
import { OrdersRepository } from "../../modules/orders/infra/prisma/repositories/OrdersRepository";
import { IOrdersRepository } from "../../modules/orders/repositories/IOrdersRepository";
import { ProductsRepository } from "../../modules/products/infra/prisma/repositories/ProductsRepository";
import { IProductsRepository } from "../../modules/products/repositories/IProductsRepository";

container.registerSingleton<IProductsRepository>(
	"ProductsRepository",
	ProductsRepository
);

container.registerSingleton<IClientsRepository>(
	"ClientsRepository",
	ClientsRepository
);

container.registerSingleton<IOrdersRepository>(
	"OrdersRepository",
	OrdersRepository
);
