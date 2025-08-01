import { initialRequest } from '@utils/api.ts';
import { AppDispatch, TRequestOptions, TUser } from '@utils/types.ts';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function setUser(user: TUser) {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: SET_USER,
			user: user,
		});
	};
}

export function unsetUser() {
	return function (dispatch: AppDispatch) {
		dispatch({
			type: UNSET_USER,
		});
	};
}

export function getUser() {
	return function (dispatch: AppDispatch) {
		const options: TRequestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: 'Bearer ' + localStorage.authToken,
			},
		};
		initialRequest(options, 'auth/user')
			.then((data) => {
				if (data !== undefined) {
					dispatch({
						type: SET_USER,
						user: data.user,
					});
				}
			})
			.catch(() => {});
	};
}
