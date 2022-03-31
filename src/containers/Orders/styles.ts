import styled from 'styled-components';

export const OrdersContainer = styled.div`
	display: block;
	width: 100%;
	height: 100%;

	.orders-header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		&__title {
			font-size: 1.5rem;
			font-weight: 400;
			margin-bottom: 1rem;
		}

		&__searchbar {
			margin-bottom: 1rem;

			& > input {
				padding-block: 0.5rem;
			}
		}
	}
`;

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	border: 1px solid ${({ theme }) => theme.colors['gray-200']};
	margin-bottom: 1rem;

	th,
	td {
		padding: 10px;
		text-align: left;

		&.processing {
			color: ${({ theme }) => theme.colors.danger};
		}

		&.shipped {
			color: ${({ theme }) => theme.colors.dark};
		}

		&.delivered {
			color: ${({ theme }) => theme.colors.success};
		}
	}
`;

export const FooterWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;
