import styled, { css } from 'styled-components';

function createPercentage() {
	let styles = '';

	for (let i = 0; i < 100; i += 1) {
		styles += `
      .percentage-${i} {
        &:after {
          height: ${i}%;
        }
      }
     `;
	}

	return css`
		${styles}
	`;
}

export const ChartWrapper = styled.div`
	width: fit-content;
	display: block;
	margin: 0 0 1rem 0;
	border: 1px solid ${({ theme }) => theme.colors['gray-200']};

	dl {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 25rem;
		position: relative;
		padding: 1.25rem 0;
		margin: 0;
	}

	.text {
		font-weight: 600;
		display: flex;
		align-items: flex-start;
		height: 4rem;
		width: 2.5rem;
		position: absolute;
		bottom: -0.875rem;
		justify-content: flex-end;
		transform: rotate(-30deg);
	}

	.percentage {
		font-size: 0.8rem;
		line-height: 1;
		text-transform: uppercase;
		width: 2.5rem;
		height: calc(100% - 3rem);
		margin: 0 1.25rem;
		display: flex;
		align-items: flex-end;
		cursor: pointer;

		&:after {
			content: '';
			display: block;
			width: 2.5rem;
			height: 100%;
			position: relative;
			border: 2px solid ${({ theme }) => theme.colors['gray-200']};
			transition: all 0.3s ease-in-out;
		}

		&:hover {
			&:after {
				border-color: ${({ theme }) => theme.colors.primary};
				background-color: ${({ theme }) => theme.colors.primary};
			}
		}
	}

	${createPercentage()};
`;
