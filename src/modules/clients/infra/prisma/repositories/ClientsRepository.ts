import { Client } from "@prisma/client";

import { prisma } from "../../../../../database/prismaClient";
import { IClientsRepository } from "../../../repositories/IClientsRepository";

export class ClientsRepository implements IClientsRepository {
	async getAll(): Promise<Client[]> {
		const clients = await prisma.client.findMany();

		return clients;
	}
}
