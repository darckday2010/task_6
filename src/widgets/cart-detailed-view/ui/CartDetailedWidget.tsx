import styled from "@emotion/styled";
import { useCartByIdQuery } from "@/entities/cart/api/cart.queries";
import { Loader } from "@/shared/ui/Loader";
import { CartItemActions } from "@/features/cart-item-edit/ui/CartItemActions";

const Card = styled.div`
	background: white;
	border-radius: 8px;
	padding: 24px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	margin-top: 20px;
`;

const Summary = styled.div`
	display: flex;
	gap: 24px;
	margin-bottom: 24px;
	padding-bottom: 16px;
	border-bottom: 2px solid #f8f9fa;
	font-size: 18px;
`;

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
`;

const Th = styled.th`
	text-align: left;
	padding: 12px;
	border-bottom: 2px solid #e9ecef;
	color: #6c757d;
`;

const Td = styled.td`
	padding: 16px 12px;
	border-bottom: 1px solid #e9ecef;
	vertical-align: middle;
`;

export const CartDetailedWidget = ({ cartId }: { cartId: number }) => {
	const { data: cart, isLoading, isError } = useCartByIdQuery(cartId);

	if (isLoading) return <Loader />;
	if (isError || !cart) return <div>Ошибка при загрузке корзины</div>;

	return (
		<Card>
			<Summary>
				<div>
					<strong>Корзина ID:</strong> #{cart.id}
				</div>
				<div>
					<strong>Пользователь ID:</strong> {cart.userId}
				</div>
				<div>
					<strong>Всего товаров:</strong> {cart.totalItemsCount}
				</div>
				<div>
					<strong>Общая сумма:</strong> ${cart.totalAmount}
				</div>
			</Summary>

			<Table>
				<thead>
					<tr>
						<Th>Название товара</Th>
						<Th>Цена</Th>
						<Th>Итог</Th>
						<Th>Действия</Th>
					</tr>
				</thead>
				<tbody>
					{cart.items.map((item) => (
						<tr key={item.id}>
							<Td>
								<strong>{item.title}</strong>
							</Td>
							<Td>${item.price}</Td>
							<Td>${item.totalPrice}</Td>
							<Td>
								<CartItemActions cartId={cart.id} item={item} allItems={cart.items} />
							</Td>
						</tr>
					))}
					{cart.items.length === 0 && (
						<tr>
							<Td colSpan={4} style={{ textAlign: "center", color: "#6c757d" }}>
								Корзина пуста
							</Td>
						</tr>
					)}
				</tbody>
			</Table>
		</Card>
	);
};
