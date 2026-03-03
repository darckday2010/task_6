export interface CartItem {
	id: number;
	title: string;
	price: number;
	quantity: number;
	totalPrice: number;
}

export interface Cart {
	id: number;
	userId: number;
	totalAmount: number;
	totalItemsCount: number;
	items: CartItem[];
}

export interface PaginatedCarts {
	carts: Cart[];
	totalCartsCount: number;
}
