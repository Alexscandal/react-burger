import React from 'react';
// eslint-disable-next-line postcss-modules/no-unused-class
import appStyles from '../app/app.module.css';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import {
	Counter,
	CurrencyIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.jsx';
import { Modal } from '@components/modal/modal/modal.jsx';

export const BurgerIngredients = ({ ingredients }) => {
	// eslint-disable-next-line import/no-named-as-default-member
	const [state, setState] = React.useState({
		modalOpened: false,
	});
	const categories = [
		{
			type: 'bun',
			name: 'Булки',
			active: true,
		},
		{
			type: 'sauce',
			name: 'Соусы',
			active: false,
		},
		{
			type: 'main',
			name: 'Начинки',
			active: false,
		},
	];
	//console.log(categories.length);
	// const openModal = (e) => {
	// 	setState({ ...state, modalOpened: true });
	// 	e.preventDefault();
	// };

	const closeModal = (e) => {
		setState({ ...state, modalOpened: false });
		e.preventDefault();
	};

	const item = {
		_id: '60666c42cc7b410027a1a9b1',
		name: 'Краторная булка N-200i',
		type: 'bun',
		proteins: 80,
		fat: 24,
		carbohydrates: 53,
		calories: 420,
		price: 1255,
		image: 'https://code.s3.yandex.net/react/code/bun-02.png',
		image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
		image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
		__v: 0,
	};

	const modal = (
		<Modal
			header='Детали ингредиента'
			isOpen={state.modalOpened}
			content={<IngradientDatails ingredient={item}></IngradientDatails>}
			onClose={closeModal}
		/>
	);

	const getProduct = (e) => {
		setState({ ...state, modalOpened: true, content: '88' });
		e.preventDefault();
	};

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					{categories.map((item) => (
						<Tab
							value={item.type}
							active={item.active}
							key={item.type}
							onClick={() => {}}>
							{item.name}
						</Tab>
					))}
				</ul>
			</nav>
			<div className={appStyles.scroll}>
				{categories.map((category) => (
					<div key={category.type}>
						<h2>{category.name}</h2>
						<ul>
							{ingredients
								.filter((item) => item.type.includes(category.type))
								.map((item) => (
									<li
										key={item._id}
										className={`${appStyles.positionRelative} pl-2 pr-2 mt-4 mb-4`}>
										<Counter count={1} size='default' extraClass='m-1' />
										<a
											href='/product/{item._id}'
											data-id={item._id}
											onClick={getProduct}>
											<img src={item.image} alt={item.name} />
											<div>
												<span className={appStyles.price}>{item.price}</span>
												<CurrencyIcon type='primary' className='ml-2' />
											</div>
											<p>{item.name}</p>
										</a>
									</li>
								))}
						</ul>
					</div>
				))}
			</div>
			{modal}
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
