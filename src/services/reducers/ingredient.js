import { SET_PRODUCT } from '@/services/actions/ingredient.js';

const ingredientInitialState = {
	product: null,
};

export const ingredientReducer = (state = ingredientInitialState, action) => {
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
