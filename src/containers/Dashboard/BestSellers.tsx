import { formatPrice } from '@/utils/helpers';
import { FC, Fragment } from 'react';
import { Table } from '../Orders/styles';

type Props = {
	data: IAPI.Bestseller[];
};

export const BestSellers: FC<Props> = ({ data }) => (
	<Fragment>
		<div className='dashboard-header'>
			<h1 className='dashboard-header__title'>Best sellers</h1>
		</div>

		<Table>
			<thead>
				<tr>
					<th
						style={{
							width: '45%',
						}}
					>
						Product
					</th>
					<th>Price</th>
					<th>#Unit Sold</th>
					<th>Revenue</th>
				</tr>
			</thead>
			<tbody>
				{data.length > 0 ? (
					data.map(({ product: { id, name }, revenue, units }) => (
						<tr key={id}>
							<td>{name}</td>
							<td>{formatPrice(revenue / units)}</td>
							<td>{units}</td>
							<td>{revenue}</td>
						</tr>
					))
				) : (
					<tr>
						<td colSpan={4}>No orders found</td>
					</tr>
				)}
			</tbody>
		</Table>
	</Fragment>
);
