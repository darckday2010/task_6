import { apiClient } from "@/shared/api/base";
import { mapCartsResponseDtoToDomain, mapCartDtoToDomain } from "../lib/cart.mappers";
import type { CartDto, CartsResponseDto } from "../model/cart.dto";

export const fetchCarts = async (limit: number, skip: number, userId: string) => {
	const endpoint = userId ? `/carts/user/${userId}` : "/carts";
	const { data } = await apiClient.get<CartsResponseDto>(endpoint, {
		params: { limit, skip },
	});
	return mapCartsResponseDtoToDomain(data);
};

export const fetchCartById = async (id: number) => {
	const { data } = await apiClient.get<CartDto>(`/carts/${id}`);
	return mapCartDtoToDomain(data);
};

export const updateCart = async (id: number, products: { id: number; quantity: number }[]) => {
	const { data } = await apiClient.put<CartDto>(`/carts/${id}`, {
		merge: true,
		products,
	});
	return mapCartDtoToDomain(data);
};
