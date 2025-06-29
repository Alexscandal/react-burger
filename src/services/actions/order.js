import { initialRequest } from '@utils/api.ts';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export function orderCheckout(ids) {
	if (ids.length === 0) {
		return false;
	}
	return function (dispatch) {
		dispatch({
			type: ORDER_CHECKOUT_REQUEST,
		});
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				ingredients: ids,
			}),
		};
		initialRequest(options, 'orders').then((res) => {
			if (res && res.success) {
				dispatch({
					type: ORDER_CHECKOUT_SUCCESS,
					orderNum: res.order.number,
				});
			} else {
				dispatch({
					type: ORDER_CHECKOUT_FAILED,
				});
			}
		});
	};
}
