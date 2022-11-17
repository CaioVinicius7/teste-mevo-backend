import { ProductsRepository } from "../../infra/prisma/repositories/ProductsRepository";
import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

let productsRepository: ProductsRepository;
let getAllProductsUseCase: GetAllProductsUseCase;
describe("Get All Products - Use Case", () => {
	beforeEach(() => {
		productsRepository = new ProductsRepository();
		getAllProductsUseCase = new GetAllProductsUseCase(productsRepository);
	});

	it("Should be able to list all products", async () => {
		productsRepository.getAll = jest.fn().mockReturnValue([
			{
				id: "7ae1dc69-2b27-44e9-a7ab-7328b53da1aa",
				name: "Mouse",
				is_active: true,
				current_quantity: 5,
				created_at: "2022-11-17T13:46:05.664Z"
			},
			{
				id: "3d56e1cd-d26f-4928-ade9-b9ad78564c3c",
				name: "Mousepad",
				is_active: true,
				current_quantity: 5,
				created_at: "2022-11-17T13:46:05.664Z"
			}
		]);

		const result = await getAllProductsUseCase.execute();

		expect(result.length).toBe(2);
		expect(result[0]).toHaveProperty("id");
	});

	it("Should be able to return an empty array q if there is no products found in database", async () => {
		productsRepository.getAll = jest.fn().mockReturnValue([]);

		const result = await getAllProductsUseCase.execute();

		expect(result.length).toBe(0);
	});
});
