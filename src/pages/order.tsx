import { Order } from '@components/order-details/order.tsx';
import React from 'react';

export function OrderPage({ modal }: { modal: boolean }): React.JSX.Element {
	return <Order modal={modal} />;
}
