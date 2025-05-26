/* reducer*/
import { SET_PRODUCT } from '@/services/actions/ingredient.js';

const ingredientInitialState = {
	product: {
		_id: '60666c42cc7b410027a1a9b1',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	},
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
