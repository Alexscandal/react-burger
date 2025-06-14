import React, { useState } from 'react';
import appStyles from '@components/app/app.module.css';
import styles from '@components/burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngradientBrief } from '@components/burger-ingredients/ingredient-brief/ingredient-brief.jsx';
import { useSelector } from 'react-redux';

export const BurgerIngredients = () => {
	const [state, setState] = useState({
		modalOpened: false,
		modalContent: null,
		activeTab: 'bun',
	});

	const { ingredients } = useSelector((store) => ({
		ingredients: store.ingredients.items,
	}));

	const categories = [
		{
			type: 'bun',
			name: 'Булки',
			active: state.activeTab === 'bun',
		},
		{
			type: 'sauce',
			name: 'Соусы',
			active: state.activeTab === 'sauce',
		},
		{
			type: 'main',
			name: 'Начинки',
			active: state.activeTab === 'main',
		},
	];
	/* activate tab on scroll */
	const closeOnEscapePressed = (e) => {
		const top = e.target.getBoundingClientRect().top,
			items = e.target.querySelectorAll('h2');
		let range = e.target.getBoundingClientRect().bottom - top,
			tab = '';
		for (let item of items) {
			let item_range = Math.abs(
				item.closest('div').getBoundingClientRect().top - top
			);
			if (item_range < range) {
				range = item_range;
				tab = item.closest('div').getAttribute('id');
			}
		}
		setState({
			activeTab: tab,
		});
	};
	/* /activate tab on scroll */
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
			<div className={appStyles.scroll} onScroll={closeOnEscapePressed}>
				{categories.map((category) => (
					<div key={category.type} id={category.type}>
						<h2>{category.name}</h2>
						<ul>
							{ingredients
								.filter((item) => item.type.includes(category.type))
								.map((item) => (
									<li
										key={item._id}
										className={`${appStyles.positionRelative} pl-2 pr-2 mt-4 mb-4`}>
										<IngradientBrief ingredients={ingredients} item={item} />
									</li>
								))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
};
