import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import appStyles from '@components/app/app.module.css';
import {
	Button,
	CurrencyIcon,
	DeleteIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ ingredients }) => {
	console.log(ingredients.length);

	return (
		<section className={styles.burger_constructor}>
			<div className={`${appStyles.scroll} mb-5`}>
				<ul>
					{ingredients.map((item) => (
						<li className={'mt-4 mb-4'} key={item._id}>
							<DragIcon type='primary' className='mr-2' />
							<div
								className={`${styles.burger_constructor_item} pt-4 pb-4 pr-4`}>
								<div>
									<img src={item.image_mobile} alt={item.name} />
									<span className={styles.product_name}>{item.name}</span>
								</div>
								<div>
									<div>
										<span className={appStyles.price}>{item.price}</span>
										<CurrencyIcon type='primary' className='ml-2' />
									</div>
									<a href='/'>
										<DeleteIcon type='primary' className='ml-5 mr-4' />
									</a>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className={`${styles.order_action} pt-5`}>
				<span className={appStyles.price}>610</span>
				<CurrencyIcon type='primary' className='ml-2 mr-5' />
				<Button htmlType='button' type='primary' size='large'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
