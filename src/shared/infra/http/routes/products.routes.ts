import { Router } from "express";

import { GetAllProductsController } from "../../../../modules/products/useCases/getAllProducts/GetAllProductsController";

const productsRoutes = Router();

const getAllProductsController = new GetAllProductsController();

productsRoutes.get("/", getAllProductsController.handle);

export { productsRoutes };
