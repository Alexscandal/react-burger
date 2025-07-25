import { nanoid } from '@reduxjs/toolkit';
import {
	TAddProductAction,
	TIngradient,
	TUpdatePriceAction,
} from '@utils/types.ts';

export const ADD_ITEM = 'ADD_ITEM',
	REMOVE_ITEM = 'REMOVE_ITEM',
	UPDATE_COST = 'UPDATE_COST',
	UPDATE_ITEM_PRICE = 'UPDATE_ITEM_PRICE',
	SWAP_INDEX = 'SWAP_INDEX';

export const addItem = (
	id: string,
	product: TIngradient
): TAddProductAction => ({
	type: ADD_ITEM,
	product: { ...product, uid: nanoid() },
	id: id,
});

export const removeItem = (
	id: string,
	index: number
): { type: string; id: string; index: number } => ({
	type: REMOVE_ITEM,
	id: id,
	index: index,
});

export const updateCost = (): { type: string } => ({
	type: UPDATE_COST,
});

export const updateItemPrice = (price: number): TUpdatePriceAction => ({
	type: UPDATE_ITEM_PRICE,
	product_price: price,
});

export const swapIndex = (
	dragIndex: number,
	hoverIndex: number,
	hoverItem: TIngradient,
	dragItem: TIngradient
): {
	type: string;
	dragIndex: number;
	hoverIndex: number;
	hoverItem: TIngradient;
	dragItem: TIngradient;
} => ({
	type: SWAP_INDEX,
	dragIndex: dragIndex,
	hoverIndex: hoverIndex,
	hoverItem: hoverItem,
	dragItem: dragItem,
});
