const API_URL = 'https://norma.nomoreparties.space/api/';

const checkResporse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
	return fetch(API_URL + 'ingredients')
		.then(checkResporse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		})
		.catch((err) => Promise.reject(err));
};

export const orderCheckoutRequest = async (requestOptions) => {
	return await fetch(API_URL + 'orders', requestOptions)
		.then(checkResporse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		})
		.catch((err) => Promise.reject(err));
};
