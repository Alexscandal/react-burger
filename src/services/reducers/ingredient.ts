import { SET_PRODUCT } from '@/services/actions/ingredient.ts';
import { TIngradient } from '@utils/types.ts';

const ingredientInitialState = {
	product: null,
	items: [],
	cost: 0,
};

export const ingredientReducer = (
	state = ingredientInitialState,
	action: { type: string; id: string; items: TIngradient[] }
) => {
	//alert('ingredientReducer ' + action.type);
	switch (action.type) {
		case SET_PRODUCT:
			// eslint-disable-next-line no-case-declarations
			const product = action.items.find((item) => item._id === action.id);
			return {
				...state,
				product: product,
			};
	}
	return state;
};
