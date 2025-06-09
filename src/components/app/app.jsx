import React, { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LoginPage } from '@pages/login.jsx';
import { AppHeader } from '@components/app-header/app-header.jsx';
import styles from '@components/app/app.module.css';
import { HomePage } from '@pages/home.jsx';
import { RegisterPage } from '@pages/register.jsx';
import { ForgotPasswordPage } from '@pages/forgot-password.jsx';
import { ResetPasswordPage } from '@pages/reset-password.jsx';
import { ProfilePage } from '@pages/profile.jsx';
import { NotFound } from '@pages/not-found.jsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.jsx';
import { useDispatch } from 'react-redux';
import { ProvideAuth } from '@/services/auth';
import { getUser } from '@/services/actions/auth.js';
import { Modal } from '@components/modal/modal/modal.jsx';
import { IngredientsDetails } from '@pages/ingredients-details.jsx';

export const App = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	const handleModalClose = () => {
		navigate(-1);
	};
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);
	console.info(background);

	return (
		<div className={styles.app}>
			<AppHeader />
			<ProvideAuth>
				<Routes location={background || location}>
					<Route path='/' element={<HomePage />} />
					<Route path='/ingredients/:id' element={<IngredientsDetails />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route
						path='/profile'
						element={<ProtectedRoute element={<ProfilePage />} />}
					/>
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
					<Route path='/reset-password' element={<ResetPasswordPage />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
				{background && (
					<Routes>
						<Route
							path='/ingredients/:id'
							element={
								<Modal
									onClose={handleModalClose}
									header='Детали ингредиента'
									isOpen={true}
									content={<IngredientsDetails />}
								/>
							}
						/>
					</Routes>
				)}
			</ProvideAuth>
		</div>
	);
};
