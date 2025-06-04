import React from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Вход</h1>
				<form>
					<EmailInput
						placeholder={'E-mail'}
						//onChange={e => setValue(e.target.value)}
						//icon={'CurrencyIcon'}
						//value={value}
						name={'email'}
						error={false}
						//ref={inputRef}
						//onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
					<PasswordInput
						//onChange={onChange}
						//value={value}
						name={'password'}
						extraClass='mb-6'
					/>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'>
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
