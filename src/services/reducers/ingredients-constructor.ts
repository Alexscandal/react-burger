import {
	ADD_ITEM,
	REMOVE_ITEM,
	UPDATE_COST,
	UPDATE_ITEM_PRICE,
	SWAP_INDEX,
} from '@/services/actions/ingredients-constructor.ts';
import { TIngradient } from '@utils/types.ts';

const constructorInitialState = {
	items: [],
	product_price: 0,
	cost: 0,
};

type TAction = {
	type: string;
	product: TIngradient;
	hoverItem: TIngradient;
	dragItem: TIngradient;
	index: number;
	product_price: number;
	dragIndex: number;
	hoverIndex: number;
};

export const constructorReducer = (
	state = constructorInitialState,
	action: TAction
) => {
	switch (action.type) {
		case ADD_ITEM: // добавление в инградиенты
			return {
				...state,
				items: [...state.items, action.product],
			};
		case REMOVE_ITEM:
			return {
				...state,
				items: state.items.filter(
					(_item: TIngradient, index) => index !== action.index
				),
			};
		case UPDATE_COST:
			/* update cost */
			// eslint-disable-next-line no-case-declarations
			let cost: number = 0;
			state.items.map((item: TIngradient) => {
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
			/*
			const updated: TIngradient[] = state.items;
			updated[action.dragIndex] = action.hoverItem;
			updated[action.hoverIndex] = action.dragItem;
			*/
			// eslint-disable-next-line no-case-declarations
			const updated: TIngradient[] = [...state.items];
			// eslint-disable-next-line no-case-declarations
			const dragIdx = action.dragIndex;

			// eslint-disable-next-line no-case-declarations
			const hoverIdx = action.hoverIndex;
			[updated[dragIdx], updated[hoverIdx]] = [
				updated[hoverIdx],
				updated[dragIdx],
			];

			return {
				...state,
				items: updated,
			};
		default:
			return state;
	}
};
