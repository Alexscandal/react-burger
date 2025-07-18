import { useState } from 'react';
import { useDrag } from 'react-dnd';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from '@components/app/app.module.css';
import { Modal } from '@components/modal/modal/modal.tsx';
import { TIngradient } from '@utils/types.ts';
import { Link, useLocation } from 'react-router-dom';
type TIngradientData = {
	item: TIngradient;
};

export const IngradientBrief = ({ item }: TIngradientData) => {
	const [state, setState] = useState({
		modalOpened: false,
		modalContent: null,
		activeTab: 'bun',
	});

	const location = useLocation();

	const closeModal = (e: { preventDefault: () => void }) => {
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
			<Link to={`/ingredients/${item._id}`} state={{ background: location }}>
				<img src={item.image} alt={item.name} />
				<div>
					<span className={appStyles.price}>{item.price}</span>
					<CurrencyIcon type='primary' className='ml-2' />
				</div>
				<p>{item.name}</p>
			</Link>
			{modal}
		</div>
	);
};
