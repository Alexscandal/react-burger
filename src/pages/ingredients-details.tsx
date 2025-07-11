import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadData } from '@/services/actions/ingredients.ts';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.tsx';
import { AppDispatch, TIngradient } from '@utils/types.ts';

export function IngredientsDetails() {
	const dispatch = useDispatch<AppDispatch>();
	useEffect(() => {
		dispatch(loadData());
	}, [dispatch]);

	const { ingredients } = useSelector((store) => ({
		ingredients: store.ingredients.items,
	}));
	const { id } = useParams();
	if (ingredients.length > 0) {
		const ingredient = ingredients.find((item: TIngradient) => item._id === id);
		return <IngradientDatails ingredient={ingredient} />;
	}
}
