import React, { useMemo, useState } from 'react';
import appStyles from '@components/app/app.module.css';
import styles from '@components/burger-ingredients/burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngradientBrief } from '@components/burger-ingredients/ingredient-brief/ingredient-brief.tsx';
import { useSelector } from '@/services/store.ts';
import { TIngradient } from '@utils/types.ts';

export const BurgerIngredients = () => {
	const [state, setState] = useState({
		modalOpened: false,
		modalContent: null,
		activeTab: 'bun',
	});

	const { ingredients, product, selected } = useSelector((store) => ({
		ingredients: store.ingredients.items,
		product: store.ingredient.product,
		selected: store.cart.items,
	}));

	type TCounts = {
		[key: string]: number;
	};

	const oCounts: null | TCounts = {};
	ingredients.forEach(function (item) {
		oCounts[`${item._id}`] = 0;
	});
	let indCounts = oCounts;

	useMemo(() => {
		indCounts = oCounts;
		if (product?._id !== null && product?._id !== undefined) {
			indCounts[product._id] = 1;
		}
		Object.entries(selected).forEach(([, item]: [string, TIngradient]) => {
			indCounts[`${item._id}`] = indCounts[`${item._id}`] + 1;
		});
	}, [product, selected, oCounts]);

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
	const onScroll: React.UIEventHandler<HTMLDivElement> = (
		e: React.UIEvent<HTMLDivElement, UIEvent>
	): void => {
		const top = e.currentTarget.getBoundingClientRect().top,
			items = e.currentTarget.querySelectorAll('h2');
		let range = e.currentTarget.getBoundingClientRect().bottom - top,
			tab: string | null = '';
		for (const item of items) {
			const item_range = Math.abs(
				item.closest('div')!.getBoundingClientRect().top - top
			);
			if (item_range < range) {
				range = item_range;
				tab = item.closest('div')!.getAttribute('id');
			}
		}
		setState({
			modalOpened: false,
			modalContent: null,
			activeTab: tab ? tab : '',
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
			<div className={appStyles.scroll} onScroll={onScroll}>
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
										<IngradientBrief item={item} counts={indCounts} />
									</li>
								))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
};
