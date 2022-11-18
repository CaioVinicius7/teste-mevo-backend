import request from "supertest";

import { app } from "../../../../shared/infra/http/app";

describe("Get Product By Id - Controller", () => {
	it("Should be able to list a product filtered by id", async () => {
		const { body } = await request(app).get("/api/product");

		const productId = body[0].id;

		const response = await request(app).get(`/api/product/${productId}`);

		expect(response.statusCode).toBe(200);
		expect(typeof response.body).toBe("object");
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("current_quantity");
	});
});
