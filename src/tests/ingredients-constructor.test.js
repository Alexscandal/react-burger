import { describe, it, expect } from 'vitest';
import {
	ADD_ITEM,
	REMOVE_ITEM,
	UPDATE_COST,
	// UPDATE_ITEM_PRICE,
	// SWAP_INDEX,
} from '@/services/actions/ingredients-constructor.ts';
import {
	constructorInitialState,
	constructorReducer,
} from '@/services/reducers/ingredients-constructor.ts';
import { ingredients } from '@utils/ingredients.js';
import { nanoid } from '@reduxjs/toolkit';

describe('check ingredients constructor', () => {
	const product = {
		_id: '60666c42cc7b410027a1a9b7',
		name: 'Соус Spicy-X',
		type: 'sauce',
		proteins: 30,
		fat: 20,
		carbohydrates: 40,
		calories: 30,
		price: 90,
		image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
		__v: 0,
		uid: nanoid(),
	};
	it('should be ingredient', () => {
		expect(
			constructorReducer(undefined, {
				type: ADD_ITEM,
				product: product,
				id: '60666c42cc7b410027a1a9b7',
			})
		).toEqual({
			...constructorInitialState,
			items: [product],
			product_price: 0,
			cost: 0,
		});
	});

	it('should remove ingredient', () => {
		const stateWithIngredients = {
			items: [product],
			product_price: 90,
			cost: 90,
		};
		expect(
			constructorReducer(stateWithIngredients, {
				type: REMOVE_ITEM,
				id: '60666c42cc7b410027a1a9b7',
				index: 0,
			})
		).toEqual({
			...constructorInitialState,
			items: [],
			product_price: 90,
			cost: 90,
		});
	});

	it('should update cost', () => {
		const startState = {
			items: ingredients.slice(0, 3).push(ingredients[0]),
			product_price: 1255,
			cost: 2615,
		};
		expect(
			constructorReducer(startState, {
				type: UPDATE_COST,
			})
		).toEqual({
			...constructorInitialState,
			cost: 2615,
		});
	});
	/*
	it('should update bun cost', () => {
		expect(
			constructorReducer(undefined, {
				type: UPDATE_ITEM_PRICE,
				product_price: product.price,
			})
		).toEqual({
			...constructorInitialState,
			product_price: product.price * 2,
		});
	});

	it('should swap ingredients', () => {
		const startState = {
			items: ingredients.slice(0, 3).push(ingredients[0]),
			product_price: 1255,
			cost: 2615,
		};
		const items = startState.items;
		[items[1], items[2]] = [items[2], items[1]];
		expect(
			constructorReducer(startState, {
				type: SWAP_INDEX,
				dragIndex: 0,
				hoverIndex: 0,
				hoverItem: ingredients[2],
				dragItem: ingredients[2],
			})
		).toEqual({
			...constructorInitialState,
			items: items,
		});
	});
	*/
});
