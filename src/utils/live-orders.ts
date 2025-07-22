export interface Order {
	_id: string;
	name: string;
	status: string;
	number: number;
	createdAt: string;
	updatedAt: string;
	ingredients: string[];
	id: number;
}

export type LiveOrders = {
	success: boolean;
	orders: Order[];
	total: number;
	totalToday: number;
};

export enum LiveOrdersActionType {
	DATA = 'data',
	INSERT = 'insert',
	DELETE = 'delete',
	UPDATE = 'update',
	MOVE = 'move',
}

export type Data = {
	type: LiveOrdersActionType.DATA;
	data: LiveOrders;
};

export type Insert = {
	type: LiveOrdersActionType.INSERT;
	data: {
		rows: Array<Order>;
		pos: number;
	};
};

export type Update = {
	type: LiveOrdersActionType.UPDATE;
	data: LiveOrders;
};

export type Delete = {
	type: LiveOrdersActionType.DELETE;
	data: Array<number>;
};

export type Move = {
	type: LiveOrdersActionType.MOVE;
	data: Array<{ from: number; to: number }>;
};

export type LiveOrdersAction = Insert | Data | Delete | Update | Move;

export type LiveOrdersActions = Array<LiveOrdersAction>;
