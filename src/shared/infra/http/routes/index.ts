import { Router } from "express";

import { productsRoutes } from "./products.routes";

const router = Router();

router.use("/product", productsRoutes);

export { router };
