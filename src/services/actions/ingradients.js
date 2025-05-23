/* action */
import { getIngredients } from '@utils/api.js';

export const LOAD_DATA = 'LOAD_DATA',
	FAILED_LOADING = 'FAILED_LOADING';

export function loadData() {
	return function (dispatch) {
		getIngredients()
			.then((arr) => {
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
