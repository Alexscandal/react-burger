import { describe, it, expect } from 'vitest';
import { SET_USER, UNSET_USER } from '@/services/actions/auth.ts';
import { authInitialState, authReducer } from '@/services/reducers/auth.ts';

describe('check auth reducer', () => {
	it('should return the initial state', () => {
		expect(authReducer(undefined, { type: '' })).toEqual(authInitialState);
	});

	it('should set user data', () => {
		expect(
			authReducer(undefined, {
				type: SET_USER,
				user: {
					email: 'alexscandal@gmail.com',
					name: 'Name',
				},
			})
		).toEqual({
			...authInitialState,
			user: {
				email: 'alexscandal@gmail.com',
				name: 'Name',
			},
		});
	});

	it('should clear user data', () => {
		expect(
			authReducer(undefined, {
				type: UNSET_USER,
			})
		).toEqual({
			...authInitialState,
			user: {
				email: null,
				name: null,
			},
		});
	});
});
