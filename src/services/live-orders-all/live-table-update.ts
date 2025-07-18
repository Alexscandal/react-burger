import {
	LiveOrders,
	LiveOrdersActionType,
	LiveOrdersActions,
	Insert as LiveTableInsertAction,
	Delete as LiveTableDeleteAction,
	Update as LiveTableUpdateAction,
	Move as LiveTableMoveAction,
} from '@utils/live-orders.ts';

const insertData = (
	table: LiveOrders,
	action: LiveTableInsertAction
): LiveOrders => {
	return [
		...table.slice(0, action.data.pos),
		...action.data.rows,
		...table.slice(action.data.pos),
	];
};

const deleteData = (
	table: LiveOrders,
	action: LiveTableDeleteAction
): LiveOrders => {
	return table.filter(({ id }) => !action.data.includes(id));
};

const updateData = (
	table: LiveOrders,
	action: LiveTableUpdateAction
): LiveOrders => {
	return table.map((row) => {
		const index = action.data.findIndex(
			(updatedRow) => updatedRow.id === row.id
		);
		if (index !== -1) {
			return action.data[index];
		}
		return row;
	});
};

const moveData = (
	prevTable: LiveOrders,
	action: LiveTableMoveAction
): LiveOrders => {
	const table = [...prevTable];
	action.data.forEach((move) => {
		table.splice(move.to, 0, table.splice(move.from, 1)[0]);
	});
	return table;
};

export const liveTableUpdate = (
	prevTable: LiveOrders,
	actions: LiveOrdersActions
): LiveOrders => {
	let table = prevTable;
	actions.forEach((action) => {
		switch (action.type) {
			case LiveOrdersActionType.DATA:
				table = action.data;
				break;
			case LiveOrdersActionType.INSERT:
				table = insertData(table, action);
				break;
			case LiveOrdersActionType.DELETE:
				table = deleteData(table, action);
				break;
			case LiveOrdersActionType.UPDATE:
				table = updateData(table, action);
				break;
			case LiveOrdersActionType.MOVE:
				table = moveData(table, action);
				break;
		}
	});

	return table;
};
