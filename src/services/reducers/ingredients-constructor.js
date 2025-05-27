/* reducer*/
import {
	ADD_ITEM,
	REMOVE_ITEM,
	UPDATE_COST,
	UPDATE_ITEM_PRICE,
} from '@/services/actions/ingredients-constructor.js';

const constructorInitialState = {
	items: [],
	product_price: 0,
	cost: 0,
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
		case REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter((item) => item._id !== action.id),
			};
		case UPDATE_COST:
			/* обновление стоимости корзины */
			// eslint-disable-next-line no-case-declarations
			let cost = 0;
			//console.info(state.product.price);
			state.items.map((item) => {
				cost += item.price;
			});
			cost += state.product_price;
			return {
				...state,
				cost: cost,
			};
		case UPDATE_ITEM_PRICE:
			return {
				...state,
				product_price: action.product_price,
			};
		default:
			return state;
	}
};
