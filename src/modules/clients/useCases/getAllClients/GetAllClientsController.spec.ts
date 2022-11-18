import request from "supertest";

import { app } from "../../../../shared/infra/http/app";

describe("Get All CLients - Controller", () => {
	it("Should be able to list all clients", async () => {
		const response = await request(app).get("/api/client");

		expect(response.statusCode).toBe(200);
		expect(response.body[0]).toHaveProperty("id");
		expect(response.body[0]).toHaveProperty("name");
		expect(response.body[0]).toHaveProperty("order");
	});
});
