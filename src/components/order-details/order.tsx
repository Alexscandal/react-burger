import appStyles from '@components/app/app.module.css';
import styles from './order-details.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const Order = () => {
	return (
		<div className={styles.order_content}>
			<p
				className={`${appStyles.text_center} text text_type_digits-default mb-10`}>
				#034533
			</p>
			<p className='text text_type_main-medium mb-3'>
				Black Hole Singularity острый бургер
			</p>
			<div className={`${appStyles.color_success} mb-15`}>Выполнен</div>
			<p className='text text_type_main-medium mb-6'>Состав:</p>
			<div className={appStyles.scroll}>
				<div className={`${appStyles.d_flex} mb-6`}>
					<div className={`${appStyles.image} mr-4`}>
						<img
							src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
							height='64'
							alt=''
						/>
					</div>
					<div
						className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center} ${appStyles.flex_grow}`}>
						Флюоресцентная булка R2-D3
					</div>
					<div
						className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
						<span className='mr-2'>2 x 20</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
				<div className={`${appStyles.d_flex} mb-6`}>
					<div className={`${appStyles.image} mr-4`}>
						<img
							src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
							height='64'
							alt=''
						/>
					</div>
					<div
						className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center} ${appStyles.flex_grow}`}>
						Флюоресцентная булка R2-D3
					</div>
					<div
						className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
						<span className='mr-2'>2 x 20</span>
						<CurrencyIcon type='primary' />
					</div>
				</div>
			</div>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between} mt-4`}>
				<div className={appStyles.time}>Вчера, 13:50</div>
				<div
					className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
					<span className='text text_type_digits-default mr-2'>510</span>
					<CurrencyIcon type='primary' />
				</div>
			</div>
		</div>
	);

	return (
		<div className={`${styles.order} ${styles.loaderContent}`}>
			<span className={styles.loader}></span>
		</div>
	);
};
