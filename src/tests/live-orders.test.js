import { describe, it, expect } from 'vitest';
import { initialState } from '@/services/live-orders/slice.ts';
import {
	connect,
	/*
	disconnect,
	onError,
	onMessage,
	*/
} from '@/services/live-orders/actions.ts';

describe('check orders in profile', () => {
	it('should be connection', () => {
		expect(
			connect(undefined, {
				type: connect,
			})
		).toEqual({
			...initialState,
			type: 'liveOrders/connect',
			payload: undefined,
		});
	});
	it('should be disconnect', () => {});
	it('should be error', () => {});
	it('should be message', () => {});
});
