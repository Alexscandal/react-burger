import {
	LiveOrders,
	LiveOrdersActionType,
	LiveOrdersActions,
	Insert,
	Delete,
	Update,
	Move,
} from '@utils/live-orders.ts';

const insertData = (table: LiveOrders, action: Insert): LiveOrders => {
	return [
		...table.slice(0, action.data.pos),
		...action.data.rows,
		...table.slice(action.data.pos),
	];
};

const deleteData = (table: LiveOrders, action: Delete): LiveOrders => {
	return table.filter(({ id }) => !action.data.includes(id));
};

const updateData = (items: LiveOrders, action: Update): LiveOrders => {
	return items.map((item) => {
		const index = action.data.findIndex(
			(updatedItem) => updatedItem.id === item.id
		);
		if (index !== -1) {
			return action.data[index];
		}
		return item;
	});
};

const moveData = (prevTable: LiveOrders, action: Move): LiveOrders => {
	const items = [...prevTable];
	action.data.forEach((move) => {
		items.splice(move.to, 0, items.splice(move.from, 1)[0]);
	});
	return items;
};

export const liveOrdersUpdate = (
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
	// return actions; real data
};
