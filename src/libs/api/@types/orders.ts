export interface OrderParams {
	page?: number;
	q?: string;
}

export interface Address {
	city: string;
	street: string;
	zipcode: string;
}

export interface Customer {
	address: Address;
	id: string;
	name: string;
	surname: string;
}

export interface OrderItem {
	id: string;
	image: string;
	name: string;
	quantity: number;
}

export interface Order {
	created_at: Date;
	currency: string;
	customer: Customer;
	id: string;
	product: OrderItem;
	status: string;
	total: number;
}

export interface OrdersResponse {
	orders: Order[];
	page: number;
	total: number;
}
