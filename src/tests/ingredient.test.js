import { describe, it, expect } from 'vitest';
import { SET_PRODUCT } from '@/services/actions/ingredient.ts';
import {
	ingredientReducer,
	ingredientInitialState,
} from '@/services/reducers/ingredient.ts';

describe('check ingredient reducer', () => {
	it('should return the initial state', () => {
		expect(ingredientReducer(undefined, { type: '' })).toEqual(
			ingredientInitialState
		);
	});

	it('should set product', () => {
		const product = {
			_id: '60666c42cc7b410027a1a9b1',
			name: 'Краторная булка N-200i',
			type: 'bun',
			proteins: 80,
			fat: 24,
			carbohydrates: 53,
			calories: 420,
			price: 1255,
			image: 'https://code.s3.yandex.net/react/code/bun-02.png',
			image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
			image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
			__v: 0,
		};

		expect(
			ingredientReducer(undefined, {
				type: SET_PRODUCT,
				item: product,
			})
		).toEqual({
			...ingredientInitialState,
			product: product,
			cost: 0,
		});
	});
});
