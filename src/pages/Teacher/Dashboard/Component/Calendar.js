import React from 'react';
import PropTypes from 'prop-types';
import { Card, Calendar } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

import HeaderCalender from '../../../../components/HeaderCalender';


moment.locale('vi');
function CalendarTeacher(props) {
	return (
			<Card className="phh-card" title="Lịch">
				<Calendar
					fullscreen={false}
					locale={viVN}
					headerRender={({ value, type, onChange, onTypeChange }) => (
						<HeaderCalender value={value} type={type} onChange={onChange} onTypeChange={onTypeChange} />
					)}
				/>
			</Card>
	);
}

CalendarTeacher.propTypes = {};

export default CalendarTeacher;
