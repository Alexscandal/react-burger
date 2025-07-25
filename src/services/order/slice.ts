import { createSlice } from '@reduxjs/toolkit';
import { Order } from '@utils/live-orders.ts';
import { storeOrder } from '@/services/order/actions.ts';

export type TOrderStore = {
	order: Order;
};

const initialState: TOrderStore = {
	order: {
		ingredients: [],
		_id: '',
		id: 0,
		name: '',
		status: '',
		number: 0,
		createdAt: '',
		updatedAt: '',
	},
};

export const orderSlice = createSlice({
	name: 'Order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(storeOrder, (state, action) => {
			state.order = action.payload;
		});
	},
	selectors: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		orderFromStore: (state: Order) => state,
	},
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const { orderFromStore } = orderSlice.selectors;
