export const ADD_ITEM = 'ADD_ITEM',
	REMOVE_ITEM = 'REMOVE_ITEM';

export function addItem(id, items) {
	//console.info('AddItem', items.length);
	return function (dispatch) {
		dispatch({
			type: ADD_ITEM,
			id: id,
			items: items,
		});
	};
}
