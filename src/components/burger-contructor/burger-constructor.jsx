import React, { useCallback, useState } from 'react';
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
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal/modal.jsx';
import { OrderDetails } from '@components/order-details/order-details.jsx';
import { DraggableItem } from '@components/burger-contructor/draggable-item/draggable-item.jsx';
import { reduceCount, updateCount } from '@/services/actions/ingredients.js';
import { setProduct } from '@/services/actions/ingredient.js';
import {
	addItem,
	removeItem,
	updateCost,
	updateItemPrice,
	swapIndex,
} from '@/services/actions/ingredients-constructor.js';
import { orderCheckout } from '@/services/actions/order.js';

export const BurgerConstructor = () => {
	const { ingredients, product, products, cost, selected, orderNum } =
		useSelector((store) => ({
			ingredients: store.cart.items,
			selected: store.cart.items,
			cost: store.cart.cost,
			product: store.ingredient.product,
			products: store.ingredients.items,
			orderNum: store.order.orderNum,
		}));

	const [state, setState] = useState({
		modalOpened: false,
		modalContent: null,
	});

	const dispatch = useDispatch();

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
		if (product !== null) {
			let sel = selected.concat([product]);
			console.info(
				'ids',
				selected.map((item) => item._id)
			);
			dispatch(orderCheckout(sel.map((item) => item._id)));
			setState({ ...state, modalOpened: true, modalContent: <OrderDetails /> });
		}
		e.preventDefault();
	};

	const onDropHandler = (itemId) => {
		dispatch(updateCount(itemId.id));
		const found = products.find((item) => item._id === itemId.id);
		if (found !== undefined && found.type === 'bun') {
			dispatch(setProduct(itemId.id, products));
			// set product price;
			dispatch(updateItemPrice(found.price));
		} else {
			dispatch(addItem(itemId.id, products));
		}
		dispatch(updateCost());
	};

	const [, dropTopTarget] = useDrop({
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
			if (itemId.id !== undefined) {
				onDropHandler(itemId);
			}
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	function removeIngredient(id, index) {
		dispatch(reduceCount(id));
		dispatch(removeItem(id, index));
		dispatch(updateCost());
	}

	const moveListItem = useCallback(
		(dragIndex, hoverIndex) => {
			const dragItem = ingredients[dragIndex];
			const hoverItem = ingredients[hoverIndex];
			// Swap places of dragItem and hoverItem in the pets array
			if (hoverItem !== undefined && dragItem !== undefined) {
				dispatch(swapIndex(dragIndex, hoverIndex, hoverItem, dragItem));
			}
		},
		[dispatch, ingredients]
	);

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
					{ingredients.map((item, index) => (
						<DraggableItem
							item={item}
							index={index}
							key={item.id + '_' + index}
							removeIngredient={() => removeIngredient(item._id, index)}
							moveListItem={moveListItem}
						/>
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
			{cost > 0 && product !== null && (
				<div className={`${styles.order_action} pt-10 pr-8`}>
					<span className={appStyles.price}>{cost}</span>
					<CurrencyIcon type='primary' className='ml-2 mr-5' />
					<Button
						htmlType='button'
						type='primary'
						size='large'
						onClick={getOrder}>
						Оформить заказ
					</Button>
				</div>
			)}
			{orderNum && modal}
		</section>
	);
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
