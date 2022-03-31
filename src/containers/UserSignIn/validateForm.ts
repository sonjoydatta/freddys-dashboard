import { formatValidatorKey } from '@/utils/helpers';

export const initialValues = {
	username: '',
	password: '',
};

export const initialErrors = {
	username: '',
	password: '',
};

export const validateForm = (values: Partial<typeof initialValues>) => {
	const errors: Partial<typeof initialErrors> = {};

	if (values && Object.keys(values).length > 0) {
		for (const key of Object.keys(values) as (keyof typeof initialValues)[]) {
			if (key in initialErrors) {
				errors[key] = !values[key]?.trim() ? `${formatValidatorKey(key)} is required` : '';
			}
		}
	}

	return errors;
};
