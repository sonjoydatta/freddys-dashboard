import { Button } from '@/components';
import styled from 'styled-components';

export const Container = styled.div`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Wrapper = styled.div`
	width: 20rem;
	padding: 1.5rem 1rem;
	border-radius: 0.25rem;
	border: 0.313rem solid #979797;
`;

export const Header = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: center;
	justify-content: space-between;

	p {
		font-size: 1.5rem;
	}

	img {
		width: 6.25rem;
		height: auto;
	}
`;

export const SubmitButton = styled(Button)`
	display: block;
	margin: 0 auto;
	font-weight: 600;
	text-transform: uppercase;
`;
