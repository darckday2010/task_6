import styled from "@emotion/styled";
import { Button } from "@/shared/ui/Button";
import { useUpdateCartMutation } from "@/entities/cart/api/cart.mutations";
import type { CartItem } from "@/entities/cart/model/cart.type";

const ActionsWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
`;

const QuantityControl = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	background: #f8f9fa;
	padding: 4px;
	border-radius: 6px;
	border: 1px solid #e9ecef;
`;

const QtyButton = styled(Button)`
	padding: 4px 10px;
	background-color: #e9ecef;
	color: #333;
	&:hover:not(:disabled) {
		background-color: #dee2e6;
	}
`;

const DeleteButton = styled(Button)`
	background-color: #dc3545;
	padding: 6px 12px;
	&:hover:not(:disabled) {
		background-color: #c82333;
	}
`;

const ErrorText = styled.span`
	color: #dc3545;
	font-size: 12px;
	font-weight: bold;
`;

interface CartItemActionsProps {
	cartId: number;
	item: CartItem;
	allItems: CartItem[];
}

export const CartItemActions = ({ cartId, item, allItems }: CartItemActionsProps) => {
	const { mutate, isPending, isError } = useUpdateCartMutation();
	const handleUpdateQuantity = (newQuantity: number) => {
		if (newQuantity < 1) return;

		mutate({
			id: cartId,
			products: [{ id: item.id, quantity: newQuantity }],
		});
	};

	const handleDelete = () => {
		const remainingProducts = allItems.filter((p) => p.id !== item.id).map((p) => ({ id: p.id, quantity: p.quantity }));

		mutate({
			id: cartId,
			products: remainingProducts,
		});
	};

	return (
		<ActionsWrapper>
			<QuantityControl>
				<QtyButton
					disabled={isPending || item.quantity <= 1}
					onClick={() => handleUpdateQuantity(item.quantity - 1)}
					aria-label="Уменьшить количество"
				>
					-
				</QtyButton>

				<span style={{ minWidth: "24px", textAlign: "center", fontWeight: 500 }}>{item.quantity}</span>

				<QtyButton disabled={isPending} onClick={() => handleUpdateQuantity(item.quantity + 1)} aria-label="Увеличить количество">
					+
				</QtyButton>
			</QuantityControl>

			<DeleteButton disabled={isPending} onClick={handleDelete}>
				{isPending ? "Загрузка..." : "Удалить"}
			</DeleteButton>

			{/* Выводим красное сообщение, если запрос завершился с ошибкой */}
			{isError && <ErrorText>Ошибка!</ErrorText>}
		</ActionsWrapper>
	);
};
