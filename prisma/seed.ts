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
				isActive: true,
				currentQuantity: 5
			},
			{
				name: "Headset",
				isActive: true,
				currentQuantity: 5
			},
			{
				name: "Monitor",
				isActive: true,
				currentQuantity: 5
			},
			{
				name: "Mouse",
				isActive: true,
				currentQuantity: 5
			},
			{
				name: "Mousepad",
				isActive: true,
				currentQuantity: 5
			}
		]
	});
}

main();
