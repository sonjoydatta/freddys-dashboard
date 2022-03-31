import styled from 'styled-components';

export const Layout = styled.div`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 1rem;
`;

export const LayoutSider = styled.div`
	grid-column: 1 / 3;
	grid-row: 1;
	padding: 1rem;
	min-height: 100vh;
	border-right: 1px solid ${({ theme }) => theme.colors['gray-200']};

	.brand {
		width: 5.25rem;
		height: auto;
	}

	.menu {
		margin: 1rem 0 0 0;
		padding: 0;
		list-style: none;

		li {
			margin: 0;
			padding: 0 0 0.5rem 0;
			list-style: none;

			a {
				color: ${({ theme }) => theme.colors.text};
				text-decoration: none;
			}

			button {
				color: ${({ theme }) => theme.colors.text};
				padding: 0;
				border: 0;
				width: auto;

				&:hover,
				&:focus {
					background-color: transparent;
				}
			}
		}
	}
`;

export const LayoutContent = styled.div`
	grid-column: 3 / 13;
	grid-row: 1;
	padding: 1rem;
`;
