const API_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
	return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
	return fetch(API_URL + 'ingredients')
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		})
		.catch((err) => Promise.reject(err));
};

export const initialRequest = async (requestOptions, target) => {
	return await fetchWithRefresh(API_URL + target, requestOptions)
		//.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		})
		.catch((err) => Promise.reject(err));
};

export const refreshToken = () => {
	return (
		fetch(`${API_URL}auth/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
			},
			body: JSON.stringify({
				token: localStorage.getItem('refreshToken'),
			}),
		})
			.then(checkResponse)
			// !! Важно для обновления токена в мидлваре, чтобы запись токенов
			// была тут, а не в fetchWithRefresh
			.then((refreshData) => {
				if (!refreshData.success) {
					return Promise.reject(refreshData);
				}
				localStorage.setItem('refreshToken', refreshData.refreshToken);
				localStorage.setItem('accessToken', refreshData.accessToken);
				return refreshData;
			})
	);
};

export const fetchWithRefresh = async (url, options) => {
	try {
		const res = await fetch(url, options);
		return await checkResponse(res);
	} catch (err) {
		/*
		if (err.message === 'jwt expired') {
			const refreshData = await refreshToken(); //обновляем токен
			options.headers.authorization = refreshData.accessToken;
			const res = await fetch(url, options); //повторяем запрос
			return await checkResponse(res);
		} else {
			alert(err.message);
			return Promise.reject(err);
		}
		*/
		switch (err.message) {
			case 'jwt expired':
				// eslint-disable-next-line no-case-declarations
				const refreshData = await refreshToken(); //обновляем токен
				options.headers.authorization = refreshData.accessToken;
				// eslint-disable-next-line no-case-declarations
				const res = await fetch(url, options); //повторяем запрос
				return await checkResponse(res);
			case 'email or password are incorrect':
				alert('Неверный E-mail или пароль.');
				break;
			// eslint-disable-next-line no-fallthrough
			case 'Incorrect reset token':
				alert('Неверный код из письма.');
				break;
			// eslint-disable-next-line no-fallthrough
			default:
				return Promise.reject(err);
		}
	}
};
