import { createSlice } from '@reduxjs/toolkit';
import { LiveTable, WebsocketStatus } from '@utils/live-table.ts';
import { onClose, onConnecting, onError, onMessage, onOpen } from './actions';
import { liveTableUpdate } from './live-table-update';

export type LiveTableStore = {
	status: WebsocketStatus;
	table: LiveTable;
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
			.addCase(onConnecting, (state) => {
				state.status = WebsocketStatus.CONNECTING;
			})
			.addCase(onOpen, (state) => {
				state.status = WebsocketStatus.ONLINE;
			})
			.addCase(onClose, (state) => {
				state.status = WebsocketStatus.OFFLINE;
			})
			.addCase(onError, (state, action) => {
				state.error = action.payload;
			})
			.addCase(onMessage, (state, action) => {
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
