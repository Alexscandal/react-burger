import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ element }) => {
	const { user } = useSelector((store) => ({
		user: store.auth.user,
	}));
	const location = useLocation();
	console.info(localStorage.authToken);
	if (localStorage.authToken !== undefined && user.name !== null) {
		return element;
	}
	return <Navigate to='/login' state={{ from: location }} replace />;
};

ProtectedRoute.propTypes = {
	element: PropTypes.object,
};
