export interface Product {
	id: string;
	image: string;
	name: string;
}

export interface Bestseller {
	product: Product;
	revenue: number;
	units: number;
}

export interface ChartItem {
	orders: number;
	total: number;
}

export interface SalesOverTimeWeek {
	1: ChartItem;
	2: ChartItem;
	3: ChartItem;
	4: ChartItem;
	5: ChartItem;
	6: ChartItem;
	7: ChartItem;
}

export interface SalesOverTimeYear {
	1: ChartItem;
	2: ChartItem;
	3: ChartItem;
	4: ChartItem;
	5: ChartItem;
	6: ChartItem;
	7: ChartItem;
	8: ChartItem;
	9: ChartItem;
	10: ChartItem;
	11: ChartItem;
	12: ChartItem;
}

export interface Dashboard {
	bestsellers: Bestseller[];
	sales_over_time_week: SalesOverTimeWeek;
	sales_over_time_year: SalesOverTimeYear;
}

export interface DashboardResponse {
	dashboard: Dashboard;
}
