import React, { useCallback, useState } from 'react';
import styles from '@pages/profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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

	if (localStorage.authToken === undefined || user.name === null) {
		return <Navigate to='/login' replace />;
	}

	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<nav className='mr-15'>
					<ul className='mb-20'>
						<li>
							<Link to='/profile' className={`pt-4 pb-4 ${styles.active}`}>
								Профиль
							</Link>
						</li>
						<li>
							<Link to='/orders' className='pt-4 pb-4'>
								История заказов
							</Link>
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
					<form>
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
								<Button htmlType='button' type='secondary' size='medium'>
									Отмена
								</Button>
								<Button htmlType='button' type='primary' size='medium'>
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
