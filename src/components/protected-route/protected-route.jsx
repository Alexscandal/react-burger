import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ element }) => {
	const location = useLocation();
	if (localStorage.authToken !== undefined) {
		return element;
	}
	return <Navigate to='/login' state={{ from: location }} replace />;
};

ProtectedRoute.propTypes = {
	element: PropTypes.object,
};
