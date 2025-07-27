import { createSlice } from '@reduxjs/toolkit';
import { LiveOrders } from '@utils/live-orders.ts';
import { onError, onMessage } from './actions';

export type LiveOrdersAllStore = {
	orders_all: LiveOrders;
	error: string | null;
};

const initialState: LiveOrdersAllStore = {
	orders_all: {
		success: false,
		orders: [],
		total: 0,
		totalToday: 0,
	},
	error: null,
};

export const liveOrdersAllSlice = createSlice({
	name: 'liveOrdersAll',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				state.orders_all = action.payload;
			});
	},
	selectors: {
		getOrdersAll: (state: LiveOrdersAllStore) => state.orders_all,
		getError: (state: LiveOrdersAllStore) => state.error,
	},
});

export const { getOrdersAll, getError } = liveOrdersAllSlice.selectors;
