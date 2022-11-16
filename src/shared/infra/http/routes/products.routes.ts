import { Router } from "express";

import { GetAllProductsController } from "../../../../modules/products/useCases/getAllProducts/GetAllProductsController";
import { GetProductByIdController } from "../../../../modules/products/useCases/getProductById/GetProductByIdController";

const productsRoutes = Router();

const getAllProductsController = new GetAllProductsController();
const getProductByIdController = new GetProductByIdController();

productsRoutes.get("/", getAllProductsController.handle);
productsRoutes.get("/:id", getProductByIdController.handle);

export { productsRoutes };
