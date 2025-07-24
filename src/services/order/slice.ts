import { createSlice } from '@reduxjs/toolkit';
import { Order } from '@utils/live-orders.ts';

const initialState: Order = {
	ingredients: [],
	_id: '',
	id: 0,
	name: '',
	status: '',
	number: 0,
	createdAt: '',
	updatedAt: '',
};

export const orderSlice = createSlice({
	name: 'Cart',
	initialState,
	reducers: {
		/*
		getOrder: (state, action) => {
			//state.order.push(action.payload.cartItem);
		},
		*/
	},
});
