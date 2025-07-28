import { describe, it, expect } from 'vitest';
import { LOAD_DATA, FAILED_LOADING } from '@/services/actions/ingredients.ts';
import {
	ingredientsInitialState,
	ingredientsReducer,
} from '@/services/reducers/ingredients.ts';
import { ingredients } from '@utils/ingredients.js';

describe('check loading ingredients', () => {
	it('should be success', () => {
		expect(
			ingredientsReducer(undefined, {
				type: LOAD_DATA,
				items: ingredients,
			})
		).toEqual({
			...ingredientsInitialState,
			items: ingredients,
			isLoading: false,
			product: {},
			hasError: false,
		});
	});

	it('should be failed', () => {
		expect(
			ingredientsReducer(undefined, {
				type: FAILED_LOADING,
			})
		).toEqual({
			...ingredientsInitialState,
			items: [],
			isLoading: false,
			product: {},
			hasError: true,
		});
	});
});
