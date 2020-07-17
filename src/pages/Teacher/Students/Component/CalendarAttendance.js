import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Row, Col, ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

import HeaderCalender from '../../../../components/HeaderCalender';
import { AttendancedDay, CalendarAttendanceStyle } from '../styled';

moment.locale('vi');

function CalendarAttendance(props) {
	const { range, timeKeeping } = props;

	const dateCellRender = value => {
		if (timeKeeping && timeKeeping.length > 0) {
			return timeKeeping.map(element => {
				if (moment(value).format('DD-MM-YYYY') === moment(element.date).format('DD-MM-YYYY'))
					return <AttendancedDay></AttendancedDay>;
				return '';
			});
		}
	};

	return (
		<CalendarAttendanceStyle>
			<Row>
				<Col span={24}>
					<ConfigProvider locale={viVN}>
						<Calendar
							className="calendar-custom"
							fullscreen={false}
							locale={viVN}
							headerRender={({ value, type, onChange, onTypeChange }) => (
								<HeaderCalender value={value} type={type} onChange={onChange} onTypeChange={onTypeChange} />
							)}
							dateCellRender={dateCellRender}
							validRange={[moment(range && range.startAt), moment(range && range.endAt)]}
						/>
					</ConfigProvider>
				</Col>
			</Row>
		</CalendarAttendanceStyle>
	);
}

CalendarAttendance.propTypes = {
	range: PropTypes.objectOf(PropTypes.any).isRequired,
	timeKeeping: PropTypes.instanceOf(Array).isRequired,
};

export default CalendarAttendance;
