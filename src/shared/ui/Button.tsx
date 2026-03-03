import styled from "@emotion/styled";

export const Button = styled.button`
	padding: 8px 16px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 6px;
	cursor: pointer;
	font-size: 14px;
	font-weight: 500;
	transition:
		background-color 0.2s ease,
		opacity 0.2s ease;

	&:hover:not(:disabled) {
		background-color: #0056b3;
	}

	&:disabled {
		background-color: #a0c4ff;
		cursor: not-allowed;
		opacity: 0.7;
	}
`;
