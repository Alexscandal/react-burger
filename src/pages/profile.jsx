import React, { useCallback, useState } from 'react';
import styles from '@pages/profile.module.css';
import {
	Button,
	EmailInput,
	Input,
	PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { useAuth } from '@/services/auth.jsx';
import { ProfileMenu } from '@components/profile-menu/profile-menu.jsx';

export function ProfilePage() {
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));

	const [form, setValue] = useState({
		name: user.name,
		email: user.email,
		password: user.password,
		changed: false,
	});

	const auth = useAuth();

	const onChange = (e) => {
		setValue({ ...form, [e.target.name]: e.target.value });
	};

	const onKeyDown = () => {
		setValue({ ...form, changed: true });
	};

	const save = useCallback(
		(e) => {
			e.preventDefault();
			let data = {
				name: form.name,
				email: form.email,
			};
			if (form.password !== '') {
				data.password = form.password;
			}
			auth
				.saveUser(data, 'auth/user')
				.then((r) => console.info(r))
				.catch(() => () => {});
		},
		[auth, form]
	);

	const reset = (e) => {
		e.preventDefault();
		setValue({
			...form,
			name: user.name,
			email: user.email,
			password: '',
			changed: false,
		});
	};
	return (
		<main className={`${styles.main} pl-5 pr-5`}>
			<div>
				<ProfileMenu />
				<div>
					<form id='userForm' onSubmit={save}>
						<div className='mb-6'>
							<Input
								type={'text'}
								value={form.name ?? ''}
								placeholder={'Имя'}
								name={'name'}
								error={false}
								errorText={'Ошибка'}
								size={'default'}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</div>
						<div className='mb-6'>
							<EmailInput
								placeholder={'E-mail'}
								name={'email'}
								value={form.email ?? ''}
								error={false}
								errorText={'Ошибка'}
								size={'default'}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</div>
						<div className='mb-6'>
							<PasswordInput
								name={'password'}
								value={form.password ?? ''}
								onChange={onChange}
								onKeyDown={onKeyDown}
							/>
						</div>
						{form.changed && (
							<div className={`${styles.content_right} mb-20`}>
								<Button
									htmlType='reset'
									type='secondary'
									size='medium'
									onClick={reset}>
									Отмена
								</Button>
								<Button htmlType='submit' type='primary' size='medium'>
									Сохранить
								</Button>
							</div>
						)}
					</form>
				</div>
			</div>
		</main>
	);
}
