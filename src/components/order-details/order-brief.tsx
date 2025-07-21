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

export const OrderBrief = ({ item }: OrderBriefProps) => {
	const location = useLocation();
	const { products } = useSelector((store) => ({
		products: store.ingredients.items,
	}));
	let cost = 0;
	let count_products = 0;
	let selected: TIngradient[] = [];
	if (item.ingredients.length > 0) {
		selected = products.filter((product) =>
			item.ingredients.includes(product._id)
		);
		console.info('selected', products);
		selected = selected.reverse();
		selected.forEach(function (item) {
			cost += item.price;
		});
		count_products = selected.length;
	}

	return (
		<Link
			to={`/feed/${item.number}`}
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
			<p className='mb-6'>{item.status}</p>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
				<div className={`${appStyles.d_flex} ${appStyles.block_images} ml-4`}>
					{/* обратный порядок */}
					{selected.map((product: TIngradient) => (
						<div>
							<img src={product.image_mobile} height='64' alt='' />
							{count_products > 0} &&
							<div className={appStyles.positionAbsolute}>+3</div>
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
