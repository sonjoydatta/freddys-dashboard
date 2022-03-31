import { dashboardAPI } from '@/libs/api';
import { useMounted } from '@/libs/hooks';
import { debounce } from '@/utils/helpers';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Searchbar } from './Searchbar';
import { FooterWrapper, OrdersContainer } from './styles';
import { TableItems } from './TableItems';

const Orders = () => {
	const [orders, setOrders] = useState<IAPI.Order[]>([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setLoading] = useState(false);
	const totalPageRef = useRef(0);
	const isMounted = useMounted();

	const getOrders = useCallback(
		async (params: IAPI.OrderParams) => {
			setLoading(true);
			try {
				const response = await dashboardAPI.orders(params);
				if (response.success) {
					const { orders, page, total } = response.data;
					if (isMounted()) {
						setOrders(orders);
						setCurrentPage(page);
						totalPageRef.current = total;
					}
				}
				// eslint-disable-next-line no-empty
			} catch (error) {
			} finally {
				setLoading(false);
			}
		},
		[isMounted]
	);

	useEffect(() => {
		getOrders({ page: 1 });
	}, [getOrders]);

	const handleSearch = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		await getOrders({ page: 1, q: value });
	}, 500);

	const handlePrevPage = async () => {
		if (currentPage > 1 && currentPage <= totalPageRef.current) {
			await getOrders({ page: currentPage - 1 });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleNextPage = async () => {
		if (currentPage >= 1 && currentPage < totalPageRef.current) {
			await getOrders({ page: currentPage + 1 });
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	return (
		<OrdersContainer>
			<div className='orders-header'>
				<h1 className='orders-header__title'>Orders</h1>
				<Searchbar onChange={handleSearch} />
			</div>

			<TableItems data={orders} isLoading={isLoading} />

			<FooterWrapper>
				<span>
					Page {currentPage} of {totalPageRef.current}
				</span>
				{currentPage > 1 && <button onClick={handlePrevPage}>Prev</button>}
				{currentPage < totalPageRef.current && <button onClick={handleNextPage}>Next</button>}
			</FooterWrapper>
		</OrdersContainer>
	);
};

export default Orders;
