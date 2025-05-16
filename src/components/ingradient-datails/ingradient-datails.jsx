import styles from './ingradient-datails.module.css';

export const IngradientDatails = ({ ingredient }) => {
	return (
		<div className={styles.product}>
			<img src={ingredient.image_large} alt={ingredient.name} />
			<h3 className='mt-4 mb-4'>{ingredient.name}</h3>
			<div className={`${styles.properties} pt-4`}>
				<div>
					<div>Калории,ккал</div>
					<div className={styles.value}>{ingredient.calories}</div>
				</div>
				<div className='ml-5'>
					<div>Белки, г</div>
					<div className={styles.value}>{ingredient.proteins}</div>
				</div>
				<div className='ml-5'>
					<div>Жиры, г</div>
					<div className={styles.value}>{ingredient.fat}</div>
				</div>
				<div className='ml-5'>
					<div>Углеводы, г</div>
					<div className={styles.value}>{ingredient.carbohydrates}</div>
				</div>
			</div>
		</div>
	);
};
