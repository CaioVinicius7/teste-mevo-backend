import request from "supertest";

import { app } from "../../../../shared/infra/http/app";

describe("Create New Order - Controller", () => {
	it("Should be able to create a new order", async () => {
		const getClientsResponse = await request(app).get("/api/client");

		const { id: clientId } = getClientsResponse.body[0];

		const getProductsResponse = await request(app).get("/api/product");

		const { id: productId } = getProductsResponse.body[0];

		const response = await request(app)
			.post(`/api/order`)
			.send({
				clientId,
				products: [
					{
						productId,
						quantity: 1
					}
				]
			});

		expect(response.statusCode).toBe(201);
		expect(typeof response.body).toBe("object");
		expect(response.body).toHaveProperty("id");
		expect(response.body).toHaveProperty("status");
		expect(response.body).toHaveProperty("client_id");
		expect(response.body.status).toBe("waiting for approval");
	});
});
