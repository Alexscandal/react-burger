import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from '@components/burger-contructor/burger-constructor.module.css';
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
import { updateCount } from '@/services/actions/ingredients.js';
import { setProduct } from '@/services/actions/ingredient.js';
import { addItem } from '@/services/actions/ingredients-constructor.js';

export const BurgerConstructor = (/*{ ingredients }*/) => {
	const { ingredients, product, products } = useSelector((store) => ({
		ingredients: store.cart.items,
		product: store.ingredient.product,
		products: store.ingredients.items,
	}));

	const [state, setState] = useState({
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

	const onDropHandler = (itemId) => {
		dispatch(updateCount(itemId.id));
		const found = products.find((item) => item._id === itemId.id);
		if (found !== undefined && found.type === 'bun') {
			dispatch(setProduct(itemId.id, products));
		} else {
			dispatch(addItem(itemId.id, products));
		}
	};

	const [, /*{isHover}*/ dropTopTarget] = useDrop({
		accept: 'bun',
		drop(itemId) {
			onDropHandler(itemId);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	const [, dropBottomTarget] = useDrop({
		accept: 'bun',
		drop(itemId) {
			onDropHandler(itemId);
		},
	});

	const [, dropCenterTarget] = useDrop({
		accept: ['sauce', 'main'],
		drop(itemId) {
			onDropHandler(itemId);
		},
	});

	const dispatch = useDispatch();

	return (
		<section className={styles.burger_constructor}>
			<div className='pl-8' ref={dropTopTarget}>
				{product === null && (
					<div
						className={`constructor-element constructor-element_pos_top ${styles.flex_center}`}>
						<div>Перетащите сюда булку</div>
					</div>
				)}
				{product !== null && (
					<ConstructorElement
						type='top'
						isLocked={true}
						text={product.name + '(верх)'}
						price={product.price}
						thumbnail={product.image_mobile}
					/>
				)}
			</div>
			<div
				className={`${appStyles.scroll} ${styles.scroll}`}
				ref={dropCenterTarget}>
				{ingredients.length === 0 && (
					<div className='pl-8 pt-4 pb-4'>
						<div className={`constructor-element ${styles.flex_center}`}>
							<div>Перетащите сюда инградиенты</div>
						</div>
					</div>
				)}
				<ul>
					{ingredients.map((item) => (
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
			<div className='pl-8' ref={dropBottomTarget}>
				{product === null && (
					<div
						className={`constructor-element constructor-element_pos_bottom ${styles.flex_center}`}>
						<div>Перетащите сюда булку</div>
					</div>
				)}
				{product !== null && (
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={product.name + '(низ)'}
						price={product.price}
						thumbnail={product.image_mobile}
					/>
				)}
			</div>
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
