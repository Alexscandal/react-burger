import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { loadData } from '@/services/actions/ingredients.js';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.tsx';
import { TIngradient } from '@utils/types.ts';

export function IngredientsDetails() {
	const dispatch = useDispatch();
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
