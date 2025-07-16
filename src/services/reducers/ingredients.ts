import {
	LOAD_DATA,
	FAILED_LOADING,
	UPDATE_COUNT,
	REDUCE_COUNT,
	// eslint-disable-next-line import/no-unresolved
} from '@/services/actions/ingredients.ts';
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
	const items: TIngradient[] = state.items;
	switch (action.type) {
		case LOAD_DATA:
			return {
				...state,
				items: action.items,
				isLoading: !(action.items.length > 0),
			};
		case FAILED_LOADING:
			return {
				...state,
				hasError: true,
				isLoading: false,
			};
		case UPDATE_COUNT:
			/* update item count */
			// eslint-disable-next-line no-case-declarations
			const current: TIngradient | undefined = state.items.find(
				(item: TIngradient) => item._id === action.id
			);
			items.map((item: TIngradient) => {
				if (item.type === 'bun' && current!.type === 'bun') {
					item.count = 0;
				}
				if (item._id === action.id) {
					//item.count++;
					return {
						...state,
						product: item,
					};
				}
			});
			return state;
		case REDUCE_COUNT:
			items.map((item: TIngradient) => {
				if (item._id === action.id) {
					item.count--;
				}
			});
			return state;
		default:
			return state;
	}
};
