import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Radio } from 'antd';

const { Group, Button } = Radio;

function HeaderCalender({ value, type, onChange, onTypeChange }) {
	const start = 0;
	const end = 12;
	const monthOptions = [];

	const current = value.clone();
	const localeData = value.localeData();
	const months = [];
	for (let i = 0; i < 12; i++) {
		current.month(i);
		months.push(localeData.monthsShort(current));
	}

	for (let index = start; index < end; index++) {
		monthOptions.push(
			<Select.Option className="month-item" key={`${index}`}>
				{months[index]}
			</Select.Option>,
		);
	}
	const month = value.month();

	const year = value.year();
	const options = [];
	for (let i = year - 10; i < year + 10; i += 1) {
		options.push(
			<Select.Option key={i} value={i} className="year-item">
				{i}
			</Select.Option>,
		);
	}
	return (
		<div style={{ padding: 10 }}>
			<Row type="flex" justify="space-between">
				<Col>
					<Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
						<Button value="month">Tháng</Button>
						<Button value="year">Năm</Button>
					</Group>
				</Col>
				<Col>
					<Select
						size="small"
						dropdownMatchSelectWidth={false}
						className="my-year-select"
						onChange={newYear => {
							const now = value.clone().year(newYear);
							onChange(now);
						}}
						value={String(year)}
					>
						{options}
					</Select>
				</Col>
				<Col>
					<Select
						size="small"
						dropdownMatchSelectWidth={false}
						value={String(month)}
						onChange={selectedMonth => {
							const newValue = value.clone();
							newValue.month(parseInt(selectedMonth, 10));
							onChange(newValue);
						}}
					>
						{monthOptions}
					</Select>
				</Col>
			</Row>
		</div>
	);
}

HeaderCalender.propTypes = {
	value: PropTypes.objectOf(PropTypes.any).isRequired,
	type: PropTypes.objectOf(PropTypes.any).isRequired,
	onChange: PropTypes.func.isRequired,
	onTypeChange: PropTypes.func.isRequired,
};

export default HeaderCalender;
