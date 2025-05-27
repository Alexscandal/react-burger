export const ADD_ITEM = 'ADD_ITEM',
	REMOVE_ITEM = 'REMOVE_ITEM',
	UPDATE_COST = 'UPDATE_COST',
	UPDATE_ITEM_PRICE = 'UPDATE_ITEM_PRICE';

export function addItem(id, items) {
	return function (dispatch) {
		dispatch({
			type: ADD_ITEM,
			id: id,
			items: items,
		});
	};
}

export function removeItem(id) {
	return function (dispatch) {
		dispatch({
			type: REMOVE_ITEM,
			id: id,
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
