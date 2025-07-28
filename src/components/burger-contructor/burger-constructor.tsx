import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from '@/services/store.ts';
import { useDrop } from 'react-dnd';
import styles from '@components/burger-contructor/burger-constructor.module.css';
import appStyles from '@components/app/app.module.css';
import {
	Button,
	ConstructorElement,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal } from '@components/modal/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import { DraggableItem } from '@components/burger-contructor/draggable-item/draggable-item.tsx';
import { setProduct } from '@/services/actions/ingredient.ts';
import {
	addItem,
	removeItem,
	updateCost,
	updateItemPrice,
	swapIndex,
} from '@/services/actions/ingredients-constructor.ts';
import { orderCheckout } from '@/services/actions/order.ts';
import { useNavigate } from 'react-router-dom';
import { TIngradient } from '@utils/types.ts';

export const BurgerConstructor = () => {
	const { ingredients, product, products, cost, selected, orderNum, user } =
		useSelector((store) => ({
			ingredients: store.cart.items,
			selected: store.cart.items,
			cost: store.cart.cost,
			product: store.ingredient.product,
			products: store.ingredients.items,
			orderNum: store.order.orderNum,
			user: store.auth.user,
		}));

	type TItem = {
		id: string;
	};

	type TModalState = {
		modalOpened: boolean;
		modalContent: React.JSX.Element | null;
	};

	const navigate = useNavigate();

	const [state, setState] = useState<TModalState>({
		modalOpened: false,
		modalContent: null,
	});

	const dispatch = useDispatch();

	const closeModal = (e: { preventDefault: () => void }) => {
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

	const getOrder = (e: { preventDefault: () => void }) => {
		if (user.name === null) {
			navigate('/login');
		}
		if (product !== null) {
			const sel = [...selected, product, product];
			const ids = sel.map((item: TIngradient | undefined) => item?._id);
			dispatch(orderCheckout(ids));
			setState({ ...state, modalOpened: true, modalContent: <OrderDetails /> });
		}
		e.preventDefault();
	};

	const onDropHandler = (itemId: TItem): void => {
		const found = products.find((item: TIngradient) => item._id === itemId.id);
		if (found !== undefined && found.type === 'bun') {
			dispatch(setProduct(found));
			// set product price;
			dispatch(updateItemPrice(found.price));
		} else {
			dispatch(addItem(itemId.id, found!));
		}
		dispatch(updateCost());
	};

	const [, dropTopTarget] = useDrop({
		accept: 'bun',
		drop(itemId: TItem): void {
			onDropHandler(itemId);
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	const [, dropBottomTarget] = useDrop({
		accept: 'bun',
		drop(itemId: TItem) {
			onDropHandler(itemId);
		},
	});

	const [, dropCenterTarget] = useDrop({
		accept: ['sauce', 'main'],
		drop(itemId: TItem) {
			if (itemId.id !== undefined) {
				onDropHandler(itemId);
			}
		},
		collect: (monitor) => ({
			isHover: monitor.isOver(),
		}),
	});

	function removeIngredient(id: string, index: number) {
		dispatch(removeItem(id, index));
		dispatch(updateCost());
	}

	const moveListItem = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			const dragItem = ingredients[dragIndex];
			const hoverItem = ingredients[hoverIndex];
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
				{product !== null && product !== undefined && (
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
					{ingredients.map((item: TIngradient, index: number) => (
						<DraggableItem
							item={item}
							index={index}
							key={item.uid}
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
				{product !== null && product !== undefined && (
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
