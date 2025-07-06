import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
type TProtectedRouteProps = {
	element: React.JSX.Element;
};

export const ProtectedRoute = ({ element }: TProtectedRouteProps) => {
	const location = useLocation();
	if (localStorage.authToken !== undefined) {
		return element;
	}
	return <Navigate to='/login' state={{ from: location }} replace />;
};
