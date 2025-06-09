import React, { useCallback, useState } from 'react';
import styles from '@pages/profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/services/auth.jsx';

export function ProfilePage() {
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));

	const [form, setValue] = useState({
		name: user.name,
		email: user.email,
		password: user.password,
		changed: false,
	});

	const auth = useAuth();

	const navigate = useNavigate();

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const onKeyDown = () => {
		setValue({ ...form, changed: true });
	};

	const logout = useCallback(
		(e) => {
			e.preventDefault();
			auth.signOut(() => {
				navigate('/login', { replace: true });
			});
		},
		[auth]
	);

	const save = useCallback(
		(e) => {
			e.preventDefault();
			let data = {
				name: form.name,
				email: form.email,
			};
			if (form.password !== '') {
				data.password = form.password;
			}
			auth
				.saveUser(data, 'auth/user')
				.then((r) => console.info(r))
				.catch((err) => () => {
					alert(err.message);
				});
		},
		[auth, form]
	);

	const reset = (e) => {
		e.preventDefault();
		setValue({
			...form,
			name: user.name,
			email: user.email,
			password: '',
		});
	};

	if (localStorage.authToken === undefined || user.name === null) {
		return <Navigate to='/login' replace />;
	}

	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<nav className='mr-15'>
					<ul className='mb-20'>
						<li>
							<NavLink
								to='/profile'
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
					<p>В этом разделе вы можете изменить свои персональные данные</p>
				</nav>
				<div>
					<form id='userForm'>
						<div className='mb-6'>
							<Input
								type={'text'}
								value={form.name ?? ''}
								placeholder={'Имя'}
								name={'name'}
								error={false}
								errorText={'Ошибка'}
								size={'default'}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</div>
						<div className='mb-6'>
							<EmailInput
								placeholder={'E-mail'}
								name={'email'}
								value={form.email ?? ''}
								error={false}
								//ref={inputRef}
								errorText={'Ошибка'}
								size={'default'}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</div>
						<div className='mb-6'>
							<PasswordInput
								name={'password'}
								value={form.password ?? ''}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</div>
						{form.changed && (
							<div className={`${styles.content_right} mb-20`}>
								<Button
									htmlType='reset'
									type='secondary'
									size='medium'
									onClick={reset}>
									Отмена
								</Button>
								<Button
									htmlType='button'
									type='primary'
									size='medium'
									onClick={save}>
									Сохранить
								</Button>
							</div>
						)}
					</form>
				</div>
			</div>
		</main>
	);
}
