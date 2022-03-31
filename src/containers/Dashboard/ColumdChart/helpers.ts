type NewArr = {
	name: string;
	percent: number;
} & IAPI.ChartItem;

const getPercent = (arr: number[]) => {
	const highest = arr.reduce((acc, curr) => (curr > acc ? curr : acc));

	return arr.map((e) => {
		const value = (e / highest) * 100;

		return {
			value: e,
			percent: e === highest ? 100 : parseInt(value.toFixed(2)),
		};
	});
};

export const parseData = (data: IAPI.SalesOverTimeWeek) => {
	const newArr: NewArr[] = [];

	if (data && Object.keys(data).length > 0) {
		const totals = (Object.values(data) as IAPI.ChartItem[]).reduce((acc, curr) => {
			acc.push(curr.total);
			return acc;
		}, [] as number[]);

		const percentages = getPercent(totals);

		for (const key of (Object.keys(data) as unknown) as (keyof IAPI.SalesOverTimeWeek)[]) {
			newArr.push({
				name:
					Object.keys(data).length === 7
						? key == 1
							? 'Today'
							: key == 2
							? 'Yesterday'
							: `day ${key}`
						: key == 1
						? 'This Month'
						: key == 2
						? 'Last Month'
						: `month ${key}`,
				orders: data[key].orders,
				total: data[key].total,
				percent: percentages.find((e) => e.value === data[key].total)?.percent || 0,
			});
		}
	}

	return newArr;
};
