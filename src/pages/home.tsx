import { useEffect } from 'react';
import { useDispatch, useSelector } from '@/services/store';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import appStyles from '@components/app/app.module.css';
import styles from '@pages/home.module.css';
import { loadData } from '@/services/actions/ingredients.ts';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients.tsx';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor.tsx';
export const HomePage = () => {
	const dispatch = useDispatch();

	const { hasError, isLoading } = useSelector((store) => ({
		ingredients: store.ingredients.items,
		hasError: store.ingredients.hasError,
		isLoading: store.ingredients.isLoading,
	}));

	useEffect(() => {
		dispatch(loadData());
	}, [dispatch]);

	return (
		<>
			<h1
				className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
				Соберите бургер
			</h1>
			<main className={`${appStyles.main} pl-5 pr-5`}>
				{isLoading && 'Загрузка...'}
				{hasError && 'Произошла ошибка'}
				{!isLoading && !hasError && (
					<DndProvider backend={HTML5Backend}>
						<BurgerIngredients />
						<BurgerConstructor />
					</DndProvider>
				)}
			</main>
		</>
	);
};
