import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Modal, Input, Button, Row, Col, Typography, Breadcrumb } from 'antd';

import moment from 'moment';
import 'moment/locale/vi';
import { useHistory, useParams, Link } from 'react-router-dom';

import customMess from '../../../utils/customMessage';

import FormDetail from './Component/FormDetail';
import TablePoint from './Component/TablePoint';

moment.locale('vi');

const { confirm } = Modal;

function EditStudent(props) {
	const {
		updateStudentStatus,
		getDetailStudentStatus,
		deleteStudentStatus,
		updateStudentReq,
		deleteStudentReq,
		getDetailStudentReq,
		studentDetail,
	} = props;
	const { ID } = useParams();
	useEffect(() => {
		getDetailStudentReq({
			ID,
		});
	}, [ID, getDetailStudentReq]);

	const history = useHistory();
	const [tabKey, setTabKey] = useState('detail');
	const loadingGetDetail = getDetailStudentStatus === 'FETCHING';
	const loadingEdit = updateStudentStatus === 'FETCHING';
	const loadingDelete = deleteStudentStatus === 'FETCHING';

	const handleDelte = data => {
		confirm({
			title: `Bạn có muốn xóa học viên ${data.name} ?`,
			onOk() {
				deleteStudentReq({
					ID: data._id,
					pageCurrent: { limit: 10, page: 1 },
					keyword: '',
					cb: res => {
						if (res.isRedirect) {
							history.push('/partner/dashboard');
							customMess('notification', 'success', res.msg);
						}
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};

	const tabList = [
		{
			key: 'detail',
			tab: 'Thông tin học viên',
		},
		{
			key: 'point',
			tab: 'Điểm số',
		},
	];
	const dataPoint = [
		{
			_id: 1,
			tag: '#343344',
			name: 'Lập trình web',
			pointProcess: 6,
			pointMiddle: 8,
			pointLast: 9,
		},
		{
			_id: 2,
			tag: '#343344',
			name: 'Ngoại ngữ chuyên ngành',
			pointProcess: 6,
			pointMiddle: 8,
			pointLast: 9,
		},
		{
			_id: 3,
			tag: '#343344',
			name: 'Hệ thống thông tin',
			pointProcess: 6,
			pointMiddle: 8,
			pointLast: 9,
		},
		{
			_id: 4,
			tag: '#332344',
			name: 'Toán đại cương',
			pointProcess: 6,
			pointMiddle: 8,
			pointLast: 9,
		},
		{
			_id: 5,
			tag: '#335544',
			name: 'Vật lý đại cương',
			pointProcess: 6,
			pointMiddle: 8,
			pointLast: 9,
		},
	];

	const contentList = {
		detail: (
			<Card className="phh-card-v2">
				<FormDetail
					updateReq={updateStudentReq}
					loadingEdit={loadingEdit}
					loadingDelete={loadingDelete}
					studentDetail={studentDetail}
					handleDelte={handleDelte}
				/>
			</Card>
		),
		point: (
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
				<TablePoint data={dataPoint} />
			</Card>
		),
	};

	return (
		<div className="container mt-15 mb-15">
			<Row>
				<Col xs={24} md={24} className="mb-10">
					<Typography.Title level={3}>Chi Tiết Học Viên</Typography.Title>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/partner/dashboard">Dashboard</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Chi tiết học viên</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Col xs={24} md={24}>
					<div>
						<Card
							className="phh-card-v2 card-body-transparent mb-10 tab-custom"
							tabList={tabList}
							activeTabKey={tabKey}
							onTabChange={key => setTabKey(key)}
							loading={loadingGetDetail}
						/>
						{contentList[tabKey]}
					</div>
				</Col>
			</Row>
		</div>
	);
}

EditStudent.propTypes = {
	studentDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	getDetailStudentStatus: PropTypes.string.isRequired,
	updateStudentStatus: PropTypes.string.isRequired,
	deleteStudentStatus: PropTypes.string.isRequired,
	getDetailStudentReq: PropTypes.func.isRequired,
	updateStudentReq: PropTypes.func.isRequired,
	deleteStudentReq: PropTypes.func.isRequired,
};

export default EditStudent;
