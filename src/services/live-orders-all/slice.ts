import { createSlice } from '@reduxjs/toolkit';
import { LiveOrders } from '@utils/live-orders.ts';
import { onError, onMessage } from './actions';

export type LiveOrdersStore = {
	orders: LiveOrders;
	error: string | null;
};

const initialState: LiveOrdersStore = {
	orders: [],
	error: null,
};

export const liveOrdersSlice = createSlice({
	name: 'liveOrders',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onError, (state, action) => {
				console.info('action', action);
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.orders = action.payload;
			});
	},
	selectors: {
		getOrders: (state: LiveOrdersStore) => state.orders,
		getError: (state: LiveOrdersStore) => state.error,
	},
});

export const { getOrders, getError } = liveOrdersSlice.selectors;
