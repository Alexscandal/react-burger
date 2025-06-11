import { initialRequest } from '@utils/api.js';

export const SET_USER = 'SET_USER';
export const UNSET_USER = 'UNSET_USER';

export function setUser(user) {
	return function (dispatch) {
		dispatch({
			type: SET_USER,
			user: user,
		});
	};
}

export function unsetUser() {
	return function (dispatch) {
		dispatch({
			type: UNSET_USER,
		});
	};
}

export function getUser() {
	return function (dispatch) {
		const options = {
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
			.catch((err) => {
				console.info(err);
			});
	};
}
