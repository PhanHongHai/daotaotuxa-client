import React from 'react';
import PropTypes from 'prop-types';

function LoadingCustom(props) {
	const { margin } = props;

	return (
		<div className={`sk-circle-fade sk-center loading-margin-${margin}`}>
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
			<div className="sk-circle-fade-dot" />
		</div>
	);
}

LoadingCustom.propTypes = {
	margin: PropTypes.number.isRequired,
};


export default LoadingCustom;
