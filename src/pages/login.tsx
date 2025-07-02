import React, { useCallback, useState } from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '@/services/auth.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export function LoginPage() {
	const [form, setValue] = useState({ email: '', password: '' });
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const auth = useAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const login = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			auth.signIn(form, 'auth/login');
		},
		[auth, dispatch, form, navigate]
	);
	if (localStorage.authToken !== undefined && user.name !== null) {
		navigate('/', { replace: true });
	}
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Вход</h1>
				<form onSubmit={login}>
					<div className='mb-6'>
						<EmailInput
							placeholder={'E-mail'}
							onChange={onChange}
							value={form.email}
							name={'email'}
							errorText={'Ошибка'}
							size={'default'}
						/>
					</div>
					<div className='mb-6'>
						<PasswordInput
							onChange={onChange}
							value={form.password}
							name={'password'}
							minLength={0}
						/>
					</div>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Войти
					</Button>
					<p className='mb-4'>
						Вы — новый пользователь?{' '}
						<Link to='/register'>Зарегистрироваться</Link>
					</p>
					<p>
						Забыли пароль?{' '}
						<Link to='/forgot-password'>Восстановить пароль</Link>
					</p>
				</form>
			</div>
		</main>
	);
}
