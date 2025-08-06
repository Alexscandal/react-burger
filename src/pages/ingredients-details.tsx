import { useParams } from 'react-router-dom';
import { useSelector } from '@/services/store.ts';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.tsx';
import { TIngradient } from '@utils/types.ts';
import { useEffect } from 'react';

export function IngredientsDetails() {
	const { id } = useParams();
	const { ingredients } = useSelector(
		(store: { ingredients: { items: TIngradient[] } }) => ({
			ingredients: store.ingredients.items,
		})
	);
	const ingredient =
		ingredients.length > 0
			? ingredients.find((item: TIngradient) => item._id === id)
			: null;
	useEffect(() => {
		document.title = ingredient?.name as string;
	});
	if (ingredients.length > 0) {
		return <IngradientDatails ingredient={ingredient!} />;
	}
}
