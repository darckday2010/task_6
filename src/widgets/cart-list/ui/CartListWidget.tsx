import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useCartsQuery } from "@/entities/cart/api/cart.queries";
import { useCartStore } from "@/shared/store/useCartStore";
import { Loader } from "@/shared/ui/Loader";
import { Button } from "@/shared/ui/Button";
import { CartPagination } from "@/features/cart-pagination/ui/CartPagination";

const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	background: white;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
	background: #f8f9fa;
	padding: 16px;
	text-align: left;
	border-bottom: 2px solid #e9ecef;
`;

const Td = styled.td`
	padding: 16px;
	border-bottom: 1px solid #e9ecef;
`;

const Tr = styled.tr`
	&:hover {
		background-color: #f8f9fa;
	}
`;

const ErrorMessage = styled.div`
	color: #dc3545;
	padding: 20px;
	text-align: center;
	background: #f8d7da;
	border-radius: 8px;
`;

export const CartListWidget = () => {
	const { limit, skip, userId } = useCartStore(); // Достаем userId
	const { data, isLoading, isError, isFetching } = useCartsQuery(limit, skip, userId);
	if (isLoading) return <Loader />;
	if (isError) return <ErrorMessage>Произошла ошибка при загрузке корзин.</ErrorMessage>;
	if (!data) return null;

	return (
		<div>
			<div style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}>
				<Table>
					<thead>
						<tr>
							<Th>ID Корзины</Th>
							<Th>User ID</Th>
							<Th>Кол-во товаров</Th>
							<Th>Общая сумма</Th>
							<Th>Действия</Th>
						</tr>
					</thead>
					<tbody>
						{data.carts.map((cart) => (
							<Tr key={cart.id}>
								<Td>#{cart.id}</Td>
								<Td>{cart.userId}</Td>
								<Td>{cart.totalItemsCount} шт.</Td>
								<Td>${cart.totalAmount}</Td>
								<Td>
									<Link to={`/carts/${cart.id}`}>
										<Button>Подробнее</Button>
									</Link>
								</Td>
							</Tr>
						))}
					</tbody>
				</Table>
			</div>

			<CartPagination totalItems={data.totalCartsCount} />
		</div>
	);
};
