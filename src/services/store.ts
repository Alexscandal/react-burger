import { combineSlices, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { liveTableSlice } from '@/services/live-orders-all/slice';
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
} from '@/services/live-orders-all/actions.ts';
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
