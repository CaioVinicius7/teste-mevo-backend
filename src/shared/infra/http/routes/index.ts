import { Router } from "express";

import { clientsRoutes } from "./clients.routes";
import { productsRoutes } from "./products.routes";

const router = Router();

router.use("/product", productsRoutes);
router.use("/client", clientsRoutes);

export { router };
