import React from 'react';
import styles from './burger-constructor.module.css';
import * as PropTypes from 'prop-types';
import { ingredientPropType } from '@utils/prop-types.js';
import appStyles from '@components/app/app.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal/modal.jsx';
import { OrderDetails } from '@components/order-details/order-details.jsx';

export const BurgerConstructor = ({ ingredients, product }) => {
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

	const getOrder = (e) => {
		setState({ ...state, modalOpened: true, modalContent: <OrderDetails /> });
		e.preventDefault();
	};

	console.log(product);

	return (
		<section className={styles.burger_constructor}>
			{product !== null && (
				<div className='pl-8'>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={product.name + '(верх)'}
						price={product.price}
						thumbnail={product.image_mobile}
					/>
				</div>
			)}
			<div className={`${appStyles.scroll} ${styles.scroll}`}>
				<ul>
					{ingredients
						.filter((item) => item.type.includes('main'))
						.map((item) => (
							<li className={'mt-4 mb-4'} key={item._id}>
								<DragIcon type='primary' className='mr-2' />
								<ConstructorElement
									text={item.name}
									price={item.price}
									thumbnail={item.image_mobile}
								/>
							</li>
						))}
				</ul>
			</div>
			{product !== null && (
				<div className='pl-8'>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={product.name + '(низ)'}
						price={product.price}
						thumbnail={product.image_mobile}
					/>
				</div>
			)}
			<div className={`${styles.order_action} pt-10 pr-8`}>
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
