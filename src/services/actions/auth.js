export const SET_USER = 'SET_USER';
export const UNSET_USER = 'SET_USER';

export function setUser(user) {
	return function (dispatch) {
		dispatch({
			type: SET_USER,
			user: user,
		});
	};
}
