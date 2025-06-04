import React from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function RegisterPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Регистрация</h1>
				<form>
					<Input
						type={'text'}
						placeholder={'Имя'}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
					<EmailInput
						placeholder={'E-mail'}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass='mb-6'
					/>
					<PasswordInput
						name={'password'}
						extraClass='mb-6'
						onChange={() => {}}
					/>
					<Button
						htmlType='button'
						type='primary'
						size='medium'
						extraClass='mb-20'>
						Зарегистрироваться
					</Button>
					<p>
						Уже зарегистрированы? <a href='/login'>Войти</a>
					</p>
				</form>
			</div>
		</main>
	);
}
