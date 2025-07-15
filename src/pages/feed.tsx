import appStyles from '@components/app/app.module.css';
import styles from '@pages/feed.module.css';
import { OrderBrief } from '@components/order-details/order-brief.tsx';
import { connect, disconnect } from '@/services/live-orders-all/actions';
import { useDispatch, useSelector } from '@/services/store';
import { getStatus, getTable } from '@/services/live-orders-all/slice';
import { useEffect } from 'react';

export function FeedPage() {
	const table = useSelector(getTable);
	const status = useSelector(getStatus);
	console.info(status);
	console.info(table);
	const dispatch = useDispatch();
	const wsConnect = () =>
		dispatch(connect('wss://norma.nomoreparties.space/orders/all'));
	const wsDisconnect = () => dispatch(disconnect());
	useEffect(() => {
		dispatch(wsConnect);
		return () => {
			wsDisconnect();
		};
	});
	return (
		<main className={`${styles.main} pt-5 pb-5`}>
			<h1>Лента заказов</h1>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
				<div>
					<ul className={`${appStyles.scroll} ${appStyles.feed}`}>
						<li className='mb-6'>
							<OrderBrief />
						</li>
						<li className='mb-6'>
							<OrderBrief />
						</li>
					</ul>
				</div>
				<div>
					<div className={`${appStyles.d_flex} ${styles.cols} mb-15`}>
						<div>
							<p className='text text_type_main-medium mb-6'>Готовы:</p>
							<div className='text text_type_digits-default'>
								<div className={`${appStyles.color_success} mb-2`}>034533</div>
								<div className={`${appStyles.color_success} mb-2`}>034533</div>
								<div className={`${appStyles.color_success} mb-2`}>034533</div>
								<div className={`${appStyles.color_success} mb-2`}>034533</div>
								<div className={`${appStyles.color_success} mb-2`}>034533</div>
							</div>
						</div>
						<div>
							<p className='text text_type_main-medium mb-6'>В работе:</p>
							<div className='text text_type_digits-default'>
								<div className='mb-2'>034533</div>
								<div className='mb-2'>034533</div>
								<div className='mb-2'>034533</div>
							</div>
						</div>
					</div>
					<div className='text text_type_main-medium'>
						Выполнено за все время:
					</div>
					<div className='text text_type_digits-large mb-15'>28 752</div>
					<div className='text text_type_main-medium'>
						Выполнено за сегодня:
					</div>
					<div className='text text_type_digits-large'>138</div>
				</div>
			</div>
		</main>
	);
}
