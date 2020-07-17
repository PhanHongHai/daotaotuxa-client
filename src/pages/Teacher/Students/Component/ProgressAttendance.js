import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Progress, Tooltip } from 'antd';
import moment from 'moment';

import { BASE_COLOR } from '../../../../constands/Other';
import { ProgressComponentStyled } from '../styled';

const renderDate = dates => {
	if (dates) {
		const startAt = moment(dates.startAt);
		const endAt = moment(dates.endAt);
		return endAt.diff(startAt, 'days');
	}
	return 0;
};

const renderTotalDayLearn = dates => {
	const startAt = moment(dates.startAt);
	const endAt = moment(dates.endAt);
	return endAt.diff(startAt, 'days');
};

const renderPercent = (dates, timeKeeping) => {
	if (dates && timeKeeping) {
		const startAt = moment(dates.startAt);
		const endAt = moment(dates.endAt);
		const totalDay = endAt.diff(startAt, 'days');
		const totalAttendancedDay = timeKeeping && timeKeeping.length;
		return Math.round((totalAttendancedDay / totalDay) * 100);
	}
	return 0;
};

function ProgressAttendance(props) {
	const { timeKeeping, range } = props;
	return (
		<ProgressComponentStyled>
			<div className="progress mb-15">
				<Tooltip
					title={`${timeKeeping && timeKeeping.length} lần điểm danh / ${range &&
						renderTotalDayLearn(range)} tổng ngày`}
				>
					<Progress
						type="circle"
						percent={renderPercent(range, timeKeeping)}
						strokeColor={{
							'0%': BASE_COLOR,
							'100%': BASE_COLOR,
						}}
					/>
				</Tooltip>
			</div>
			<div className="analy mb-20">
				<Row>
					<Col span={12}>
						<div className="item">
							<p>Điểm danh</p>
							<h1 style={{ color: '#1bb394' }}> {timeKeeping && timeKeeping.length} ngày</h1>
						</div>
					</Col>
					<Col span={12}>
						<div className="item">
							<p>Tổng</p>
							<h1>{range && renderDate(range)} ngày</h1>
						</div>
					</Col>
				</Row>
			</div>
		</ProgressComponentStyled>
	);
}

ProgressAttendance.propTypes = {
	timeKeeping: PropTypes.instanceOf(Array).isRequired,
	range: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProgressAttendance;
