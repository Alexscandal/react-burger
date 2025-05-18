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
import { Modal } from '@components/modal/modal/modal.jsx';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.jsx';

export const BurgerConstructor = ({ ingredients }) => {
	// eslint-disable-next-line import/no-named-as-default-member
	const [state, setState] = React.useState({
		modalOpened: false,
		modalContent: null,
	});

	const closeModal = (e) => {
		setState({ ...state, modalOpened: false });
		e.preventDefault();
	};

	const modal = (
		<Modal
			header=''
			isOpen={state.modalOpened}
			content={state.modalContent}
			onClose={closeModal}
		/>
	);

	const getProduct = (e, id) => {
		const item = ingredients.filter((item) => item._id === id);
		setState({
			...state,
			modalOpened: true,
			modalContent: (
				<IngradientDatails ingredient={item[0]}></IngradientDatails>
			),
		});
		e.preventDefault();
	};

	const getOrder = (e) => {
		setState({ ...state, modalOpened: true, modalContent: <OrderDetails /> });
		e.preventDefault();
	};

	return (
		<section className={styles.burger_constructor}>
			<div className={`${appStyles.scroll} mb-5`}>
				<ul>
					{ingredients.map((item) => (
						<li className={'mt-4 mb-4'} key={item._id}>
							<DragIcon type='primary' className='mr-2' />
							<div
								className={`${styles.burger_constructor_item} pt-4 pb-4 pr-4`}>
								<a
									href='/product'
									onClick={(e) => {
										getProduct(e, item._id);
									}}>
									<img src={item.image_mobile} alt={item.name} />
									<span className={styles.product_name}>{item.name}</span>
								</a>
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
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={getOrder}>
					Оформить заказ
				</Button>
			</div>
			{modal}
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
