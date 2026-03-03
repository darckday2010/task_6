import styled from "@emotion/styled";
import { CartListWidget } from "@/widgets/cart-list/ui/CartListWidget";
import { CartFilters } from "@/features/cart-filters/ui/CartFilters";

const PageContainer = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 20px 0;
`;

const Title = styled.h1`
	margin-bottom: 24px;
	color: #2c3e50;
`;

export const CartsPage = () => {
	return (
		<PageContainer>
			<Title>Управление корзинами</Title>
			<CartFilters />
			<CartListWidget />
		</PageContainer>
	);
};
