import { /*applyMiddleware, createStore,*/ compose } from 'redux';
import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { liveTableSlice } from './live-table/slice';
//import thunk from 'redux-thunk';
//import { rootReducer } from './reducers';
import { socketMiddleware } from '@/services/middleware/socket-middleware.ts';
import {
	connect,
	disconnect,
	LiveTableActionTypes,
	onClose,
	onConnecting,
	onError,
	onMessage,
	onOpen,
} from '@/services/live-table/actions.ts';
import {
	useSelector as selectorHook,
	useDispatch as dispatchHook,
} from 'react-redux';

const rootReducer = combineSlices(liveTableSlice);

const liveTableMiddleware = socketMiddleware({
	connect: connect,
	disconnect,
	onConnecting,
	onOpen,
	onClose,
	onError,
	onMessage,
});

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
/*
export const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
*/
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(liveTableMiddleware),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<
	RootState,
	unknown,
	LiveTableActionTypes
>;
export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();
