import { useParams } from 'react-router-dom';
import { useSelector } from '@/services/store.ts';
import { IngradientDatails } from '@components/ingradient-datails/ingradient-datails.tsx';
import { TIngradient } from '@utils/types.ts';

export function IngredientsDetails() {
	const { ingredients } = useSelector(
		(store: { ingredients: { items: TIngradient[] } }) => ({
			ingredients: store.ingredients.items,
		})
	);
	const { id } = useParams();
	if (ingredients.length > 0) {
		const ingredient = ingredients.find((item: TIngradient) => item._id === id);
		return <IngradientDatails ingredient={ingredient!} />;
	}
}
