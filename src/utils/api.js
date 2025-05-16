import React from 'react';

export const getingredients = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks,import/no-named-as-default-member
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		data: [],
	});
	fetch('https://norma.nomoreparties.space/api/ingredients')
		.then((res) => res.json())
		.then((data) => {
			setState({ ...state, data: data.data, isLoading: false });
		})
		.catch(() => {
			setState({ ...state, hasError: true, isLoading: false });
		});
	return state;
};
