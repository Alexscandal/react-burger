// eslint-disable-next-line import/namespace
import { SET_USER, UNSET_USER } from '@/services/actions/auth.ts';
import { TUser } from '@utils/types.ts';

export const authInitialState = {
	user: {
		name: null,
		email: null,
		password: null,
	},
};

export const authReducer = (
	state = authInitialState,
	action: { type: string; user: TUser }
) => {
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
					password: null,
				},
			};
		}
		default: {
			return state;
		}
	}
};
