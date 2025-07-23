import { Link, useLocation } from 'react-router-dom';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from '@components/app/app.module.css';
import { Order } from '@utils/live-orders.ts';
import { useSelector } from '@/services/store.ts';
import { TIngradient } from '@utils/types.ts';
type OrderBriefProps = {
	item: Order;
};

export const OrderBrief1 = ({ item }: OrderBriefProps) => {
	const location = useLocation();
	const { products } = useSelector((store) => ({
		products: store.ingredients.items,
	}));
	let cost = 0;
	let count_products = 0;
	const selected: TIngradient[] = [];
	if (item.ingredients.length > 0) {
		item.ingredients.map((id) => {
			const product = products.find((item) => item._id == id);
			if (product !== undefined) {
				selected.push(product);
				cost += product.price;
			}
		});
		count_products = selected.length;
	}
	const className =
		item.status === 'done'
			? appStyles.color_success
			: item.status === 'pending'
				? appStyles.color_danger
				: '';
	const status =
		item.status === 'done'
			? 'Готов'
			: item.status === 'created'
				? 'Готовится'
				: 'Отменен';

	return (
		<Link
			to={`/profile/orders/${item.number}`}
			state={{ background: location }}
			className='p-6'>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between} mb-6`}>
				<div className='text text_type_digits-default'>#{item.number}</div>
				<div className={appStyles.time}>
					<FormattedDate date={new Date(item.createdAt)} />
				</div>
			</div>
			<p className='text text_type_main-medium mb-2'>{item.name}</p>
			<p className={`${className} mb-6`}>{status}</p>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
				<div className={`${appStyles.d_flex} ${appStyles.block_images} ml-4`}>
					{/* обратный порядок */}
					{selected.slice(0, 6).map((product: TIngradient, index) => (
						<div>
							<img src={product.image_mobile} height='64' alt='' />
							{count_products > 6 && index === 0 && (
								<div className={appStyles.positionAbsolute}>
									+{count_products - 6}
								</div>
							)}
						</div>
					))}
				</div>
				<div
					className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
					<span className={`${appStyles.price} mr-2`}>{cost}</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</Link>
	);
};
