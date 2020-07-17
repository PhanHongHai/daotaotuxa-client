import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Card } from 'antd';

import { BoxFeatureStyle } from '../styled';

function BoxFeature(props) {
	const { icon, title , onSelect} = props;
	return (
		<Card style={{ cursor: 'pointer' }} onClick={onSelect}>
			<BoxFeatureStyle>
				<Icon type={icon} />
				<h3>{title}</h3>
			</BoxFeatureStyle>
		</Card>
	);
}

BoxFeature.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default BoxFeature;
