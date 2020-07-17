import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthorizedRoute(props) {
	const { component: Component, type, authority, ...rest } = props;
	const token = localStorage.getItem('token');
	const role = localStorage.getItem('role');
	return authority ? (
		// Required token
		<Route
			{...rest}
			render={routeProps => {
				return token ? <Component {...routeProps} /> : <Redirect to={{ pathname: '/login' }} />;
			}}
		/>
	) : (
		// Not Required token
		<Route
			{...rest}
			render={routeProps => {
				return !token && type === 'none' ? (
					<Component {...routeProps} />
				) : (
					<Redirect to={{ pathname: `/${role}/dashboard` }} />
				);
			}}
		/>
	);
}
AuthorizedRoute.propTypes = {
	component: PropTypes.objectOf(PropTypes.any).isRequired,
	authority: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
};

export default AuthorizedRoute;
