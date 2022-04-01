import { config } from '@/config';
import { formatURLParams } from '@/utils/helpers';
import { authService } from '../auth';
import { DashboardResponse, OrderParams, OrdersResponse } from './@types';
import { HttpService } from './http.service';

class DashboardAPI {
	constructor(private http: HttpService) {}

	dashboard() {
		return this.http.get<DashboardResponse>('dashboard');
	}

	orders(params: OrderParams) {
		return this.http.get<OrdersResponse>(`orders?${formatURLParams(params)}`);
	}
}

const httpInstance = new HttpService(config.apiURL, {
	getToken: authService.getToken,
	getRefreshToken: authService.getRefreshToken,
	onRefreshToken: (token: string) => {
		authService.setToken(token);
	},
	onUnauthorised: () => {
		authService.removeToken();
	},
});
export const dashboardAPI = new DashboardAPI(httpInstance);
