import { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'success' | 'danger';

export type FormGroupProps = {
	children: ReactNode;
};

export type FormLabelProps = {
	srOnly?: boolean;
} & LabelHTMLAttributes<HTMLLabelElement>;

export type FormInputProps = {
	variant?: Variant;
} & InputHTMLAttributes<HTMLInputElement>;

export type FormMessageProps = {
	message?: ReactNode;
	variant?: Variant;
};
