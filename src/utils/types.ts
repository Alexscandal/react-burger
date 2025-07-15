import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from '../services/store';

import {
	ADD_ITEM,
	REMOVE_ITEM,
	SWAP_INDEX,
	UPDATE_COST,
	UPDATE_ITEM_PRICE,
} from '@services/actions/ingredients-constructor.ts';

import {
	LOAD_DATA,
	FAILED_LOADING,
	UPDATE_COUNT,
	REDUCE_COUNT,
} from '@/services/actions/ingredients.ts';
import { SET_PRODUCT } from '@services/actions/ingredient.ts';
import {
	ORDER_CHECKOUT_FAILED,
	ORDER_CHECKOUT_REQUEST,
	ORDER_CHECKOUT_SUCCESS,
} from '@services/actions/order.ts';
import { SET_USER, UNSET_USER } from '@services/actions/auth.ts';

export type TAddItem = {
	readonly type: typeof ADD_ITEM;
};

export type TRemoveItem = {
	readonly type: typeof REMOVE_ITEM;
};

export type TUpdateCost = {
	readonly type: typeof UPDATE_COST;
};

export type TUpdateItemPrice = {
	readonly type: typeof UPDATE_ITEM_PRICE;
};

export type TSwapIndex = {
	readonly type: typeof SWAP_INDEX;
};

export type TIngredientsConstructorActions =
	| TAddItem
	| TRemoveItem
	| TUpdateCost
	| TUpdateItemPrice
	| TSwapIndex;

export type TLoadData = {
	readonly type: typeof LOAD_DATA;
};

export type TFailedLoading = {
	readonly type: typeof FAILED_LOADING;
};

export type TUpdateCount = {
	readonly type: typeof UPDATE_COUNT;
};

export type TReduceCount = {
	readonly type: typeof REDUCE_COUNT;
};

export type TIngredients =
	| TLoadData
	| TFailedLoading
	| TUpdateCount
	| TReduceCount;

export type TSetProduct = {
	readonly type: typeof SET_PRODUCT;
};

export type TOrderChackoutRequest = {
	readonly type: typeof ORDER_CHECKOUT_REQUEST;
};

export type TOrderChackoutSucccess = {
	readonly type: typeof ORDER_CHECKOUT_SUCCESS;
};

export type TOrderChackoutFailed = {
	readonly type: typeof ORDER_CHECKOUT_FAILED;
};

export type TOrderChackout =
	| TOrderChackoutRequest
	| TOrderChackoutSucccess
	| TOrderChackoutFailed;

export type TSetUser = {
	readonly type: typeof SET_USER;
};

export type TUnsetUser = {
	readonly type: typeof UNSET_USER;
};

export type TUserActions = TSetUser | TUnsetUser;

type TApplicationActions =
	| TIngredientsConstructorActions
	| TIngredients
	| TSetProduct
	| TOrderChackout
	| TUserActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<
	RootState,
	unknown,
	TApplicationActions
>;
export type AppThunkAction<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	TApplicationActions
>;

export type TIngradient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	count: number;
	uid: string;
};

export type TUser = {
	email: string;
	password?: string;
	name: string;
	_id?: string;
	id?: string;
};

export type TExtUser = TUser & {
	success: boolean;
	user: TUser;
	json: () => void;
	accessToken: string;
	refreshToken: string;
	order: {
		number: number;
	};
};

export type TRequestOptions = {
	method: string;
	requestOptions?: object;
	target?: string;
	headers: HeadersInit & { authorization?: string };
	body?: string;
};

export type TOrder = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};
