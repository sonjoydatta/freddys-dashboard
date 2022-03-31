import { authService } from '@/libs/auth';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../button';
import { LayoutSider } from './styles';

export const LayoutSidebar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		authService.removeToken();
		navigate('/');
	};

	return (
		<LayoutSider>
			<img src='/assets/images/Freddys_Logo.svg' alt='logo' className='brand' />

			<ul className='menu'>
				<li>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
				<li>
					<Link to='/dashboard/orders'>Orders</Link>
				</li>
				<li>
					<Button type='button' onClick={handleLogout}>
						Logout
					</Button>
				</li>
			</ul>
		</LayoutSider>
	);
};
