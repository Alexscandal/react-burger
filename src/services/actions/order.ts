import { initialRequest } from '@utils/api.ts';
import { AppDispatch, TExtUser } from '@utils/types.ts';

export const ORDER_CHECKOUT_REQUEST = 'ORDER_CHECKOUT_REQUEST';
export const ORDER_CHECKOUT_SUCCESS = 'ORDER_CHECKOUT_SUCCESS';
export const ORDER_CHECKOUT_FAILED = 'ORDER_CHECKOUT_FAILED';

export function orderCheckout(ids: (string | undefined)[]) {
	if (ids.length === 0) {
		return () => void (async (): Promise<void> => {});
	}
	return function (dispatch: AppDispatch) {
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
		initialRequest(options, 'orders').then((res: TExtUser) => {
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
