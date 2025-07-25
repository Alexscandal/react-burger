import appStyles from '@components/app/app.module.css';
import styles from '@pages/profile.module.css';
import { ProfileMenu } from '@components/profile-menu/profile-menu.tsx';
import { OrderBrief1 } from '@components/order-details/order-brief-1.tsx';
import { useDispatch, useSelector } from '@/services/store.ts';
import { getOrders } from '@/services/live-orders/slice.ts';
import { connect, disconnect } from '@/services/live-orders/actions.ts';
import { useEffect } from 'react';
import { Order } from '@utils/live-orders.ts';
import { ORDERS_URL, refreshToken } from '@utils/api.ts';

export function OrdersPage() {
	const orders = useSelector(getOrders);
	const dispatch = useDispatch();
	const wsConnect = () =>
		dispatch(connect(ORDERS_URL + '?token=' + (localStorage.authToken ?? '')));
	const wsDisconnect = () => dispatch(disconnect());
	useEffect(() => {
		dispatch(wsConnect);
		return () => {
			wsDisconnect();
		};
	});
	if (
		orders.success === false &&
		orders.message === 'Invalid or missing token'
	) {
		refreshToken();
	}
	//console.info('orders', orders);
	const items: Order[] =
		orders.orders != undefined && orders.orders.length ? orders.orders : [];

	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<div className={`${styles.content_left} ${styles.left_side} mr-15`}>
					<ProfileMenu />
					<p>В этом разделе вы можете просмотреть свою историю заказов</p>
				</div>
				<div>
					<ul className={`${appStyles.scroll} ${appStyles.feed}`}>
						{items.map((order: Order) => (
							<li className='mb-6' key={order.number}>
								<OrderBrief1 item={order} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
