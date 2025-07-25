import appStyles from '@components/app/app.module.css';
import styles from '@pages/feed.module.css';
import { OrderBrief } from '@components/order-details/order-brief.tsx';
import { connect, disconnect } from '@/services/live-orders-all/actions';
import { useDispatch, useSelector } from '@/services/store';
import { getOrdersAll } from '@/services/live-orders-all/slice';
import { useEffect } from 'react';
import { Order } from '@utils/live-orders.ts';
import { ORDERS_URL } from '@utils/api.ts';

export function FeedPage() {
	const orders = useSelector(getOrdersAll);
	//console.info('orders', orders);
	const dispatch = useDispatch();
	const wsConnect = () => dispatch(connect(ORDERS_URL + '/all'));
	const wsDisconnect = () => dispatch(disconnect());
	useEffect(() => {
		dispatch(wsConnect);
		return () => {
			wsDisconnect();
		};
	});

	const items: Order[] =
		orders.orders != undefined && orders.orders.length ? orders.orders : [];
	const done = items.filter((item) => item.status === 'done').slice(0, 10);
	const created = items.filter((item) => item.status === 'created').slice(0, 5);

	return (
		<main className={`${styles.main} pt-5 pb-5`}>
			<h1>Лента заказов</h1>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
				<div>
					<ul className={`${appStyles.scroll} ${appStyles.feed}`}>
						{items.map((order: Order) => (
							<li className='mb-6' key={order.number + '_' + Date.now()}>
								<OrderBrief item={order} />
							</li>
						))}
					</ul>
				</div>
				<div>
					<div className={`${appStyles.d_flex} ${styles.cols} mb-15`}>
						<div>
							<p className='text text_type_main-medium mb-6'>Готовы:</p>
							<div className='text text_type_digits-default'>
								{done.slice(0, 5).map((order: Order) => (
									<div className={`${appStyles.color_success} mb-2`}>
										{order.number}
									</div>
								))}
							</div>
						</div>
						<div>
							<p className='text text_type_main-medium mb-6'>&nbsp;</p>
							<div className='text text_type_digits-default'>
								{done.slice(5, 10).map((order: Order) => (
									<div className={`${appStyles.color_success} mb-2`}>
										{order.number}
									</div>
								))}
							</div>
						</div>
						<div>
							<p className='text text_type_main-medium mb-6'>В работе:</p>
							<div className='text text_type_digits-default'>
								{created.slice(5, 10).map((order: Order) => (
									<div className='mb-2'>{order.number}</div>
								))}
							</div>
						</div>
					</div>
					<div className='text text_type_main-medium'>
						Выполнено за все время:
					</div>
					<div className='text text_type_digits-large mb-15'>
						{orders.total}
					</div>
					<div className='text text_type_main-medium'>
						Выполнено за сегодня:
					</div>
					<div className='text text_type_digits-large'>{orders.totalToday}</div>
				</div>
			</div>
		</main>
	);
}
