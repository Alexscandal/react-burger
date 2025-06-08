import React, { useContext, /*useState,*/ createContext } from 'react';
import { initialRequest } from '@utils/api.js';
import { useDispatch } from 'react-redux';
import { setUser, unsetUser } from '@/services/actions/auth.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export function useProvideAuth() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const saveUser = async (form, target) => {
		console.info(form);
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + localStorage.authToken,
			},
			body: JSON.stringify(form),
		};
		const data = await initialRequest(options, target)
			.then((res) => {
				console.info(res);
				if (res.user) {
					dispatch(setUser(res.user));
					alert('Данные сохранены');
				}
				return res.json();
			})
			.then((data) => data);

		if (data.success) {
			setUser({ ...data.user, id: data.user._id });
		}
	};

	const signIn = async (form, target) => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		};
		const data = await initialRequest(options, target)
			.then((res) => {
				console.info(res);
				let authToken;
				if (res.accessToken && res.accessToken.indexOf('Bearer') === 0) {
					authToken = res.accessToken.split('Bearer ')[1];
					if (authToken) {
						localStorage.setItem('authToken', authToken);
					}
				}
				if (res.refreshToken) {
					localStorage.setItem('refreshToken', res.refreshToken);
				}
				if (res.user) {
					dispatch(setUser(res.user));
				}
				return res.json();
			})
			.then((data) => data)
			.catch((err) => () => {
				alert(err.message);
			});

		if (data.success) {
			setUser({ ...data.user, id: data.user._id });
		}
	};

	const signOut = async () => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: localStorage.refreshToken }),
		};
		await initialRequest(options, 'auth/logout')
			.then((res) => {
				console.info(res);
				if (res.success) {
					delete localStorage.authToken;
					delete localStorage.refreshToken;
					dispatch(unsetUser());
				}
			})
			.then((data) => data);
	};

	const setPassword = async (form) => {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form),
		};
		await initialRequest(options, 'password-reset/reset')
			.then((res) => {
				if (res?.success) {
					navigate('/login', { replace: true });
				}
			})
			.then((data) => {
				console.info(data);
			})
			.catch((err) => () => {
				console.info(err);
			});
	};

	return {
		signIn,
		signOut,
		saveUser,
		setPassword,
	};
}
