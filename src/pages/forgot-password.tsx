import React, { useCallback, useState } from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/services/auth.tsx';
import { useSelector } from '@/services/store.ts';

export function ForgotPasswordPage() {
	const [form, setValue] = useState({ email: '' });
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const forgot = useCallback(
		(e: React.FormEvent<HTMLFormElement>): false | undefined => {
			e.preventDefault();
			if (form.email === '') {
				return false;
			}
			auth
				.signIn(form, 'password-reset')
				.then(() => {})
				.catch(() => () => {});
			navigate('/reset-password', { state: { from: location } });
		},
		[auth, form]
	);

	if (localStorage.authToken !== undefined && user.name !== null) {
		navigate('/', { replace: true });
	}

	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Восстановление пароля</h1>
				<form onSubmit={forgot}>
					<div className='mb-6'>
						<EmailInput
							placeholder={'Укажите e-mail'}
							name={'email'}
							value={form.email}
							errorText={'Ошибка'}
							size={'default'}
							onChange={onChange}
						/>
					</div>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Восстановить
					</Button>
					<p>
						Вспомнили пароль? <Link to='/login'>Войти</Link>
					</p>
				</form>
			</div>
		</main>
	);
}
