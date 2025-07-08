import appStyles from '@components/app/app.module.css';
import styles from '@pages/feed.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function FeedPage() {
	return (
		<main className={`${styles.main} pt-5 pb-5`}>
			<h1>Лента заказов</h1>
			<div
				className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
				<div>
					<ul className={`${appStyles.scroll} ${appStyles.feed}`}>
						<li className='p-6 mb-6'>
							<div
								className={`${appStyles.d_flex} ${appStyles.justify_content_between} mb-6`}>
								<div className='text text_type_digits-default'>#034535</div>
								<div className={appStyles.time}>Сегодня, 16:20</div>
							</div>
							<p className='text text_type_main-medium mb-2'>
								Death Star Starship Main бургер
							</p>
							<p className='mb-6'>Создан</p>
							<div
								className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
								<div
									className={`${appStyles.d_flex} ${appStyles.block_images} ml-4`}>
									/* обратный порядок */
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
										<div className={appStyles.positionAbsolute}>+3</div>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-01-mobile.png'
											height='64'
											alt=''
										/>
									</div>
								</div>
								<div
									className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
									<span className={`${appStyles.price} mr-2`}>560</span>
									<CurrencyIcon type='primary' />
								</div>
							</div>
						</li>
						<li className='p-6 mb-6'>
							<div
								className={`${appStyles.d_flex} ${appStyles.justify_content_between} mb-6`}>
								<div className='text text_type_digits-default'>#034535</div>
								<div className={appStyles.time}>Сегодня, 16:20</div>
							</div>
							<p className='text text_type_main-medium mb-2'>
								Death Star Starship Main бургер
							</p>
							<p className={`${appStyles.color_success} mb-6`}>Выполнен</p>
							<div
								className={`${appStyles.d_flex} ${appStyles.justify_content_between}`}>
								<div
									className={`${appStyles.d_flex} ${appStyles.block_images} ml-4`}>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
										<div className={appStyles.positionAbsolute}>+3</div>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-04-mobile.png'
											height='64'
											alt=''
										/>
									</div>
									<div>
										<img
											src='https://code.s3.yandex.net/react/code/meat-01-mobile.png'
											height='64'
											alt=''
										/>
									</div>
								</div>
								<div
									className={`${appStyles.d_flex} ${appStyles.justify_content_between} ${appStyles.align_items_center}`}>
									<span className={`${appStyles.price} mr-2`}>560</span>
									<CurrencyIcon type='primary' />
								</div>
							</div>
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
