import React from 'react';
import styles from '@pages/profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
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
					</form>
				</div>
			</div>
		</main>
	);
}
