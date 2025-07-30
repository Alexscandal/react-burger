import { SET_PRODUCT } from '@/services/actions/ingredient.ts';
import { TIngradient } from '@utils/types.ts';

export const ingredientInitialState = {
	product: null,
	cost: 0,
};

export const ingredientReducer = (
	state = ingredientInitialState,
	action: { type: string; item: TIngradient }
) => {
	switch (action.type) {
		case SET_PRODUCT:
			return {
				...state,
				product: action.item,
			};
	}
	return state;
};
