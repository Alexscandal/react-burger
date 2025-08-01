import { TIngradient, TRequestOptions, TExtUser } from '@utils/types.ts';
import { LiveOrders } from '@utils/live-orders.ts';
const API_URL = 'https://norma.nomoreparties.space/api/';
export const ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

const checkResponse = <T>(res: Response): Promise<T> => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

type TToken = {
	accessToken: string;
	refreshToken: string;
	success: boolean;
};

type TData = {
	success: boolean;
	data: TIngradient[];
};

export const getIngredients = (): Promise<TIngradient[]> => {
	return fetch(API_URL + 'ingredients')
		.then(checkResponse<TData>)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		})
		.catch((err: Error) => Promise.reject(err));
};

export const getOrder = (number: number) => {
	return fetch(API_URL + 'orders/' + number)
		.then(checkResponse<LiveOrders>)
		.then((data) => {
			if (data?.success) return data.orders;
			return Promise.reject(data);
		})
		.catch((err: Error) => Promise.reject(err));
};

export const refreshToken = (): Promise<TToken> => {
	return (
		fetch(`${API_URL}auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkResponse<TToken>)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const initialRequest = (
	requestOptions: TRequestOptions,
	target: string
): Promise<TExtUser> => {
	return fetchWithRefresh(API_URL + target, requestOptions)
		.then((data: TExtUser | void) => {
			if (data?.success) return data;
			return Promise.reject(data);
		})
		.catch((err: Error) => Promise.reject(err));
};

export const fetchWithRefresh = async (
	url: string,
	options: TRequestOptions
): Promise<TExtUser | void> => {
	try {
		const res = await fetch(url, options);
		return await checkResponse<TExtUser>(res);
	} catch (err) {
		if (err instanceof Error) {
			switch (err.message) {
				case 'jwt expired':
					// eslint-disable-next-line no-case-declarations
					const refreshData = await refreshToken(); //обновляем токен
					options.headers.authorization = refreshData.accessToken;
					// eslint-disable-next-line no-case-declarations
					const res = await fetch(url, options); //повторяем запрос
					return await checkResponse<TExtUser>(res);
				case 'email or password are incorrect':
					alert('Неверный E-mail или пароль.');
					break;
				// eslint-disable-next-line no-fallthrough
				case 'Incorrect reset token':
					alert('Неверный код из письма.');
					break;
				// eslint-disable-next-line no-fallthrough
				default:
					return Promise.reject(err);
			}
		}
	}
};
