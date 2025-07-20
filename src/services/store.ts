import {
	/*combineSlices,*/ configureStore,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { liveOrdersSlice } from '@/services/live-orders-all/slice';
import { socketMiddleware } from '@/services/middleware/socket-middleware.ts';
import {
	connect,
	disconnect,
	LiveOrdersActionTypes,
	onError,
	onMessage,
} from '@/services/live-orders-all/actions.ts';
import {
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';
import { combineReducers } from 'redux';
import { authReducer } from '@/services/reducers/auth.ts';
import { ingredientsReducer } from '@/services/reducers/ingredients.ts';
import { ingredientReducer } from '@/services/reducers/ingredient.ts';
import { constructorReducer } from '@/services/reducers/ingredients-constructor.ts';
import { orderReducer } from '@/services/reducers/order.ts';

//const rootReducer = combineSlices(liveOrdersSlice);
const rootReducer = combineReducers({
	[liveOrdersSlice.reducerPath]: liveOrdersSlice.reducer,
	auth: authReducer,
	cart: constructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
});

const liveMiddleware = socketMiddleware({
	connect: connect,
	disconnect,
	onError,
	onMessage,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(liveMiddleware),
});
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<
	RootState,
	unknown,
	LiveOrdersActionTypes
>;

//export type AppDispatch = typeof store.dispatch;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
