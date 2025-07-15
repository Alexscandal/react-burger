import { getIngredients } from '@utils/api.ts';
import { AppDispatch } from '@utils/types.ts';

export const LOAD_DATA = 'LOAD_DATA',
	FAILED_LOADING = 'FAILED_LOADING',
	UPDATE_COUNT = 'UPDATE_COUNT',
	REDUCE_COUNT = 'REDUCE_COUNT';

export function loadData() {
	return function (dispatch: AppDispatch) {
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

export const updateCount = (id: string): { type: string; id: string } => ({
	type: UPDATE_COUNT,
	id: id,
});

export const reduceCount = (id: string): { type: string; id: string } => ({
	type: REDUCE_COUNT,
	id: id,
});
