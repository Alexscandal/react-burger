import { useCallback, useState } from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '@/services/auth.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from '@/services/store.ts';

export function RegisterPage() {
	const [form, setValue] = useState({ name: '', email: '', password: '' });
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const auth = useAuth();
	const navigate = useNavigate();

	const onChange = (e: { target: { name: string; value: string } }) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const register = useCallback(
		(e: { preventDefault: () => void }) => {
			e.preventDefault();
			auth.signIn(form, 'auth/register');
		},
		[auth, form]
	);
	if (localStorage.authToken !== undefined && user.name !== null) {
		navigate('/', { replace: true });
	}
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Регистрация</h1>
				<form onSubmit={register}>
					<div className='mb-6'>
						<Input
							type={'text'}
							name={'name'}
							value={form.name}
							placeholder={'Имя'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
							onChange={onChange}
						/>
					</div>
					<div className='mb-6'>
						<EmailInput
							placeholder={'E-mail'}
							name={'email'}
							value={form.email}
							errorText={'Ошибка'}
							size={'default'}
							onChange={onChange}
						/>
					</div>
					<div className='mb-6'>
						<PasswordInput
							name={'password'}
							value={form.password}
							onChange={onChange}
							minLength={5}
						/>
					</div>
					<Button
						htmlType='submit'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Зарегистрироваться
					</Button>
					<p>
						Уже зарегистрированы? <Link to='/login'>Войти</Link>
					</p>
				</form>
			</div>
		</main>
	);
}
