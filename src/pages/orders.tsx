import appStyles from '@components/app/app.module.css';
import styles from '@pages/profile.module.css';
import { ProfileMenu } from '@components/profile-menu/profile-menu.tsx';
import { OrderBrief } from '@components/order-details/order-brief.tsx';
import { useDispatch, useSelector } from '@/services/store.ts';
import { getOrders } from '@/services/live-orders-all/slice.ts';
import { connect, disconnect } from '@/services/live-orders-all/actions.ts';
import { useEffect } from 'react';
import { Order } from '@utils/live-orders.ts';

export function OrdersPage() {
	const orders = useSelector(getOrders);
	const dispatch = useDispatch();
	const wsConnect = () =>
		dispatch(
			connect(
				'wss://norma.nomoreparties.space/orders?token=' +
					(localStorage.authToken ?? '')
			)
		);
	const wsDisconnect = () => dispatch(disconnect());
	useEffect(() => {
		dispatch(wsConnect);
		return () => {
			wsDisconnect();
		};
	});
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
								<OrderBrief item={order} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
