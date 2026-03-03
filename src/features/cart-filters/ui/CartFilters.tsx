import styled from "@emotion/styled";
import { useCartStore } from "@/shared/store/useCartStore";
import { useState, useEffect } from "react";

const FilterContainer = styled.div`
	background: white;
	padding: 16px;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	margin-bottom: 24px;
	display: flex;
	align-items: center;
	gap: 16px;
`;

const Input = styled.input`
	padding: 8px 12px;
	border: 1px solid #ccc;
	border-radius: 6px;
	font-size: 14px;
	min-width: 250px;
	&:focus {
		outline: none;
		border-color: #007bff;
	}
`;

export const CartFilters = () => {
	const { userId, setUserId } = useCartStore();
	const [localValue, setLocalValue] = useState(userId);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (localValue !== userId) {
				setUserId(localValue);
			}
		}, 500);
		return () => clearTimeout(timer);
	}, [localValue, userId, setUserId]);

	return (
		<FilterContainer>
			<label htmlFor="user-id-search">
				<strong>Поиск:</strong>
			</label>
			<Input
				id="user-id-search"
				type="number"
				placeholder="Введите ID пользователя (например, 15)"
				value={localValue}
				onChange={(e) => setLocalValue(e.target.value)}
			/>
			{userId && <span style={{ color: "#6c757d", fontSize: "14px" }}>Фильтр активен</span>}
		</FilterContainer>
	);
};
