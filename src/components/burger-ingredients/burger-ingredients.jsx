import React from 'react';
import appStyles from '../app/app.module.css';
import styles from './burger-ingredients.module.css';
import * as PropTypes from 'prop-types';
import {
	Counter,
	CurrencyIcon,
	Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from '@utils/prop-types.js';

export const BurgerIngredients = ({ ingredients }) => {
	console.log(ingredients);

	return (
		<section className={styles.burger_ingredients}>
			<nav>
				<ul className={styles.menu}>
					<Tab value='bun' active={true} onClick={() => {}}>
						Булки
					</Tab>
					<Tab value='main' active={false} onClick={() => {}}>
						Начинки
					</Tab>
					<Tab value='sauce' active={false} onClick={() => {}}>
						Соусы
					</Tab>
				</ul>
			</nav>
			<div className={appStyles.scroll}>
				<ul>
					{ingredients.map((item) => (
						<li className={`${appStyles.positionRelative} pl-2 pr-2 mt-4 mb-4`}>
							<Counter count={1} size='default' extraClass='m-1' />
							<img src={item.image} alt={item.name} />
							<div>
								<span className={appStyles.price}>{item.price}</span>
								<CurrencyIcon type='primary' className='ml-2' />
							</div>
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
