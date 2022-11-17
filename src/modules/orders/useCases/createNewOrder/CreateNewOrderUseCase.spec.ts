import { AppError } from "../../../../shared/errors/AppError";
import { ClientsRepository } from "../../../clients/infra/prisma/repositories/ClientsRepository";
import { ProductsRepository } from "../../../products/infra/prisma/repositories/ProductsRepository";
import { OrdersRepository } from "../../infra/prisma/repositories/OrdersRepository";
import { CreateNewOrderUseCase } from "./CreateNewOrderUseCase";

let ordersRepository: OrdersRepository;
let clientsRepository: ClientsRepository;
let productsRepository: ProductsRepository;
let createNewOrderUseCase: CreateNewOrderUseCase;

describe("Create New Order - Use Case", () => {
	beforeEach(() => {
		ordersRepository = new OrdersRepository();
		clientsRepository = new ClientsRepository();
		productsRepository = new ProductsRepository();
		createNewOrderUseCase = new CreateNewOrderUseCase(
			ordersRepository,
			clientsRepository,
			productsRepository
		);
	});

	it("Should be able to create a new order", async () => {
		clientsRepository.getById = jest.fn().mockReturnValue({
			id: "21bc3427-5219-4050-b4ed-432edfd32f58",
			name: "Caio Vinícius",
			created_at: "2022-11-17T13:46:05.658Z",
			order: []
		});

		productsRepository.checkProductsById = jest.fn().mockReturnValue([
			{
				id: "0c354650-8387-4924-a36c-8888809c2363",
				name: "Mouse",
				is_active: true,
				current_quantity: 5,
				created_at: "2022-11-17T13:46:05.664Z"
			},
			{
				id: "149bafec-5d4a-495e-b021-4aca251b6c75",
				name: "Mousepad",
				is_active: true,
				current_quantity: 5,
				created_at: "2022-11-17T13:46:05.664Z"
			}
		]);

		ordersRepository.create = jest.fn().mockReturnValue({
			id: "da115310-6333-4c52-9b20-a3f11f75e6e9",
			status: "waiting for approval",
			created_At: "2022-11-17T14:30:22.779Z",
			client_id: "21bc3427-5219-4050-b4ed-432edfd32f58"
		});

		productsRepository.updateProductsQuantity = jest.fn().mockReturnValue(null);

		const result = await createNewOrderUseCase.execute({
			clientId: "21bc3427-5219-4050-b4ed-432edfd32f58",
			orderedProducts: [
				{
					productId: "0c354650-8387-4924-a36c-8888809c2363",
					quantity: 1
				},
				{
					productId: "149bafec-5d4a-495e-b021-4aca251b6c75",
					quantity: 3
				}
			]
		});

		expect(result).toHaveProperty("id");
		expect(result).toHaveProperty("client_id");
		expect(result.status).toBe("waiting for approval");
	});

	it("Should be able to throw an exception if you do not receive any product", async () => {
		await expect(
			createNewOrderUseCase.execute({
				clientId: "21bc3427-5219-4050-b4ed-432edfd32f58",
				orderedProducts: []
			})
		).rejects.toEqual(new AppError("The products list is empty"));
	});

	it("Should be able to throw an exception if the client with the given id does not exist", async () => {
		clientsRepository.getById = jest.fn().mockReturnValue(null);

		await expect(
			createNewOrderUseCase.execute({
				clientId: "21bc3427-5219-4050-b4ed-432edfd32f58",
				orderedProducts: [
					{
						productId: "0c354650-8387-4924-a36c-8888809c2363",
						quantity: 1
					},
					{
						productId: "149bafec-5d4a-495e-b021-4aca251b6c75",
						quantity: 3
					}
				]
			})
		).rejects.toEqual(
			new AppError("A client with this id does not exists", 401)
		);
	});

	it("Should be able to throw an exception if any received product has the wrong id", async () => {
		clientsRepository.getById = jest.fn().mockReturnValue({
			id: "21bc3427-5219-4050-b4ed-432edfd32f58",
			name: "Caio Vinícius",
			created_at: "2022-11-17T13:46:05.658Z",
			order: []
		});

		productsRepository.checkProductsById = jest.fn().mockReturnValue([
			{
				id: "0c354650-8387-4924-a36c-8888809c2363",
				name: "Mouse",
				is_active: true,
				current_quantity: 5,
				created_at: "2022-11-17T13:46:05.664Z"
			}
		]);

		await expect(
			createNewOrderUseCase.execute({
				clientId: "21bc3427-5219-4050-b4ed-432edfd32f58",
				orderedProducts: [
					{
						productId: "0c354650-8387-4924-a36c-8888809c2363",
						quantity: 1
					},
					{
						productId: "149bafec-5d4a-495e-b021-4aca251b6c75",
						quantity: 3
					}
				]
			})
		).rejects.toEqual(
			new AppError("One or more products contains an incorrect id")
		);
	});

	it("Should be able to throw an exception if the quantity of a product ordered is smaller than the quantity available in stock", async () => {
		clientsRepository.getById = jest.fn().mockReturnValue({
			id: "21bc3427-5219-4050-b4ed-432edfd32f58",
			name: "Caio Vinícius",
			created_at: "2022-11-17T13:46:05.658Z",
			order: []
		});

		productsRepository.checkProductsById = jest.fn().mockReturnValue([
			{
				id: "0c354650-8387-4924-a36c-8888809c2363",
				name: "Mouse",
				is_active: true,
				current_quantity: 5,
				created_at: "2022-11-17T13:46:05.664Z"
			},
			{
				id: "149bafec-5d4a-495e-b021-4aca251b6c75",
				name: "Mousepad",
				is_active: true,
				current_quantity: 1,
				created_at: "2022-11-17T13:46:05.664Z"
			}
		]);

		await expect(
			createNewOrderUseCase.execute({
				clientId: "21bc3427-5219-4050-b4ed-432edfd32f58",
				orderedProducts: [
					{
						productId: "0c354650-8387-4924-a36c-8888809c2363",
						quantity: 1
					},
					{
						productId: "149bafec-5d4a-495e-b021-4aca251b6c75",
						quantity: 3
					}
				]
			})
		).rejects.toEqual(
			new AppError("one or more requested products are out of stock")
		);
	});
});
