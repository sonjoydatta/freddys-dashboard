import { Form } from '@/components';
import { withoutAuth } from '@/components/HOC';
import { authAPI } from '@/libs/api';
import { authService } from '@/libs/auth';
import { useForm, useMounted } from '@/libs/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Container, Header, SubmitButton, Wrapper } from './styles';
import { initialErrors, initialValues, validateForm } from './validateForm';

const UserSignIn = () => {
	const [isLoading, setLoading] = useState(false);
	const isMounted = useMounted();
	const { addToast } = useToasts();
	const navigate = useNavigate();

	const handleFormSubmit = async (values: IAPI.LoginParams) => {
		setLoading(true);

		try {
			const response = await authAPI.login(values);
			if (!response.success) {
				throw new Error(response.error);
			}

			authService.setToken(response.data.access_token);
			authService.setRefreshToken(response.data.refresh_token);
			navigate('/dashboard');
			addToast('Successfully logged in', { appearance: 'success', autoDismiss: true });
		} catch (error) {
			if (error instanceof Error) {
				addToast(error.message, { appearance: 'error', autoDismiss: true });
			}
		} finally {
			if (isMounted()) {
				setLoading(false);
			}
		}
	};

	const { values, errors, handleChange, handleSubmit } = useForm({
		initialValues,
		initialErrors,
		validate: validateForm,
		onSuccess: handleFormSubmit,
	});

	return (
		<Container>
			<Wrapper>
				<Header>
					<p>Freddy&rsquo;s Artisanal Halloween Candy Shop</p>
					<img src='/assets/images/Freddys_Logo.svg' alt='logo' />
				</Header>

				<form onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label htmlFor='username' srOnly>
							Username
						</Form.Label>
						<Form.Input
							type='text'
							name='username'
							placeholder='Username'
							value={values.username}
							onChange={handleChange}
							variant={errors.username ? 'danger' : undefined}
						/>
						{errors.username && <Form.Message variant='danger'>{errors.username}</Form.Message>}
					</Form.Group>
					<Form.Group>
						<Form.Label htmlFor='password' srOnly>
							Password
						</Form.Label>
						<Form.Input
							type='password'
							name='password'
							placeholder='Password'
							value={values.password}
							onChange={handleChange}
							variant={errors.password ? 'danger' : undefined}
						/>
						{errors.password && <Form.Message variant='danger'>{errors.password}</Form.Message>}
					</Form.Group>
					<SubmitButton type='submit' disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Log in'}
					</SubmitButton>
				</form>
			</Wrapper>
		</Container>
	);
};

export default withoutAuth(UserSignIn);
