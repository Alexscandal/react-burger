import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.js';
import { constructorReducer } from './ingredients-constructor.js';
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
