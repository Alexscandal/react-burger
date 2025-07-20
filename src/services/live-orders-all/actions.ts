import { createAction } from '@reduxjs/toolkit';
import { LiveOrdersActions } from '@utils/live-orders.ts';

export const connect = createAction<string, 'liveOrders/connect'>(
	'liveOrders/connect'
);
export const disconnect = createAction('liveOrders/disconnect');

export const onError = createAction<string, 'liveOrders/onError'>(
	'liveOrders/onError'
);
export const onMessage = createAction<
	LiveOrdersActions,
	'liveOrders/onMessage'
>('liveOrders/onMessage');

export type LiveOrdersActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
