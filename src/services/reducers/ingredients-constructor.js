import {
	ADD_ITEM,
	REMOVE_ITEM,
	UPDATE_COST,
	UPDATE_ITEM_PRICE,
	SWAP_INDEX,
} from '@/services/actions/ingredients-constructor.js';

const constructorInitialState = {
	items: [],
	product_price: 0,
	cost: 0,
};

export const constructorReducer = (state = constructorInitialState, action) => {
	switch (action.type) {
		case ADD_ITEM: // добавление в инградиенты
			return {
				...state,
				items: [...state.items, action.product],
			};
		case REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter((item, index) => index !== action.index),
			};
		case UPDATE_COST:
			/* update cost */
			// eslint-disable-next-line no-case-declarations
			let cost = 0;
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
				product_price: action.product_price * 2,
			};
		case SWAP_INDEX:
			/* swap ingredients on drag */
			// eslint-disable-next-line no-case-declarations
			const updated = state.items;
			updated[action.dragIndex] = action.hoverItem;
			updated[action.hoverIndex] = action.dragItem;
			return {
				...state,
				items: updated,
			};
		default:
			return state;
	}
};
