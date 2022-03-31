import { Outlet } from 'react-router-dom';
import { withAuth } from '../HOC';
import { LayoutSidebar } from './LayoutSidebar';
import { Layout, LayoutContent } from './styles';

export const DashboardLayout = withAuth(() => (
	<Layout>
		<LayoutSidebar />
		<LayoutContent>
			<Outlet />
		</LayoutContent>
	</Layout>
));
