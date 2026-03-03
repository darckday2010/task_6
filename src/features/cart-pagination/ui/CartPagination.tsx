import styled from "@emotion/styled";
import { useCartStore } from "@/shared/store/useCartStore";
import { Button } from "@/shared/ui/Button";

const PaginationWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 24px;
	padding: 16px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Controls = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;

const Select = styled.select`
	padding: 6px 12px;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

interface CartPaginationProps {
	totalItems: number;
}

export const CartPagination = ({ totalItems }: CartPaginationProps) => {
	const { limit, skip, setPage, setLimit } = useCartStore();

	const currentPage = Math.floor(skip / limit) + 1;
	const totalPages = Math.ceil(totalItems / limit) || 1;

	return (
		<PaginationWrapper>
			<div>
				<label htmlFor="limit-select" style={{ marginRight: "8px" }}>
					Показывать по:
				</label>
				<Select id="limit-select" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
				</Select>
			</div>

			<Controls>
				<Button disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
					Назад
				</Button>
				<span>
					Страница {currentPage} из {totalPages}
				</span>
				<Button disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
					Вперед
				</Button>
			</Controls>
		</PaginationWrapper>
	);
};
