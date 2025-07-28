import { describe, it, expect } from 'vitest';
import { initialState } from '@/services/reducers/ingredients-constructor.ts';
import { storeOrder } from '@/services/order/actions.ts';

describe('check get order', () => {
	it('should be order', () => {
		expect(
			storeOrder(undefined, {
				type: storeOrder,
				number: 85248,
			})
		).toEqual({
			...initialState,
			type: 'Order/setOrder',
			payload: undefined,
		});
	});
});
