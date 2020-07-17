import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';

import { BoxFeatureStyle } from '../styled';

function FeatureBox(props) {
	const { icon, title, onSelect } = props;
	return (
		<Card className='phh-card-v2' style={{ cursor: 'pointer' }} onClick={onSelect}>
			<BoxFeatureStyle>
				<Icon type={icon} />
				<h3>{title}</h3>
			</BoxFeatureStyle>
		</Card>
	);
}

FeatureBox.propTypes = {
	icon: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default FeatureBox;
