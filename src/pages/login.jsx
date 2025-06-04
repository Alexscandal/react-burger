import React, { useCallback, useState } from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '@/services/auth.jsx';

export function LoginPage() {
	const [form, setValue] = useState({ email: '', password: '' });
	const auth = useAuth();

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const login = useCallback(
		(e) => {
			e.preventDefault();
			auth.signIn(form);
		},
		[auth, form]
	);
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Вход</h1>
				<form>
					<EmailInput
						placeholder={'E-mail'}
						onChange={onChange}
						name={'email'}
						error={false}
						//ref={inputRef}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
					<PasswordInput
						onChange={onChange}
						name={'password'}
						extraClass='mb-6'
					/>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'
						onClick={login}>
						Войти
					</Button>
					<p extraClass='mb-4'>
						Вы — новый пользователь? <a href='/register'>Зарегистрироваться</a>
					</p>
					<p>
						Забыли пароль? <a href='/forgot-password'>Восстановить пароль</a>
					</p>
				</form>
			</div>
		</main>
	);
}
