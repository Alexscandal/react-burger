import React, { useState, useEffect } from 'react';
// eslint-disable-next-line postcss-modules/no-unused-class
import styles from './app.module.css';
import { getIngredients } from '@utils/api.js';
import { loadData } from '@/services/actions/ingradients.js';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Modal } from '@components/modal/modal/modal.jsx';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/namespace

export const App = () => {
	const dispatch = useDispatch();

	const [state, setState] = useState({
		isLoading: false,
		hasError: false,
		data: [],
		product: null,
		modalOpened: false,
	});

	const ingradients = useSelector((store) => store.ingradients.items);

	useEffect(() => {
		if (!ingradients.length) {
			dispatch(loadData());
		}
	}, [dispatch, ingradients.length]);

	useEffect(() => {
		getIngredients()
			.then(
				(arr) => {
					setState({
						...state,
						data: arr,
						product: arr[0],
						isLoading: !(arr.length > 0),
					});
				}
				//
			)
			.catch(() =>
				setState({
					...state,
					hasError: true,
					isLoading: false,
				})
			);
	}, []);

	const closeModal = (e) => {
		setState({ ...state, modalOpened: false });
		e.preventDefault();
	};
	const modal = (
		<Modal
			header=''
			isOpen={state.modalOpened}
			content={state.modalContent}
			onClose={closeModal}
		/>
	);

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
						<BurgerIngredients
							ingredients={state.data}
							modal={modal}
							modalOpened={state.modalOpened}
						/>
						<BurgerConstructor
							ingredients={state.data}
							product={state.product}
						/>
					</>
				)}
			</main>
		</div>
	);
};
