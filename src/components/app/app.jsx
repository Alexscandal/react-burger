import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@pages/login.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import styles from '@components/app/app.module.css';
import { HomePage } from '@pages/home.jsx';
import { RegisterPage } from '@pages/register.jsx';
import { ForgotPasswordPage } from '@pages/forgot-password.jsx';
import { ResetPasswordPage } from '@pages/reset-password.jsx';
import { ProfilePage } from '@pages/profile.jsx';
import { NotFound } from '@pages/not-found.jsx';
import { ProvideAuth } from '@/services/auth';
export const App = () => {
	return (
		<div className={styles.app}>
			<AppHeader />
			<ProvideAuth>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/profile' element={<ProfilePage />} />
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
					<Route path='/reset-password' element={<ResetPasswordPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</ProvideAuth>
		</div>
	);
};
