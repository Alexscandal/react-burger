import appStyles from '@components/app/app.module.css';
import styles from '@pages/profile.module.css';
import { ProfileMenu } from '@components/profile-menu/profile-menu.tsx';
import { OrderBrief } from '@components/order-details/order-brief.tsx';

export function OrdersPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<div className={`${styles.content_left} ${styles.left_side} mr-15`}>
					<ProfileMenu />
					<p>В этом разделе вы можете просмотреть свою историю заказов</p>
				</div>
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
			</div>
		</main>
	);
}
