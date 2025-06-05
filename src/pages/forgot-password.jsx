import React from 'react';
import styles from '@pages/form.module.css';
import {
	Button,
	EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export function ForgotPasswordPage() {
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<h1>Восстановление пароля</h1>
				<form>
					<div className='mb-6'>
						<EmailInput
							placeholder={'Укажите e-mail'}
							name={'email'}
							error={false}
							errorText={'Ошибка'}
							size={'default'}
						/>
					</div>
					<Button
						htmlType='button'
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
