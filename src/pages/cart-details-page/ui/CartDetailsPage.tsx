import styled from "@emotion/styled";
import { useParams, Link } from "react-router-dom";
import { CartDetailedWidget } from "@/widgets/cart-detailed-view/ui/CartDetailedWidget";
import { Button } from "@/shared/ui/Button";

const PageContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 20px 0;
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 24px;
`;

export const CartDetailsPage = () => {
	const { id } = useParams<{ id: string }>();
	const cartId = Number(id);

	if (!cartId || isNaN(cartId)) {
		return <PageContainer>Неверный ID корзины</PageContainer>;
	}

	return (
		<PageContainer>
			<Header>
				<Link to="/">
					<Button style={{ backgroundColor: "#6c757d" }}>← Назад к списку</Button>
				</Link>
				<h1 style={{ color: "#2c3e50", margin: 0 }}>Детали корзины</h1>
			</Header>

			<CartDetailedWidget cartId={cartId} />
		</PageContainer>
	);
};
