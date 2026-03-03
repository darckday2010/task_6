import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchCarts, fetchCartById } from "./cart.api";

export const cartKeys = {
	all: ["carts"] as const,
	lists: () => [...cartKeys.all, "list"] as const,
	list: (limit: number, skip: number, userId: string) => [...cartKeys.lists(), { limit, skip, userId }] as const,
	details: () => [...cartKeys.all, "detail"] as const,
	detail: (id: number) => [...cartKeys.details(), id] as const,
};

export const useCartsQuery = (limit: number, skip: number, userId: string) => {
	return useQuery({
		queryKey: cartKeys.list(limit, skip, userId),
		queryFn: () => fetchCarts(limit, skip, userId),
		placeholderData: keepPreviousData,
	});
};

export const useCartByIdQuery = (id: number) => {
	return useQuery({
		queryKey: cartKeys.detail(id),
		queryFn: () => fetchCartById(id),
		enabled: !!id,
	});
};
