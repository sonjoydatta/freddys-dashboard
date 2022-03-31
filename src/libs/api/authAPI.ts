import { config } from '@/config';
import { LoginParams, LoginResponse } from './@types';
import { HttpService } from './http.service';

class AuthAPI {
	constructor(private http: HttpService) {}

	login(payload: LoginParams) {
		return this.http.post<LoginResponse>('login', payload);
	}
}

const httpInstance = new HttpService(config.apiURL);
export const authAPI = new AuthAPI(httpInstance);
