/* reducer*/
import {
	LOAD_DATA,
	FAILED_LOADING,
	UPDATE_COUNT,
} from '@/services/actions/ingredients.js';

const ingredientsInitialState = {
	items: [],
	isLoading: false,
	product: null,
	hasError: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				items: action.items,
				//product: action.items[0] ?? null,
				isLoading: !(action.items.length > 0),
			};
		case FAILED_LOADING:
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		case UPDATE_COUNT:
			/* обновление количества товара */
			// eslint-disable-next-line no-case-declarations
			const current = state.items.find((item) => item._id === action.id);
			state.items.map((item) => {
				if (item.type === 'bun' && current.type === 'bun') {
					item.count = 0;
				}
				if (item._id === action.id) {
					item.count++;
					state.product = item;
				}
			});
			return state;
		default:
			return state;
	}
};
