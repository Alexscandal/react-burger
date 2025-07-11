import { AppDispatch, TIngradient } from '@utils/types.ts';

export const SET_PRODUCT = 'SET_PRODUCT';

export function setProduct(id: string, items: TIngradient[]) {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: SET_PRODUCT,
			id: id,
			items: items,
		});
	};
}
