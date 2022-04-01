import { useAuth } from '@/libs/auth';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { withAuth } from '../HOC';
import { LayoutSidebar } from './LayoutSidebar';
import { Layout, LayoutContent } from './styles';

export const DashboardLayout = withAuth(() => {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return (
		<Layout>
			<LayoutSidebar />
			<LayoutContent>
				<Outlet />
			</LayoutContent>
		</Layout>
	);
});
