import { ClientsRepository } from "../../infra/prisma/repositories/ClientsRepository";
import { GetAllClientsUseCase } from "./GetAllClientsUseCase";

let clientsRepository: ClientsRepository;
let getAllClientsUseCase: GetAllClientsUseCase;
describe("Get All CLients - Use Case", () => {
	beforeEach(() => {
		clientsRepository = new ClientsRepository();
		getAllClientsUseCase = new GetAllClientsUseCase(clientsRepository);
	});

	it("Should be able to list all clients", async () => {
		clientsRepository.getAll = jest.fn().mockReturnValue([
			{
				id: "da115310-6333-4c52-9b20-a3f11f75e6e9",
				name: "Caio Vinícius",
				created_at: "2022-11-17T13:46:05.658Z",
				order: [
					{
						id: "3797812b-9724-4fe0-8f8a-3d5f1648ec4d",
						status: "waiting for approval",
						created_At: "2022-11-17T14:29:18.055Z",
						client_id: "da115310-6333-4c52-9b20-a3f11f75e6e9"
					}
				]
			}
		]);

		const result = await getAllClientsUseCase.execute();

		expect(result[0]).toHaveProperty("id");
		expect(result[0]).toHaveProperty("order");
	});

	it("Should be able to return an empty array q if there is no user found in database", async () => {
		clientsRepository.getAll = jest.fn().mockReturnValue([]);

		const result = await getAllClientsUseCase.execute();

		expect(result.length).toBe(0);
	});
});
