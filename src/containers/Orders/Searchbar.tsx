import { Form } from '@/components';
import { FormInputProps } from '@/components/Form/types';
import { FC } from 'react';

export const Searchbar: FC<FormInputProps> = (props) => (
	<div className='orders-header__searchbar'>
		<Form.Input type='text' placeholder='Search' {...props} />
	</div>
);
