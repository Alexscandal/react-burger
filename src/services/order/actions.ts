import { createAction } from '@reduxjs/toolkit';
import { Order } from '@utils/live-orders.ts';

export const storeOrder = createAction<Order>('Order/setOrder');

export type OrderActionTypes = ReturnType<typeof storeOrder>;
