import { TIngradient, TSetProductAction } from '@utils/types.ts';

export const SET_PRODUCT = 'SET_PRODUCT';

export const setProduct = (
	id: string,
	items: TIngradient[]
): TSetProductAction => ({
	type: SET_PRODUCT,
	id: id,
	items: items,
});
