import { nanoid } from '@reduxjs/toolkit';

export const ADD_ITEM = 'ADD_ITEM',
	REMOVE_ITEM = 'REMOVE_ITEM',
	UPDATE_COST = 'UPDATE_COST',
	UPDATE_ITEM_PRICE = 'UPDATE_ITEM_PRICE',
	SWAP_INDEX = 'SWAP_INDEX';

export function addItem(id, product) {
	return function (dispatch) {
		dispatch({
			type: ADD_ITEM,
			product: { ...product, uid: nanoid() },
		});
	};
}

export function removeItem(id, index) {
	return function (dispatch) {
		dispatch({
			type: REMOVE_ITEM,
			id: id,
			index: index,
		});
	};
}

export function updateCost() {
	return function (dispatch) {
		dispatch({
			type: UPDATE_COST,
		});
	};
}

export function updateItemPrice(price) {
	return function (dispatch) {
		dispatch({
			type: UPDATE_ITEM_PRICE,
			product_price: price,
		});
	};
}

export function swapIndex(dragIndex, hoverIndex, hoverItem, dragItem) {
	return function (dispatch) {
		dispatch({
			type: SWAP_INDEX,
			dragIndex: dragIndex,
			hoverIndex: hoverIndex,
			hoverItem: hoverItem,
			dragItem: dragItem,
		});
	};
}
