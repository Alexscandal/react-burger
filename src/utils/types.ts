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
};
