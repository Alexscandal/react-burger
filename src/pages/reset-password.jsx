import React, { useCallback, useState } from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '@/services/auth.jsx';
import { useSelector } from 'react-redux';

export function ResetPasswordPage() {
	const [form, setValue] = useState({ password: '', token: '' });
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	console.info('location', location.state);
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const reset = useCallback(
		(e) => {
			e.preventDefault();
			if (form.password === '' || form.token === '') {
				return false;
			}
			auth
				.setPassword(form)
				.then(() => {})
				.catch((err) => () => {
					alert(err.message);
				});
		},
		[auth, form]
	);
	if (
		location.state === null ||
		location.state.from.pathname !== '/forgot-password'
	) {
		return <Navigate to='/forgot-password' replace={true} />;
	}

	if (localStorage.authToken !== undefined && user.name !== null) {
		navigate('/', { replace: true });
	}

	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Восстановление пароля</h1>
				<form onSubmit={reset}>
					<div className='mb-6'>
						<PasswordInput
							name={'password'}
							value={form.password}
							placeholder={'Введите новый пароль'}
							onChange={onChange}
						/>
					</div>
					<div className='mb-6'>
						<Input
							type={'text'}
							placeholder={'Введите код из письма'}
							name={'token'}
							value={form.token}
							size={'default'}
							onChange={onChange}
						/>
					</div>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Сохранить
					</Button>
					<p>
						Вспомнили пароль? <Link to='/login'>Войти</Link>
					</p>
				</form>
			</div>
		</main>
	);
}
