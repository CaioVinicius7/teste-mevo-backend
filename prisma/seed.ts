import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.client.createMany({
		data: [
			{
				name: "Caio Vinícius"
			},
			{
				name: "Ellen Bessa"
			}
		]
	});

	await prisma.product.createMany({
		data: [
			{
				name: "Teclado",
				is_active: true,
				current_quantity: 5
			},
			{
				name: "Headset",
				is_active: true,
				current_quantity: 5
			},
			{
				name: "Monitor",
				is_active: true,
				current_quantity: 5
			},
			{
				name: "Mouse",
				is_active: true,
				current_quantity: 5
			},
			{
				name: "Mousepad",
				is_active: true,
				current_quantity: 5
			}
		]
	});
}

main();
