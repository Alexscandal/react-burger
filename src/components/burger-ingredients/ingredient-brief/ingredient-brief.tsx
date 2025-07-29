import { useDrag } from 'react-dnd';
import {
	Counter,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from '@components/app/app.module.css';
import { TIngradient } from '@utils/types.ts';
import { Link, useLocation } from 'react-router-dom';
type TIngradientData = {
	item: TIngradient;
	counts: object;
};

export const IngradientBrief = ({ item, counts }: TIngradientData) => {
	const location = useLocation();

	const id = item._id;

	const [{ opacity }, ref] = useDrag({
		type: item.type, // same as accept in burger-ingredients
		item: { id },
		collect: (monitor) => ({
			opacity: monitor.isDragging() ? 0.5 : 1,
		}),
	});

	let count = 0;
	//console.log('found', Object.keys(counts).filter((i) => i == item._id)[0]);
	Object.entries(counts).forEach(([key, value]) => {
		if (key === item._id) {
			//console.log(`${key}: ${value}`);
			count = value;
		}
	});

	return (
		<div style={{ opacity }} ref={ref} data-testid={item._id}>
			{count > 0 && <Counter count={count} size='default' extraClass='m-1' />}
			<Link to={`/ingredients/${item._id}`} state={{ background: location }}>
				<img src={item.image} alt={item.name} />
				<div>
					<span className={appStyles.price}>{item.price}</span>
					<CurrencyIcon type='primary' className='ml-2' />
				</div>
				<p>{item.name}</p>
			</Link>
		</div>
	);
};
