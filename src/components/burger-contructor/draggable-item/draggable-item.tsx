import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { TIngradient } from '@utils/types.ts';

type TDraggableItem = {
	item: TIngradient;
	index: number;
	removeIngredient: (_id: string, index: number) => void;
	moveListItem: (dragIndex: number, hoverIndex: number) => void;
};

export const DraggableItem = ({
	item,
	index,
	removeIngredient,
	moveListItem,
}: TDraggableItem) => {
	const { ingredients } = useSelector((store) => ({
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		ingredients: store.cart.items,
	}));

	const [{ opacity }, dragRef] = useDrag({
		type: item.type,
		item: { item },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0 : 1,
		}),
	});

	const ref = useRef<HTMLLIElement | null>(null);

	const [, dropRef] = useDrop({
		accept: ['sauce', 'main'],
		hover: (
			item: { item: number; index: number },
			monitor: DropTargetMonitor<{ item: number; index: number }>
		) => {
			const dragIndex = ingredients.findIndex((i: number) => i === item.item);
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = hoverBoundingRect
				? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
				: null;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) {
				return;
			}
			const hoverActualY = hoverBoundingRect
				? clientOffset.y - hoverBoundingRect.top
				: clientOffset.y;

			if (
				hoverMiddleY === null ||
				(dragIndex < hoverIndex && hoverActualY < hoverMiddleY)
			)
				return;
			if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

			moveListItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	dragRef(dropRef(ref));

	return (
		<li
			className={'mt-4 mb-4'}
			data-id={item._id}
			style={{ opacity }}
			ref={ref}>
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
