import { Link } from 'react-router-dom';
import styles from '@pages/form.module.css';

export function NotFound() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Страница не найдена</h1>
				<p>
					<Link to='/'>На главную</Link>
				</p>
			</div>
		</main>
	);
}
