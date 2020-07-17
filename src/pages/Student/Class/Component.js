import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Input, Button, Breadcrumb, Typography, Spin } from 'antd';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';

import TableStudentData from './Component/TableStudentData';
import TablePoint from './Component/TablePoint';
// import TablePointAll from './Component/TablePointAll';
import ListSubject from './Component/ListSubjectItem';
import InfoClass from './Component/InfoClass';
import LoadingCustom from '../../../components/LoadingCustom';

const { Title } = Typography;
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
// const dataPointAll = [
// 	{
// 		_id: 1,
// 		tag: '045340645',
// 		name: 'Nguyen van a',
// 		ltw: 8,
// 		nncn: 9,
// 		httt: 7,
// 		ltm: 8,
// 		vldc: 10,
// 	},
// 	{
// 		_id: 2,
// 		tag: '045340645',
// 		name: 'Nguyen van a',
// 		ltw: 8,
// 		nncn: 9,
// 		httt: 7,
// 		ltm: 8,
// 		vldc: 10,
// 	},
// 	{
// 		_id: 3,
// 		tag: '045340645',
// 		name: 'Nguyen van a',
// 		ltw: 8,
// 		nncn: 9,
// 		httt: 7,
// 		ltm: 8,
// 		vldc: 10,
// 	},
// 	{
// 		_id: 4,
// 		tag: '045340645',
// 		name: 'Nguyen van a',
// 		ltw: 8,
// 		nncn: 9,
// 		httt: 7,
// 		ltm: 8,
// 		vldc: 10,
// 	},
// 	{
// 		_id: 5,
// 		tag: '045340645',
// 		name: 'Nguyen van a',
// 		ltw: 8,
// 		nncn: 9,
// 		httt: 7,
// 		ltm: 8,
// 		vldc: 10,
// 	},
// ];

const tabList = [
	{
		key: 'student',
		tab: 'Danh sách học viên',
	},
	// {
	// 	key: 'points',
	// 	tab: 'Bảng điểm chung',
	// },
	{
		key: 'point',
		tab: 'Bảng điểm cá nhân',
	},
	{
		key: 'subject',
		tab: 'Danh sách môn học',
	},
];

function ClassStudent(props) {
	const {
		getStudentsOfClassReq,
		getSubjectsOfClassReq,
		getDetailOfClassReq,
		getProgressReq,
		studentsClass,
		subjectsClass,
		progressOfStudent,
		detailOfClass: { countStudent, infoTeacher, infoClass },
		getSubjectOfClassStatus,
		getStudentsOfClassStatus,
		getDetailOfClassByStudentIDStatus,
		getProgressByStudentStatus,
	} = props;
	const { ID } = useParams();
	const [tabKey, setTabKey] = useState('student');
	useEffect(() => {
		getDetailOfClassReq({});
		getStudentsOfClassReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
				classID: ID,
			},
		});
		getProgressReq({});
	}, [ID]);

	const refInput = useRef(null);
	const [keyword, setKeyword] = useState('');
	const loadingGetSubjects = getSubjectOfClassStatus === 'FETCHING';
	const loadingGetStudents = getStudentsOfClassStatus === 'FETCHING';
	const loadingGetProgressByStudent = getProgressByStudentStatus === 'FETCHING';
	const loadingGetDetailOfClassByStudent = getDetailOfClassByStudentIDStatus === 'FETCHING';

	const handleSearch = value => {
		setKeyword(value);
		switch (tabKey) {
			case 'student':
				getStudentsOfClassReq({
					req: {
						limit: 10,
						page: 1,
						keyword: value,
						classID: ID,
					},
				});
				break;

			case 'subject':
			
				getSubjectsOfClassReq({
					req: {
						limit: 10,
						page: 1,
						keyword: value,
						sectorID: infoClass && infoClass.trainingSectorID._id,
					},
				});
				break;

			default:
				break;
		}
	};
	const handleReload = () => {
		refInput.current.input.state.value = '';
		setKeyword('');
		switch (tabKey) {
			case 'student':
				getStudentsOfClassReq({
					req: {
						limit: 10,
						page: 1,
						keyword: '',
						classID: ID,
					},
				});
				break;

			case 'subject':
				getSubjectsOfClassReq({
					req: {
						limit: 10,
						page: 1,
						keyword: '',
						sectorID: infoClass && infoClass.trainingSectorID._id,
					},
				});
				break;

			default:
				break;
		}
	};

	const handleChangePage = page => {
		getSubjectsOfClassReq({
			req: {
				page: Number(page.current),
				limit: 10,
				keyword,
				classID: ID,
			},
		});
	};
	const contentList = {
		student: (
			<React.Fragment>
				<Card className="phh-card-v2" title="Danh sách học viên">
					<div className="phh-group-search mb-10 mt-5 flex" style={{ alignItems: 'center' }}>
						<Input.Search
							addonBefore={
								<Button
									className="btn-reload"
									style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
									icon="sync"
									onClick={() => handleReload()}
								>
									Làm mới
								</Button>
							}
							ref={refInput}
							placeholder="Nhập từ khóa.."
							enterButton
							onSearch={handleSearch}
						/>
					</div>
					<TableStudentData
						data={studentsClass && studentsClass.data}
						pagination={studentsClass && studentsClass.pagination}
						loading={loadingGetStudents}
					/>
				</Card>
			</React.Fragment>
		),
		// points: (
		// 	<Card className="phh-card-v2" title='Danh sách cả lớp'>
		// 		<TablePointAll data={dataPointAll} />
		// 	</Card>
		// ),
		point: (
			<Card className="phh-card-v2" title="Điểm cá nhân">
				<TablePoint data={dataPoint} />
			</Card>
		),
		subject: (
			<div style={{ padding: '0 8px' }}>
				<Spin spinning={loadingGetProgressByStudent} indicator={<LoadingCustom />}>
					<Row gutter={16}>
						<ListSubject
							data={subjectsClass && subjectsClass.data}
							pagination={subjectsClass && subjectsClass.pagination}
							handleChangePage={handleChangePage}
							loading={loadingGetSubjects}
							classID={ID}
							progressOfStudent={progressOfStudent}
						/>
					</Row>
				</Spin>
			</div>
		),
	};
	const handleChangeTab = key => {
		setTabKey(key);
		switch (key) {
			case 'student':
				getStudentsOfClassReq({
					req: {
						limit: 10,
						page: 1,
						keyword: '',
						classID: ID,
					},
				});
				break;

			case 'subject':
				getSubjectsOfClassReq({
					req: {
						limit: 10,
						page: 1,
						keyword: '',
						classID: ID,
					},
				});
				break;

			default:
				break;
		}
	};
	return (
		<div className="container mb-15">
			<Row gutter={16}>
				<Col xs={24} md={24} className="mb-5 mt-15">
					<Title level={4}>Lớp Học</Title>
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to="/student/dashboard">Dashboard</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>Lớp học</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
				<Col xs={24} md={24} className="mb-5">
					<InfoClass
						loading={loadingGetDetailOfClassByStudent}
						info={{ countStudent, infoTeacher, infoClass }}
					/>
				</Col>
				{/* <Col xs={24} md={24} className="mt-5">
					{contentList[tabKey]}
				</Col> */}
			</Row>
		</div>
	);
}

ClassStudent.propTypes = {
	getStudentsOfClassReq: PropTypes.func.isRequired,
	getSubjectsOfClassReq: PropTypes.func.isRequired,
	getDetailOfClassReq: PropTypes.func.isRequired,
	getProgressReq: PropTypes.func.isRequired,
	studentsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	detailOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	getSubjectOfClassStatus: PropTypes.string.isRequired,
	getStudentsOfClassStatus: PropTypes.string.isRequired,
	getDetailOfClassByStudentIDStatus: PropTypes.string.isRequired,
	getProgressByStudentStatus: PropTypes.string.isRequired,
};

export default ClassStudent;
