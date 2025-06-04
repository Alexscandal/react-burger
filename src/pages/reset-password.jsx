import React from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPasswordPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Восстановление пароля</h1>
				<form>
					<PasswordInput
						name={'password'}
						extraClass='mb-6'
						placeholder={'Введите новый пароль'}
						onChange={() => {}}
					/>
					<Input
						type={'text'}
						placeholder={'Введите код из письма'}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Сохранить
					</Button>
					<p>
						Вспомнили пароль? <a href='/login'>Войти</a>
					</p>
				</form>
			</div>
		</main>
	);
}
