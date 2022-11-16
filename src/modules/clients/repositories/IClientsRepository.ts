import { Client } from "@prisma/client";

export interface IClientsRepository {
	getAll(): Promise<Client[]>;
}
