import { createAction } from '@reduxjs/toolkit';
import { LiveTableActions } from '@utils/live-table.ts';

export const connect = createAction<string, 'liveTable/connect'>(
	'liveTable/connect'
);
export const disconnect = createAction('liveTable/disconnect');

export const onConnecting = createAction('liveTable/onConnecting');
export const onOpen = createAction('liveTable/onOpen');
export const onClose = createAction('liveTable/onClose');
export const onError = createAction<string, 'liveTable/onError'>(
	'liveTable/onError'
);
export const onMessage = createAction<LiveTableActions, 'liveTable/onMessage'>(
	'liveTable/onMessage'
);

export type LiveTableActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
