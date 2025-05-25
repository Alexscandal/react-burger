/* action */
import { getIngredients } from '@utils/api.js';

export const LOAD_DATA = 'LOAD_DATA',
	FAILED_LOADING = 'FAILED_LOADING',
	UPDATE_COUNT = 'UPDATE_COUNT';

export function loadData() {
	return function (dispatch) {
		getIngredients()
			.then((arr) => {
				arr.map((item) => {
					item.count = 0;
				});
				dispatch({
					type: LOAD_DATA,
					items: arr,
				});
			})
			.catch(() =>
				dispatch({
					type: FAILED_LOADING,
				})
			);
	};
}

export function updateCount(id) {
	return function (dispatch) {
		dispatch({
			type: UPDATE_COUNT,
			id: id,
		});
	};
}
