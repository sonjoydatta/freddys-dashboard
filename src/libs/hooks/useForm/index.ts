import { isNullProperties } from '@/utils/helpers';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { FormElement, UserFormProps, UserFormReturn } from './types';

type Props = Record<string, unknown>;

export const useForm = <T extends Props, K extends Props>(
	props: UserFormProps<T, K>
): UserFormReturn<T, K> => {
	const { initialValues, initialErrors, validate, onSuccess } = props;
	const [values, setValues] = useState<T>(initialValues);
	const [errors, setErrors] = useState<K>(initialErrors);

	const handleChange = useCallback(
		(e: ChangeEvent<FormElement>) => {
			const { name, value } = e.target;

			const errorsData = validate(({ [name]: value } as unknown) as Partial<T>);
			setErrors((prevState) => ({ ...prevState, ...errorsData }));
			setValues((prevState) => ({ ...prevState, [name]: value }));
		},
		[validate]
	);

	const handleSubmit = useCallback(
		(e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const errorsData = validate(values);
			setErrors((prevState) => ({ ...prevState, ...errorsData }));

			if (isNullProperties(errorsData)) onSuccess(values);
		},
		[onSuccess, validate, values]
	);

	return {
		values,
		errors,
		setValues,
		setErrors,
		handleChange,
		handleSubmit,
	};
};
