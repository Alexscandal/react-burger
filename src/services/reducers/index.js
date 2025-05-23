import { combineReducers } from 'redux';
import { ingradientsReducer } from './ingradients.js';
import { constructorReducer } from './ingradients-constructor.js';
import { ingradientReducer } from './ingradient.js';
import { orderReducer } from './order.js';

export const rootReducer = combineReducers({
	ingradients: ingradientsReducer,
	constructor: constructorReducer,
	ingradient: ingradientReducer,
	order: orderReducer,
});
