import React, { useCallback, useState } from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '@/services/auth.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/services/actions/auth.js';

export function LoginPage() {
	const [form, setValue] = useState({ email: '', password: '' });
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const auth = useAuth();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const login = useCallback(
		(e) => {
			e.preventDefault();
			auth
				.signIn(form, 'auth/login')
				.then(() => {
					dispatch(setUser(form));
				})
				.catch((err) => () => {
					alert(err.message);
				});
		},
		[auth, dispatch, form, navigate]
	);
	if (localStorage.authToken !== undefined && user.name !== null) {
		navigate('/', { replace: true });
		//return <Navigate to='/' state={{ from: location }} replace />;
	}
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Вход</h1>
				<form>
					<div className='mb-6'>
						<EmailInput
							placeholder={'E-mail'}
							onChange={onChange}
							value={form.email}
							name={'email'}
							error={false}
							//ref={inputRef}
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
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'
						onClick={login}>
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
