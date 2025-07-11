import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.ts';
import { constructorReducer } from './ingredients-constructor.ts';
import { ingredientReducer } from './ingredient.ts';
import { orderReducer } from './order.ts';
import { authReducer } from './auth.ts';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	cart: constructorReducer,
	ingredient: ingredientReducer,
	order: orderReducer,
	auth: authReducer,
});
