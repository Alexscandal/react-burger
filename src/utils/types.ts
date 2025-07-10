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

type TApplicationActions = TIngredientsConstructorActions | TIngredients;
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
	uid: number;
};

export type TUser = {
	email: string;
	password?: string;
	name: string;
	_id?: string;
};

export type TExtUser = TUser & {
	success: boolean;
	user: TUser;
	json: () => void;
	accessToken: string;
	refreshToken: string;
};

export type TRequestOptions = {
	method: string;
	requestOptions?: object;
	target?: string;
	headers: HeadersInit & { authorization?: string };
	body: string;
};
