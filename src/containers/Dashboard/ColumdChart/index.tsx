import { formatPrice } from '@/utils/helpers';
import { ChangeEvent, FC, Fragment } from 'react';
import { parseData } from './helpers';
import { ChartWrapper } from './styles';

type Props = {
	title: string;
	data: IAPI.SalesOverTimeWeek;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ColumnChart: FC<Props> = ({ title, data, ...rest }) => (
	<Fragment>
		<div className='dashboard-header'>
			<h1 className='dashboard-header__title'>{title}</h1>
			<input className='toggle-btn' type='checkbox' {...rest} />
		</div>

		<ChartWrapper>
			<dl>
				{parseData(data).map(({ name, percent, orders, total }, i) => (
					<dd
						key={i}
						className={`percentage percentage-${percent}`}
						title={`Orders: ${orders}, Revenue: ${formatPrice(total)}`}
					>
						<span className='text'>{name}</span>
					</dd>
				))}
			</dl>
		</ChartWrapper>
	</Fragment>
);
