import styled from 'styled-components';

export const Button = styled.button`
	width: 100%;
	height: auto;
	display: block;
	text-align: center;
	outline: none;
	user-select: none;
	border: 2px solid ${({ theme }) => theme.colors['gray-200']};
	cursor: pointer;
	font-weight: 400;
	padding: 0.438rem 1.25rem;
	background-color: transparent;
	border-radius: 0.25rem;
	transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);

	&:hover,
	&:focus {
		background-color: ${({ theme }) => theme.colors['gray-200']};
	}

	&:disabled {
		cursor: default;
		opacity: 0.5;
	}
`;
