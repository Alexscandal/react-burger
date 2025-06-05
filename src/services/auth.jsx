import React, { useContext, /*useState,*/ createContext } from 'react';
import { initialRequest } from '@utils/api.js';
import { useDispatch } from 'react-redux';
import { setUser } from '@/services/actions/auth.js';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export function useProvideAuth() {
	//const [user, setUser] = useState(null);
	const dispatch = useDispatch();
	/*
	const getUser = async () => {
		return await getUserRequest()
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					setUser({ ...data.user, id: data.user._id });
				}
				return data.success;
			});
	};
	*/

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
			.then((data) => data);

		if (data.success) {
			setUser({ ...data.user, id: data.user._id });
		}
	};
	/*
	const signOut = async () => {
		await logoutRequest();
		setUser(null);
		deleteCookie('token');
	};
*/
	return {
		//user,
		//getUser,
		signIn,
		//signOut,
	};
}
