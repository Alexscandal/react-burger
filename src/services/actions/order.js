import { orderCheckoutRequest } from '@utils/api.js';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export function orderCheckout() {
	return function (dispatch) {
		dispatch({
			type: ORDER_CHECKOUT_REQUEST,
		});
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				ingredients: ['609646e4dc916e00276b286e', '609646e4dc916e00276b2870'],
			}),
		};
		orderCheckoutRequest(options).then((res) => {
			if (res && res.success) {
				dispatch({
					type: ORDER_CHECKOUT_SUCCESS,
					order: res.data,
				});
			} else {
				dispatch({
					type: ORDER_CHECKOUT_FAILED,
				});
			}
		});
	};
}
