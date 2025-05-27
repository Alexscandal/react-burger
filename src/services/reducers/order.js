/* reducer*/
import {
	ORDER_CHECKOUT_FAILED,
	ORDER_CHECKOUT_REQUEST,
	ORDER_CHECKOUT_SUCCESS,
} from '@/services/actions/order.js';

const orderInitialState = {
	orderNum: null,
	orderCheckoutFailed: false,
	orderCheckoutRequest: false,
};
export const orderReducer = (state = orderInitialState, action) => {
	switch (action.type) {
		case ORDER_CHECKOUT_REQUEST: {
			return {
				...state,
				orderCheckoutFailed: false,
				orderCheckoutRequest: true,
			};
		}
		case ORDER_CHECKOUT_FAILED: {
			return {
				...state,
				orderCheckoutFailed: true,
				orderCheckoutRequest: false,
			};
		}
		case ORDER_CHECKOUT_SUCCESS: {
			return {
				...state,
				order: action.order,
				orderCheckoutRequest: false,
			};
		}
		default: {
			return state;
		}
	}
};
