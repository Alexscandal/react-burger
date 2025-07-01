import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from '@components/app/app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.tsx';
import { ProvideAuth } from '@/services/auth';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { getUser } from '@/services/actions/auth.js';
import { Modal } from '@components/modal/modal/modal.tsx';
import { LoginPage } from '@pages/login.tsx';
import { HomePage } from '@pages/home.tsx';
import { RegisterPage } from '@pages/register.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password.tsx';
import { ResetPasswordPage } from '@pages/reset-password.tsx';
import { ProfilePage } from '@pages/profile.tsx';
import { NotFound } from '@pages/not-found.tsx';
import { IngredientsDetails } from '@pages/ingredients-details.tsx';
import { OrdersPage } from '@pages/orders.tsx';

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
					<Route
						path='/profile/orders'
						element={<ProtectedRoute element={<OrdersPage />} />}
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
