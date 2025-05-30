import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from '@components/app/app.module.css';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.jsx';
import { Modal } from '@components/modal/modal/modal.jsx';
import { ingredientPropType } from '@utils/prop-types.js';

export const IngradientBrief = ({ ingredients, item }) => {
	const [state, setState] = useState({
		modalOpened: false,
		modalContent: null,
		activeTab: 'bun',
	});

	const closeModal = (e) => {
		setState({ ...state, modalOpened: false });
		e.preventDefault();
	};

	const modal = (
		<Modal
			header='Детали ингредиента'
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

	const id = item._id;

	const [{ opacity }, ref] = useDrag({
		type: item.type, // same as accept in burger-ingredients
		item: { id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	return (
		<div style={{ opacity }} ref={ref}>
			{item.count > 0 && (
				<Counter count={item.count} size='default' extraClass='m-1' />
			)}
			<a
				href='/product'
				onClick={(e) => {
					getProduct(e, item._id);
				}}>
				<img src={item.image} alt={item.name} />
				<div>
					<span className={appStyles.price}>{item.price}</span>
					<CurrencyIcon type='primary' className='ml-2' />
				</div>
				<p>{item.name}</p>
			</a>
			{modal}
		</div>
	);
};

IngradientBrief.propTypes = {
	item: ingredientPropType.isRequired,
};
