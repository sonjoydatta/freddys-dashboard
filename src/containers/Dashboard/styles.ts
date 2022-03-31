import styled from 'styled-components';

export const DashboardContainer = styled.div`
	display: block;
	width: 100%;
	height: 100%;

	.dashboard-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;

		&__title {
			font-size: 1.5rem;
			font-weight: 400;
			margin-bottom: 1rem;
		}

		.toggle-btn {
			width: 4rem;
			height: 2rem;
			border-radius: 2rem;
			margin-top: 0.25rem;
			vertical-align: top;
			background-repeat: no-repeat;
			background-position: center;
			background-size: contain;
			border: 1px solid rgba(0, 0, 0, 0.25);
			appearance: none;
			background-position: left center;
			transition: background-position 0.15s ease-in-out;
			background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e");
			cursor: pointer;

			&:checked {
				background-position: right center;
				background-color: ${({ theme }) => theme.colors.primary};
				border-color: ${({ theme }) => theme.colors.primary};
				background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
			}
		}
	}
`;

export const CardList = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1rem;
`;

export const CardWrapper = styled.div`
	padding: 0.5rem;
	margin-bottom: 1rem;
	border: 1px solid ${({ theme }) => theme.colors['gray-200']};

	p {
		margin-bottom: 0.5rem;
	}

	h5 {
		font-weight: 400;
	}
`;
