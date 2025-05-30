import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { ingredientPropType } from '@utils/prop-types.js';
import PropTypes from 'prop-types';

export const DraggableItem = ({
	item,
	index,
	removeIngredient,
	moveListItem,
}) => {
	const { ingredients } = useSelector((store) => ({
		ingredients: store.cart.items,
	}));

	const [{ opacity }, dragRef] = useDrag({
		type: item.type,
		item: { item },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	const [, dropRef] = useDrop({
		accept: ['sauce', 'main'],
		hover: (item, monitor) => {
			const dragIndex = ingredients.findIndex((i) => i === item.item);
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveListItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const ref = useRef(null);
	const dragDropRef = dragRef(dropRef(ref));

	return (
		<li
			className={'mt-4 mb-4'}
			data-id={item._id}
			style={{ opacity }}
			ref={dragDropRef}>
			<DragIcon type='primary' className='mr-2' />
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				handleClose={() => {
					removeIngredient(item._id, index);
				}}
			/>
		</li>
	);
};

DraggableItem.propTypes = {
	item: ingredientPropType.isRequired,
	// eslint-disable-next-line import/no-named-as-default-member
	removeIngredient: PropTypes.func,
	// eslint-disable-next-line import/no-named-as-default-member
	moveListItem: PropTypes.func,
	// eslint-disable-next-line import/no-named-as-default-member
	index: PropTypes.number.isRequired,
};
