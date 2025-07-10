import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from '@components/app/app.module.css';

export const OrderBrief = () => {
	const location = useLocation();

	return (
		<Link to={'/feed/1'} state={{ background: location }} className='p-6'>
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
				<div className={`${appStyles.d_flex} ${appStyles.block_images} ml-4`}>
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
	);
};
