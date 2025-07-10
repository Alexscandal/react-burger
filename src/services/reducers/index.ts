import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.ts';
import { constructorReducer } from './ingredients-constructor.ts';
import { ingredientReducer } from './ingredient.js';
import { orderReducer } from './order.js';
import { authReducer } from './auth.js';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	cart: constructorReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
	auth: authReducer,
});
