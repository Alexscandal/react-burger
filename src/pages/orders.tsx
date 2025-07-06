import styles from '@pages/profile.module.css';
import { ProfileMenu } from '@components/profile-menu/profile-menu.tsx';

export function OrdersPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<ProfileMenu />
				<div></div>
			</div>
		</main>
	);
}
