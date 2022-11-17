export interface ICreateOrderDTO {
	clientId: string;
	status: string;
	productsIds: {
		product_id: string;
	}[];
}
