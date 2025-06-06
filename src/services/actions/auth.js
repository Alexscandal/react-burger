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
