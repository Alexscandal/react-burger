import appStyles from '@components/app/app.module.css';
import styles from '@pages/profile.module.css';
import { ProfileMenu } from '@components/profile-menu/profile-menu.tsx';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

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
							<Link to={'/profile/orders/1'} className='p-6'>
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
										{/* обратный порядок */}
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
							</Link>
						</li>
						<li className='mb-6'>
							<Link to={'/feed/1'} className='p-6'>
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
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}
