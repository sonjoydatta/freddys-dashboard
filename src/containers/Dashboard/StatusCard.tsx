import { formatPrice } from '@/utils/helpers';
import { FC } from 'react';
import { CardWrapper } from './styles';

type Props = {
	title: string;
	price: number;
	orders: number;
};

export const StatusCard: FC<Props> = ({ title, price, orders }) => (
	<CardWrapper>
		<p>{title}</p>
		<h5>
			{formatPrice(price)} / {orders} orders
		</h5>
	</CardWrapper>
);
