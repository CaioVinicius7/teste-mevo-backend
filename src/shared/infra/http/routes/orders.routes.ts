import { Router } from "express";

import { CreateNewOrderController } from "../../../../modules/orders/useCases/createNewOrder/CreateNewOrderController";

const ordersRoutes = Router();

const createNewOrderController = new CreateNewOrderController();

ordersRoutes.post("/", createNewOrderController.handle);

export { ordersRoutes };
