import React from 'react';
// eslint-disable-next-line postcss-modules/no-unused-class
import styles from './app.module.css';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';

export const App = () => {
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: [],
	});

	React.useEffect(() => {
		setState({ ...state, hasError: false, isLoading: true });
		fetch('https://norma.nomoreparties.space/api/ingredients')
			.then((res) => res.json())
			.then((data) => {
				setState({ ...state, data: data.data, isLoading: false });
			})
			.catch(() => {
				setState({ ...state, hasError: true, isLoading: false });
			});
	}, []);

	return (
		<div className={styles.app}>
			<AppHeader />
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${styles.main} pl-5 pr-5`}>
				{state.isLoading && 'Загрузка...'}
				{state.hasError && 'Произошла ошибка'}
				{!state.isLoading && !state.hasError /* && state.data.length*/ && (
					<>
						<BurgerIngredients ingredients={state.data} />
						<BurgerConstructor ingredients={state.data} />
					</>
				)}
			</main>
		</div>
	);
};
