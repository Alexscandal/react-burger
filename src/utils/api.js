const checkResporse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
	return fetch('https://norma.nomoreparties.space/api/ingredients')
		.then(checkResporse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		})
		.catch((err) => Promise.reject(err));
};
