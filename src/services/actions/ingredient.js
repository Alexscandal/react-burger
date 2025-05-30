export const SET_PRODUCT = 'SET_PRODUCT';

export function setProduct(id, items) {
	return function (dispatch) {
		dispatch({
			type: SET_PRODUCT,
			id: id,
			items: items,
		});
	};
}
