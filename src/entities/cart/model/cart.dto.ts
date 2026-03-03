export interface CartItemDto {
	id: number;
	title: string;
	price: number;
	quantity: number;
	total: number;
	discountPercentage: number;
	discountedTotal: number;
	thumbnail: string;
}

export interface CartDto {
	id: number;
	products: CartItemDto[];
	total: number;
	discountedTotal: number;
	userId: number;
	totalProducts: number;
	totalQuantity: number;
}

export interface CartsResponseDto {
	carts: CartDto[];
	total: number;
	skip: number;
	limit: number;
}
