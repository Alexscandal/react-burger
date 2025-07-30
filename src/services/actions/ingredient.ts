import { TIngradient } from '@utils/types.ts';

export const SET_PRODUCT = 'SET_PRODUCT';

export const setProduct = (
	item: TIngradient
): { type: string; item: TIngradient } => ({
	type: SET_PRODUCT,
	item: item,
});
