import { SET_USER, UNSET_USER } from '@/services/actions/auth.js';

const authInitialState = {
	user: {
		name: null,
		email: null,
	},
};

export const authReducer = (state = authInitialState, action) => {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				user: action.user,
			};
		}
		case UNSET_USER: {
			return {
				...state,
				user: {
					name: null,
					email: null,
				},
			};
		}
		default: {
			return state;
		}
	}
};
