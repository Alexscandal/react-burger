import appStyles from '@components/app/app.module.css';
import styles from './order-details.module.css';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@/services/store.ts';
import { getOrdersAll } from '@/services/live-orders-all/slice.ts';
import { Order as OrderType } from '@utils/live-orders.ts';
import { TSelected } from '@utils/types.ts';
import { getOrder } from '@utils/api.ts';
import { storeOrder } from '@/services/order/actions.ts';
import { orderFromStore, TOrderStore } from '@/services/order/slice.ts';

export const Order = ({ modal }: { modal: boolean }): React.JSX.Element => {
	const dispatch = useDispatch();
	const orders = useSelector(getOrdersAll);
	const order: TOrderStore = useSelector(orderFromStore);
	const { products } = useSelector((store) => ({
		products: store.ingredients.items,
	}));
	const items: OrderType[] =
		orders.orders != undefined && orders.orders.length ? orders.orders : [];
	let foundOrder: OrderType | undefined = {
		_id: '',
		name: '',
		status: '',
		number: 0,
		createdAt: '',
		updatedAt: '',
		ingredients: [],
		id: 0,
	};
	let cost = 0;
	const aSelected: TSelected[] = [];
	const { number } = useParams();
	let className = '',
		status = '';
	if (items.length > 0) {
		foundOrder = items.find((item) => item.number === Number(number));
		dispatch(storeOrder(foundOrder!));
	}
	if (order.order.number === 0 && !modal) {
		getOrder(Number(number))
			.then((data) => {
				if (data.length > 0) {
					foundOrder = data[0];
					dispatch(storeOrder(foundOrder));
				}
			})
			.catch(() => {});
	}
	if (order.order.number != undefined && order.order.number != 0) {
		foundOrder = order.order;
	}

	//console.info('order', order.order);
	if (foundOrder !== undefined) {
		className =
			foundOrder.status === 'done'
				? appStyles.color_success
				: foundOrder.status === 'pending'
					? appStyles.color_danger
					: '';
		status =
			foundOrder.status === 'done'
				? 'Готов'
				: foundOrder.status === 'created'
					? 'Готовится'
					: 'Отменен';
		if (foundOrder.ingredients.length > 0) {
			foundOrder?.ingredients.map((id) => {
				const product = products.find((item) => item._id == id);
				if (aSelected.find((item) => item.id == id) === undefined) {
					aSelected.push({
						id: id,
						count: 1,
						product: product,
					});
				} else {
					const index = aSelected.findIndex((item) => item.id == id);
					aSelected[index].count++;
				}
				cost += product !== undefined ? product.price : 0;
			});
		}

		return (
			<div className={styles.order_content}>
				<p
					className={
						modal
							? `${appStyles.text_center} text text_type_digits-default mt-5 mb-10`
							: 'text text_type_digits-default mb-10'
					}>
					#{foundOrder.number}
				</p>
				<p className='text text_type_main-medium mb-3'>{foundOrder?.name}</p>
				<div className={`${className} mb-15`}>{status}</div>
				<p className='text text_type_main-medium mb-6'>Состав:</p>
				<div className={appStyles.scroll}>
					{aSelected.map((item: TSelected) => (
						<div
							className={`${appStyles.d_flex} mb-6`}
							key={item.product?._id + '_' + foundOrder?.number}>
							<div className={`${appStyles.image} mr-4`}>
								<img src={item.product?.image_mobile} height='64' alt='' />
							</div>
							<div
								className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center} ${appStyles.flex_grow}`}>
								{item.product?.name}
							</div>
							<div
								className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
								<span className='mr-2'>
									{item.count} x {item.product?.price}
								</span>
								<CurrencyIcon type='primary' />
							</div>
						</div>
					))}
				</div>
				<div
					className={`${appStyles.d_flex} ${appStyles.justify_content_between} mt-4`}>
					<div className={appStyles.time}>
						{foundOrder && (
							<FormattedDate date={new Date(foundOrder?.createdAt)} />
						)}
					</div>
					<div
						className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
						<span className='text text_type_digits-default mr-2'>{cost}</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.order} ${styles.loaderContent}`}>
			<p>order number: {order.order.number}</p>
			<span className={styles.loader}></span>
		</div>
	);
};
