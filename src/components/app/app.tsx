import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '@/services/store.ts';
import styles from '@components/app/app.module.css';
import { AppHeader } from '@components/app-header/app-header.tsx';
import { ProtectedRoute } from '@components/protected-route/protected-route.tsx';
import { ProvideAuth } from '@/services/auth';
import { getUser } from '@/services/actions/auth.ts';
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
import { FeedPage } from '@pages/feed.tsx';
import { OrderPage } from '@pages/order.tsx';

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
					<Route path='/feed' element={<FeedPage />} />
					<Route path='/feed/:number' element={<OrderPage modal={false} />} />
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
					<Route
						path='/profile/orders/:number'
						element={<ProtectedRoute element={<OrderPage modal={false} />} />}
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
						<Route
							path='/feed/:number'
							element={
								<Modal
									onClose={handleModalClose}
									header=''
									isOpen={true}
									content={<OrderPage modal={true} />}
								/>
							}
						/>
						<Route
							path='/profile/orders/:number'
							element={
								<ProtectedRoute
									element={
										<Modal
											onClose={handleModalClose}
											header=''
											isOpen={true}
											content={<OrderPage modal={true} />}
										/>
									}
								/>
							}
						/>
					</Routes>
				)}
			</ProvideAuth>
		</div>
	);
};
