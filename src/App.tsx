import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from 'styled-components';
import { DashboardLayout } from './components';
import GlobalStyle, { defaultTheme } from './styles';

const UserSignIn = lazy(() => import('@/containers/UserSignIn'));
const Dashboard = lazy(() => import('@/containers/Dashboard'));
const Orders = lazy(() => import('@/containers/Orders'));

const App = () => (
	<ThemeProvider theme={defaultTheme}>
		<GlobalStyle />
		<Suspense fallback={<div>Loading...</div>}>
			<ToastProvider>
				<BrowserRouter>
					<Routes>
						<Route path='' element={<UserSignIn />} />
						<Route path='dashboard' element={<DashboardLayout />}>
							<Route path='' element={<Dashboard />} />
							<Route path='orders' element={<Orders />} />
						</Route>
						<Route path='*' element={<UserSignIn />} />
					</Routes>
				</BrowserRouter>
			</ToastProvider>
		</Suspense>
	</ThemeProvider>
);

export default App;
