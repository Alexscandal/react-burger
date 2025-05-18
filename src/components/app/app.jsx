import React from 'react';
// eslint-disable-next-line postcss-modules/no-unused-class
import styles from './app.module.css';
import { getIngredients } from '@utils/api.js';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import { Modal } from '@components/modal/modal/modal.jsx';

export const App = () => {
	// eslint-disable-next-line import/no-named-as-default-member
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: [],
		modalOpened: false,
	});
	// eslint-disable-next-line import/no-named-as-default-member
	React.useEffect(() => {
		getIngredients().then((arr) =>
			setState({ ...state, data: arr, isLoading: !(arr.length > 0) })
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
						<BurgerConstructor ingredients={state.data} />
					</>
				)}
			</main>
		</div>
	);
};
