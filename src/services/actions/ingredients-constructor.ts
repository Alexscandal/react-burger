import { nanoid } from '@reduxjs/toolkit';
import { TIngradient, AppDispatch, AppThunkAction } from '@utils/types.ts';

export const ADD_ITEM = 'ADD_ITEM',
	REMOVE_ITEM = 'REMOVE_ITEM',
	UPDATE_COST = 'UPDATE_COST',
	UPDATE_ITEM_PRICE = 'UPDATE_ITEM_PRICE',
	SWAP_INDEX = 'SWAP_INDEX';

export function addItem(id: string, product: TIngradient): AppThunkAction {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: ADD_ITEM,
			product: { ...product, uid: nanoid() },
			id: id,
		});
	};
}

export function removeItem(id: string, index: number): AppThunkAction {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: REMOVE_ITEM,
			id: id,
			index: index,
		});
	};
}

export function updateCost(): AppThunkAction {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UPDATE_COST,
		});
	};
}

export function updateItemPrice(price: number): AppThunkAction {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UPDATE_ITEM_PRICE,
			product_price: price,
		});
	};
}

export function swapIndex(
	dragIndex: number,
	hoverIndex: number,
	hoverItem: TIngradient,
	dragItem: TIngradient
): AppThunkAction {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: SWAP_INDEX,
			dragIndex: dragIndex,
			hoverIndex: hoverIndex,
			hoverItem: hoverItem,
			dragItem: dragItem,
		});
	};
}
