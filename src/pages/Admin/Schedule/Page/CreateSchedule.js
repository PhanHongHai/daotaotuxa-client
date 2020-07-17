import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';

import ScheduleAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormCreateSchedule from '../Component/FormCreateSchedule';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'home',
		path: '/admin/quan-ly-lich-thi',
		text: '',
	},
];

function CreateSchedule(props) {
	const { createScheduleStatus, createScheduleReq } = props;
	const loadingCreate = createScheduleStatus === 'FETCHING';
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Quản lý lịch thi" icon="calendar" visible={false} />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card className="phh-card" title="Thêm mới lịch thi">
					<FormCreateSchedule createReq={createScheduleReq} loading={loadingCreate} />
				</Card>
			</div>
		</div>
	);
}

CreateSchedule.propTypes = {
	createScheduleStatus: PropTypes.string.isRequired,
	createScheduleReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	createScheduleStatus: state.schedulePage.createScheduleStatus,
});

const mapDispatchToProps = {
	createScheduleReq: ScheduleAction.createScheduleRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);
