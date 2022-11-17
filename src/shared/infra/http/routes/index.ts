import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { ordersRoutes } from "./orders.routes";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use("/api/product", productsRoutes);
router.use("/api/client", clientsRoutes);
router.use("/api/order", ordersRoutes);

export { router };
