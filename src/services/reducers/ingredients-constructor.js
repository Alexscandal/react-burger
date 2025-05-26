/* reducer*/
import {
	ADD_ITEM,
	//REMOVE_ITEM,
} from '@/services/actions/ingredients-constructor.js';

const constructorInitialState = {
	items: [],
	product: null,
};

export const constructorReducer = (state = constructorInitialState, action) => {
	switch (action.type) {
		case ADD_ITEM: // добавление в инградиенты
			// eslint-disable-next-line no-case-declarations
			const product = action.items.find((item) => item._id === action.id);
			return {
				...state,
				items: [...state.items, product],
			};
	}
	return state;
};
