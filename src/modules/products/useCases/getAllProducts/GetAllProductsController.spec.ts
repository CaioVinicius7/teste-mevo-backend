import request from "supertest";

import { app } from "../../../../shared/infra/http/app";

describe("Get All Products - Controller", () => {
	it("Should be able to list all products", async () => {
		const response = await request(app).get("/api/product");

		expect(response.statusCode).toBe(200);
		expect(response.body[0]).toHaveProperty("id");
		expect(response.body[0]).toHaveProperty("current_quantity");
	});
});
