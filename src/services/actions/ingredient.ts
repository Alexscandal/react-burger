import { TIngradient } from '@utils/types.ts';

export const SET_PRODUCT = 'SET_PRODUCT';

export const setProduct = (
	id: string,
	items: TIngradient[]
): { type: string; id: string; items: TIngradient[] } => ({
	type: SET_PRODUCT,
	id: id,
	items: items,
});
