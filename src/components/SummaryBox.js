import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import numeral from 'numeral';

function SummaryBox(props) {
	const { title, value, icon, type, loading } = props;
	const renderValue = (number, typeValue) => {
		let str;
		let suffix = '';
		if (number > 1000000000) {
			suffix = 'B';
			str = number / 1000000000;
		} else if (number > 1000000) {
			suffix = 'M';
			str = number / 1000000;
		} else if (number > 1000) {
			suffix = 'K';
			str = number / 1000;
		} else {
			suffix = typeValue === '%' ? '%' : '';
			str = Math.round(number);
		}
		const output = {
			number: numeral(str).format('0,0[.]00'),
			suffix,
		};
		return `${output.number} ${output.suffix}`;
	};
	return (
		<div className="phh-summary-box">
			<span>
				<Icon type={icon} />
			</span>
			<div className="phh-summary-content">
				<h1>{loading ? <Icon type="loading" /> : renderValue(value, type)}</h1>
				<p>{title}</p>
			</div>
		</div>
	);
}

SummaryBox.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	icon: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default SummaryBox;
