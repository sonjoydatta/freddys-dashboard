import { formatDate } from '@/utils/helpers';
import { FC } from 'react';
import { Table } from './styles';

type Props = {
	data: IAPI.Order[];
	isLoading?: boolean;
};

export const TableItems: FC<Props> = ({ data, isLoading }) => (
	<Table>
		<thead>
			<tr>
				<th
					style={{
						width: '45%',
					}}
				>
					Product Name
				</th>
				<th>Date</th>
				<th>Price</th>
				<th>Status</th>
			</tr>
		</thead>
		<tbody>
			{data.length > 0 ? (
				data.map(({ id, product: { name }, created_at, currency, total, status }) => (
					<tr key={id}>
						<td>{name}</td>
						<td>{formatDate(created_at)}</td>
						<td>{`${currency}${total}`}</td>
						<td className={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan={4}>{isLoading ? 'Loading...' : 'No orders found'}</td>
				</tr>
			)}
		</tbody>
	</Table>
);
