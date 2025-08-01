import { Link, NavLink } from 'react-router-dom';
import styles from '@pages/profile.module.css';
import { useCallback } from 'react';
import { useAuth } from '@/services/auth.tsx';

export const ProfileMenu = () => {
	const auth = useAuth();
	const logout = useCallback(
		(e: { preventDefault: () => void }) => {
			e.preventDefault();
			auth.signOut();
		},
		[auth]
	);

	return (
		<nav>
			<ul className='mb-20 text text_type_main-medium'>
				<li>
					<NavLink
						to='/profile'
						end
						className={({ isActive }) =>
							isActive ? styles.active + ' pt-4 pb-4' : 'pt-4 pb-4'
						}>
						Профиль
					</NavLink>
				</li>
				<li>
					<NavLink
						to='/profile/orders'
						className={({ isActive }) =>
							isActive ? styles.active + ' pt-4 pb-4' : 'pt-4 pb-4'
						}>
						История заказов
					</NavLink>
				</li>
				<li>
					<Link to='/logout' className='pt-4 pb-4' onClick={logout}>
						Выход
					</Link>
				</li>
			</ul>
		</nav>
	);
};
