import { createSlice } from '@reduxjs/toolkit';
import { LiveOrders, WebsocketStatus } from '@utils/live-orders.ts';
import { onError, onMessage } from './actions';
import { liveTableUpdate } from './live-table-update';

export type LiveTableStore = {
	status: WebsocketStatus;
	table: LiveOrders;
	error: string | null;
};

const initialState: LiveTableStore = {
	status: WebsocketStatus.OFFLINE,
	table: [],
	error: null,
};

export const liveTableSlice = createSlice({
	name: 'liveTable',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
				console.info('actions', action);
				state.table = liveTableUpdate(state.table, action.payload);
			});
	},
	selectors: {
		getTable: (state: LiveTableStore) => state.table,
		getStatus: (state: LiveTableStore) => state.status,
		getError: (state: LiveTableStore) => state.error,
	},
});

export const { getTable, getStatus, getError } = liveTableSlice.selectors;
