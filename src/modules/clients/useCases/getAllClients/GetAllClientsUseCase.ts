import { inject, injectable } from "tsyringe";

import { Client } from "@prisma/client";

import { IClientsRepository } from "../../repositories/IClientsRepository";

@injectable()
export class GetAllClientsUseCase {
	constructor(
		@inject("ClientsRepository")
		private clientsRepository: IClientsRepository
	) {}

	async execute(): Promise<Client[]> {
		const clients = await this.clientsRepository.getAll();

		return clients;
	}
}
