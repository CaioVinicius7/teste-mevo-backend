import { AppError } from "../../../../shared/errors/AppError";
import { ProductsRepository } from "../../infra/prisma/repositories/ProductsRepository";
import { GetProductByIdUseCase } from "./GetProductByIdUseCase";

let productsRepository: ProductsRepository;
let getProductByIdUseCase: GetProductByIdUseCase;
describe("Get Product By Id - Use Case", () => {
	beforeEach(() => {
		productsRepository = new ProductsRepository();
		getProductByIdUseCase = new GetProductByIdUseCase(productsRepository);
	});

	it("Should be able to list a product filtered by id", async () => {
		productsRepository.getById = jest.fn().mockReturnValue({
			id: "7ae1dc69-2b27-44e9-a7ab-7328b53da1aa",
			name: "Mouse",
			is_active: true,
			current_quantity: 5,
			created_at: "2022-11-17T13:46:05.664Z"
		});

		const result = await getProductByIdUseCase.execute(
			"92ba6b2c-190a-4d1b-9340-d8da3b6e33d5"
		);

		expect(result).toHaveProperty("id");
	});

	it("Should be able to throw an exception if no find a product with the informed id", async () => {
		productsRepository.getById = jest.fn().mockReturnValue(null);

		await expect(
			getProductByIdUseCase.execute("92ba6b2c-190a-4d1b-9340-d8da3b6e33d5")
		).rejects.toEqual(new AppError("Product not found", 404));
	});
});
