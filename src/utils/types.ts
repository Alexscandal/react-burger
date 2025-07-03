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
	headers: HeadersInit;
	body: string;
};
