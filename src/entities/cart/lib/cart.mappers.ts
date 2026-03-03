import type { CartDto, CartItemDto, CartsResponseDto } from "../model/cart.dto";
import type { Cart, CartItem, PaginatedCarts } from "../model/cart.type";

export const mapCartItemDtoToDomain = (dto: CartItemDto): CartItem => ({
	id: dto.id,
	title: dto.title,
	price: dto.price,
	quantity: dto.quantity,
	totalPrice: dto.total,
});

export const mapCartDtoToDomain = (dto: CartDto): Cart => ({
	id: dto.id,
	userId: dto.userId,
	totalAmount: dto.total,
	totalItemsCount: dto.totalProducts,
	items: dto.products.map(mapCartItemDtoToDomain),
});

export const mapCartsResponseDtoToDomain = (dto: CartsResponseDto): PaginatedCarts => ({
	carts: dto.carts.map(mapCartDtoToDomain),
	totalCartsCount: dto.total,
});
