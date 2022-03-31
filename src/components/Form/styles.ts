import { hexToRGB } from '@/utils/helpers';
import styled, { css } from 'styled-components';
import { FormGroupProps, FormInputProps, FormLabelProps, FormMessageProps } from './types';

export const FormGroup = styled.div<FormGroupProps>`
	display: block;
	width: 100%;
	margin-bottom: 1rem;
`;

export const FormLabel = styled.label<FormLabelProps>`
	margin-bottom: 0.5rem;
	display: inline-block;

	${({ srOnly }) => {
		if (srOnly) {
			return css`
				position: absolute;
				width: 1px;
				height: 1px;
				padding: 0;
				margin: -1px;
				overflow: hidden;
				clip: rect(0, 0, 0, 0);
				border: 0;
			`;
		}
		return null;
	}}
`;

export const FormInput = styled.input<FormInputProps>`
	display: block;
	width: 100%;
	height: auto;
	padding: 0.69rem 1rem;
	background-color: transparent;
	border: 2px solid ${({ theme, variant }) => theme.colors[variant || 'gray-200']};
	appearance: none;
	border-radius: 0.25rem;
	box-shadow: none;
	transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:focus {
		box-shadow: 0 0 0 2px
			${({ theme, variant = 'primary' }) => hexToRGB(theme.colors[variant], 0.25)};
		border-color: ${({ theme, variant = 'primary' }) => theme.colors[variant]};
	}
`;

export const FormMessage = styled.p<FormMessageProps>`
	margin: 0.25rem 0 0 0;
	color: ${({ theme, variant = 'danger' }) => theme.colors[variant]};
`;
