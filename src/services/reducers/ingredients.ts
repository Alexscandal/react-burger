import { LOAD_DATA, FAILED_LOADING } from '@/services/actions/ingredients.ts';
import { TIngradient } from '@utils/types.ts';

const ingredientsInitialState = {
	items: [],
	isLoading: false,
	product: {},
	hasError: false,
};

export const ingredientsReducer = (
	state = ingredientsInitialState,
	action: { id: string; type: string; items: TIngradient[] }
) => {
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				items: action.items,
				isLoading: !(action.items != undefined && action.items.length > 0),
			};
		case FAILED_LOADING:
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		default:
			return state;
	}
};
