import {
	/*combineSlices,*/ configureStore,
	ThunkDispatch,
} from '@reduxjs/toolkit';
import { liveOrdersAllSlice } from '@/services/live-orders-all/slice';
import { liveOrdersSlice } from '@/services/live-orders/slice';
import { orderSlice } from '@/services/order/slice.ts';
import { socketMiddleware } from '@/services/middleware/socket-middleware.ts';
import {
	connect,
	disconnect,
	LiveOrdersActionTypes,
	onError,
	onMessage,
} from '@/services/live-orders-all/actions.ts';
import { OrderActionTypes } from '@/services/order/actions.ts';
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
import {
	TAddProductAction,
	TSetProductAction,
	TUpdatePriceAction,
} from '@utils/types.ts';

const rootReducer = combineReducers({
	auth: authReducer,
	cart: constructorReducer,
	ingredient: ingredientReducer,
	ingredients: ingredientsReducer,
	order: orderReducer,
	[liveOrdersAllSlice.reducerPath]: liveOrdersAllSlice.reducer,
	[liveOrdersSlice.reducerPath]: liveOrdersSlice.reducer,
	[orderSlice.reducerPath]: orderSlice.reducer,
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
	| LiveOrdersActionTypes
	| TSetProductAction
	| TUpdatePriceAction
	| TAddProductAction
	| OrderActionTypes
	| { type: string }
>;

//export type AppDispatch = typeof store.dispatch;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
