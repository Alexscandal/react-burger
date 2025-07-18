import { createAction } from '@reduxjs/toolkit';
import { LiveOrdersActions } from '@utils/live-orders.ts';

export const connect = createAction<string, 'liveOrders/connect'>(
	'liveOrders/connect'
);
export const disconnect = createAction('liveOrders/disconnect');

export const onConnecting = createAction('liveOrders/onConnecting');
export const onOpen = createAction('liveOrders/onOpen');
export const onClose = createAction('liveOrders/onClose');
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
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
