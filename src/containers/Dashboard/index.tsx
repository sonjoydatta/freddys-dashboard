import { dashboardAPI } from '@/libs/api';
import { useMounted } from '@/libs/hooks';
import { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { BestSellers } from './BestSellers';
import { ColumnChart } from './ColumdChart';
import { StatusCard } from './StatusCard';
import { CardList, DashboardContainer } from './styles';

const Dashboard = () => {
	const [data, setData] = useState<IAPI.Dashboard>();
	const [isLoading, setLoading] = useState(true);
	const [chartType, setChartType] = useState<'weekly' | 'yearly'>('weekly');
	const isMounted = useMounted();

	useEffect(() => {
		const getDashboardData = async () => {
			try {
				const response = await dashboardAPI.dashboard();
				if (!response.success) {
					throw new Error(response.error);
				}

				if (isMounted()) {
					setData(response.data.dashboard);
				}
				// eslint-disable-next-line no-empty
			} catch (error) {
			} finally {
				if (isMounted()) {
					setLoading(false);
				}
			}
		};

		getDashboardData();
	}, [isMounted]);

	const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
		setChartType(e.target.checked ? 'yearly' : 'weekly');
	};

	return (
		<DashboardContainer>
			<div className='dashboard-header'>
				<h1 className='dashboard-header__title'>Dashboard</h1>
			</div>

			{isLoading ? (
				<p>Loading...</p>
			) : (
				<Fragment>
					<CardList>
						<StatusCard title='Today' price={1400} orders={6} />
						<StatusCard title='Last Week' price={5000} orders={50} />
						<StatusCard title='Last Month' price={9000} orders={75} />
					</CardList>

					{data && (
						<ColumnChart
							title={chartType === 'yearly' ? 'Revenue (last 12 months)' : 'Revenue (last 7 days)'}
							data={chartType === 'yearly' ? data.sales_over_time_year : data.sales_over_time_week}
							onChange={handleToggle}
						/>
					)}

					{data?.bestsellers && <BestSellers data={data.bestsellers} />}
				</Fragment>
			)}
		</DashboardContainer>
	);
};

export default Dashboard;
