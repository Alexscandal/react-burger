import styles from './app-header.module.css';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
	Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useResolvedPath } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

export const AppHeader = () => {
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const resolvedPath = useResolvedPath('');
	console.info(resolvedPath);
	return (
		<header className={styles.header}>
			<nav className={`${styles.menu} p-4`}>
				<div className={styles.menu_part_left}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							isActive ? styles.link_active + ' ' + styles.link : styles.link
						}>
						<BurgerIcon type='primary' />
						<p className='text text_type_main-default ml-2'>Конструктор</p>
					</NavLink>
					<NavLink to='/feed' className={`${styles.link} ml-10`}>
						<ListIcon type='secondary' />
						<p className='text text_type_main-default ml-2'>Лента заказов</p>
					</NavLink>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.link_position_last}>
					<NavLink
						to='/profile'
						className={({ isActive }) =>
							isActive ? styles.link_active + ' ' + styles.link : styles.link
						}>
						<ProfileIcon type='secondary' />
						<p className='text text_type_main-default ml-2'>
							{user.name ?? 'Личный кабинет'}
						</p>
					</NavLink>
				</div>
			</nav>
		</header>
	);
};
