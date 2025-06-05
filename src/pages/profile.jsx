import React, { useState } from 'react';
import styles from '@pages/profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
	const [form, setValue] = useState({ name: '', email: '', password: '' });

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<nav className='mr-15'>
					<ul className='mb-20'>
						<li>
							<a href='/profile' className={`pt-4 pb-4 ${styles.active}`}>
								Профиль
							</a>
						</li>
						<li>
							<a href='/orders' className='pt-4 pb-4'>
								История заказов
							</a>
						</li>
						<li>
							<a href='/logout' className='pt-4 pb-4'>
								Выход
							</a>
						</li>
					</ul>
					<p>В этом разделе вы можете изменить свои персональные данные</p>
				</nav>
				<div>
					<form>
						<div className='mb-6'>
							<Input
								type={'text'}
								value={form.name}
								placeholder={'Имя'}
								name={'name'}
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
								error={false}
								//ref={inputRef}
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
							/>
						</div>
						<div className={`${styles.content_right} mb-20`}>
							<Button htmlType='button' type='secondary' size='medium'>
								Отмена
							</Button>
							<Button htmlType='button' type='primary' size='medium'>
								Сохранить
							</Button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
