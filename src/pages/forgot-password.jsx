import React from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Восстановление пароля</h1>
				<form>
					<EmailInput
						placeholder={'Укажите e-mail'}
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
						Восстановить
					</Button>
					<p>
						Вспомнили пароль? <a href='/login'>Войти</a>
					</p>
				</form>
			</div>
		</main>
	);
}
