import React, { useState } from 'react';
import moment from 'moment';
import { Card, Input, Button, Row, Col, Typography } from 'antd';
import PropTypes from 'prop-types';

import TableSchedule from './Component/TableSchedule';
import TableResult from './Component/TableResult';

const tabList = [
	{
		key: 'tab1',
		tab: 'Danh sách ngày thi',
	},
	{
		key: 'tab3',
		tab: 'Kết quả thi',
	},
];

const dataTable = [
	{
		_id: 1,
		title: 'Thi giữa kỳ',
		status: false,
		tag: '#345454',
		name: 'Lập trình mạng',
		startAt: moment(),
		timeAt: moment(),
	},
	{
		_id: 2,
		title: 'Thi giữa kỳ',
		status: false,
		tag: '#345454',
		name: 'Lập trình ứng dụng',
		startAt: moment(),
		timeAt: moment(),
	},
	{
		_id: 3,
		title: 'Thi cuối kỳ',
		status: true,
		tag: '#345454',
		name: 'Ngoại ngữ chuyên ngành',
		startAt: moment(),
		timeAt: moment(),
	},
];
const dataTableResult = [
	{
		_id: 1,
		title: 'Thi giữa kỳ',
		status: false,
		tag: '#345454',
		name: 'Lập trình mạng',
		startAt: moment(),
		timeAt: moment(),
		wrongAnswer: 4,
		rightAnswer: 6,
		point: 7,
	},
	{
		_id: 2,
		title: 'Thi giữa kỳ',
		status: false,
		tag: '#345454',
		name: 'Lập trình ứng dụng',
		startAt: moment(),
		timeAt: moment(),
		wrongAnswer: 0,
		rightAnswer: 9,
		point: 9,
	},
];

function ScheduleStudent(props) {
	const { getScheduleOfClassStatus, scheduleOfClass, getScheduleReq } = props;

	const [tabKey, setTabKey] = useState('tab1');
	const loadingGetSchedule = getScheduleOfClassStatus === 'FETCHING';

	const contentList = {
		tab1: (
			<Card className="phh-card-v2">
				<div className="phh-group-search mb-10">
					<Input.Search
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
							>
								Làm mới
							</Button>
						}
						placeholder="Nhập từ khóa.."
						enterButton
					/>
				</div>
				<TableSchedule data={scheduleOfClass} loading={loadingGetSchedule}  />
			</Card>
		),
		tab3: (
			<Card className="phh-card-v2">
				<div className="phh-group-search mb-10">
					<Input.Search
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
							>
								Làm mới
							</Button>
						}
						placeholder="Nhập từ khóa.."
						enterButton
					/>
				</div>
				<TableResult data={dataTableResult} />
			</Card>
		),
	};

	return (
		<div className="container mb-15">
			<Row>
				<Col xs={24} md={18} className="mb-5 mt-15">
					<Typography.Title level={4}>Lịch Thi</Typography.Title>
				</Col>
				<Col xs={24} md={24}>
					<Card
						className="phh-card-v2 card-body-transparent mb-10 tab-custom"
						tabList={tabList}
						activeTabKey={tabKey}
						onTabChange={key => setTabKey(key)}
					/>

					{contentList[tabKey]}
				</Col>
			</Row>
		</div>
	);
}

ScheduleStudent.propTypes = {
	getScheduleOfClassStatus: PropTypes.string.isRequired,
	scheduleOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	getScheduleReq: PropTypes.func.isRequired,
};

export default ScheduleStudent;
