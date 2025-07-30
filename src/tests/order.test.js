import { describe, it, expect } from 'vitest';
import {
	ORDER_CHECKOUT_REQUEST,
	ORDER_CHECKOUT_SUCCESS,
	ORDER_CHECKOUT_FAILED,
} from '@/services/actions/order.ts';
import { orderInitialState, orderReducer } from '@/services/reducers/order.ts';

describe('check order create', () => {
	it('should be request', () => {
		expect(orderReducer(undefined, { type: ORDER_CHECKOUT_REQUEST })).toEqual({
			...orderInitialState,
			orderNum: null,
			orderCheckoutFailed: false,
			orderCheckoutRequest: true,
		});
	});

	it('should be success', () => {
		expect(
			orderReducer(undefined, { type: ORDER_CHECKOUT_SUCCESS, orderNum: 111 })
		).toEqual({
			...orderInitialState,
			orderNum: 111, // undefined
			orderCheckoutFailed: false,
			orderCheckoutRequest: false,
		});
	});

	it('should be failed', () => {
		expect(orderReducer(undefined, { type: ORDER_CHECKOUT_FAILED })).toEqual({
			...orderInitialState,
			orderNum: null,
			orderCheckoutFailed: true,
			orderCheckoutRequest: false,
		});
	});
});
