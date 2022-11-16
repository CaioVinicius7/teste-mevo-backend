import { Router } from "express";

import { GetAllClientsController } from "../../../../modules/clients/useCases/getAllClients/GetAllClientsController";

const clientsRoutes = Router();

const getAllClientsController = new GetAllClientsController();

clientsRoutes.get("/", getAllClientsController.handle);

export { clientsRoutes };
