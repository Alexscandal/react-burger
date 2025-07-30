import { useContext, createContext } from 'react';
import { initialRequest } from '@utils/api.ts';
import { useDispatch } from '@/services/store.ts';
import { TRequestOptions, TExtUser, TUser } from '@utils/types.ts';
import { setUser, unsetUser } from '@/services/actions/auth.ts';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<ReturnType<typeof useProvideAuth>>(
	{} as ReturnType<typeof useProvideAuth>
);

export function ProvideAuth({
	children,
}: {
	children: React.ReactElement | React.ReactElement[];
}) {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export function useProvideAuth() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const saveUser = async (form: TUser, target: string) => {
		const options: TRequestOptions = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + localStorage.authToken,
			} as HeadersInit,
			body: JSON.stringify(form),
		};
		initialRequest(options, target).then((res: TExtUser) => {
			if (res.user) {
				dispatch(setUser(res.user));
				setUser({ ...res.user, id: res.user._id });
				alert('Данные сохранены');
			}
			return res;
		});
	};

	const signIn = (form: { email: string }, target: string) => {
		const options: TRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' } as HeadersInit,
			body: JSON.stringify(form),
		};
		initialRequest(options, target)
			.then((res: TExtUser) => {
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
			.catch(() => () => {});
	};

	const signOut = async () => {
		const options: TRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' } as HeadersInit,
			body: JSON.stringify({ token: localStorage.refreshToken }),
		};
		await initialRequest(options, 'auth/logout')
			.then((res) => {
				if (res.success) {
					delete localStorage.authToken;
					delete localStorage.refreshToken;
					dispatch(unsetUser());
				}
			})
			.then((data) => data);
		navigate('/login', { replace: true });
	};

	const setPassword = async (form: { password: string; token: string }) => {
		const options: TRequestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' } as HeadersInit,
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
