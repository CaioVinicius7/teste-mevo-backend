import { Client } from "@prisma/client";

export interface IClientsRepository {
	getAll(): Promise<Client[]>;
	getById(id: string): Promise<Client | null>;
}
