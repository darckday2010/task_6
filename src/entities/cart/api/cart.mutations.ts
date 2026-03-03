import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCart } from "./cart.api";
import { cartKeys } from "./cart.queries";
import type { PaginatedCarts } from "../model/cart.type";

interface UpdateCartParams {
	id: number;
	products: { id: number; quantity: number }[];
}

export const useUpdateCartMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, products }: UpdateCartParams) => updateCart(id, products),
		onSuccess: (updatedCart) => {
			queryClient.setQueryData(cartKeys.detail(updatedCart.id), updatedCart);

			queryClient.setQueriesData<PaginatedCarts>({ queryKey: cartKeys.lists() }, (oldData) => {
				if (!oldData) return oldData;
				return {
					...oldData,
					carts: oldData.carts.map((cart) => (cart.id === updatedCart.id ? updatedCart : cart)),
				};
			});
		},
	});
};
