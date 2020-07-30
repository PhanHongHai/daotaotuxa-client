import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Typography, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useParams, Link, useHistory } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
// other
import { HOST_SERVER } from '../../../constands/Other';
import InfoClass from './Component/InfoClass';

import ModalStudent from './Component/ModalStudentList';
import ModalSubject from './Component/ModalSubjectList';
import ModalQuickTest from './Component/ModalQuickTest';
import ModalPoint from './Component/ModalPoint';
import ModalSchedule from './Component/ModalSchedule';

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

function ClassStudent(props) {
	const {
		getStudentsOfClassReq,
		getSubjectsOfClassReq,
		getDetailOfClassReq,
		getProgressReq,
		getScheduleReq,
		studentsClass,
		subjectsClass,
		progressOfStudent,
		detailOfClass: { countStudent, infoTeacher, infoClass },
		scheduleOfClass,
		getSubjectOfClassStatus,
		getStudentsOfClassStatus,
		getDetailOfClassByStudentIDStatus,
		getProgressByStudentStatus,
		getScheduleOfClassStatus,
	} = props;
	const { ID } = useParams();
	const history = useHistory();

	const [visibleModalStudent, setVisibleModalStudent] = useState(false);
	const [visibleModalSubject, setVisibleModalSubject] = useState(false);
	const [visibleModalQuickTest, setVisibleModalQuickTest] = useState(false);
	const [visibleModalPoint, setVisibleModalPoint] = useState(false);
	const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);

	const countDown = () => {
		let secondsToGo = 10;
		const modal = Modal.warn({
			title: 'Tài khoản này hiện đang trong phiên hoạt động',
			content: `Đăng xuất trong vòng ${secondsToGo} giây.`,
			className: 'model-confirm',
			okText: 'Thoát',
			onOk: () => {
				modal.destroy();
				localStorage.clear();
				history.push('/hoc-vien');
			},
		});
		const timer = setInterval(() => {
			secondsToGo -= 1;
			modal.update({
				content: `Đăng xuất trong vòng ${secondsToGo} giây.`,
			});
		}, 1000);
		setTimeout(() => {
			clearInterval(timer);
			modal.destroy();
			localStorage.clear();
			history.push('/hoc-vien');
		}, secondsToGo * 1000);
	};

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
		const token = localStorage.getItem('token');
		const socket = socketIOClient(HOST_SERVER);
		socket.on('connect', () => {
			socket
				.emit('authenticate', { token })
				.on('authenticated', () => {
					socket.on('client-was-active', data => {
						if (data) countDown();
					});
					socket.emit('send-class-id',ID);
				})
				.on('unauthorized', msg => {
					console.log(msg);
				});
		});
	}, [ID]);

	const loadingGetSubjects = getSubjectOfClassStatus === 'FETCHING';
	const loadingGetStudents = getStudentsOfClassStatus === 'FETCHING';
	const loadingGetProgressByStudent = getProgressByStudentStatus === 'FETCHING';
	const loadingGetScheduleOfClass = getScheduleOfClassStatus === 'FETCHING';
	const loadingGetDetailOfClassByStudent = getDetailOfClassByStudentIDStatus === 'FETCHING';

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
						getSubjectsOfClassReq={getSubjectsOfClassReq}
						getScheduleReq={getScheduleReq}
						openStudentList={setVisibleModalStudent}
						openSubjectList={setVisibleModalSubject}
						openQuickTest={setVisibleModalQuickTest}
						openPoint={setVisibleModalPoint}
						openSchedule={setVisibleModalSchedule}
					/>
				</Col>
				{/* <Col xs={24} md={24} className="mt-5">
					{contentList[tabKey]}
				</Col> */}
			</Row>
			<ModalStudent
				visible={visibleModalStudent}
				setVisible={setVisibleModalStudent}
				loading={loadingGetStudents}
				data={studentsClass}
				getReq={getStudentsOfClassReq}
				classID={ID}
			/>
			<ModalSubject
				visible={visibleModalSubject}
				setVisible={setVisibleModalSubject}
				subjectList={subjectsClass}
				loading={loadingGetSubjects}
				loadingGetProgressByStudent={loadingGetProgressByStudent}
				classID={ID}
				progressOfStudent={progressOfStudent}
				getReq={getSubjectsOfClassReq}
			/>
			<ModalQuickTest
				visible={visibleModalQuickTest}
				setVisible={setVisibleModalQuickTest}
				subjectList={subjectsClass}
				loading={loadingGetSubjects}
				loadingGetProgressByStudent={loadingGetProgressByStudent}
				progressOfStudent={progressOfStudent}
				getSubjectsReq={getSubjectsOfClassReq}
				classID={ID}
			/>
			<ModalPoint visible={visibleModalPoint} setVisible={setVisibleModalPoint} data={dataPoint} />
			<ModalSchedule
				scheduleData={scheduleOfClass}
				loadingGet={loadingGetScheduleOfClass}
				getSchedulesReq={getScheduleReq}
				visible={visibleModalSchedule}
				setVisible={setVisibleModalSchedule}
				classID={ID}
			/>
		</div>
	);
}

ClassStudent.propTypes = {
	getStudentsOfClassReq: PropTypes.func.isRequired,
	getSubjectsOfClassReq: PropTypes.func.isRequired,
	getDetailOfClassReq: PropTypes.func.isRequired,
	getProgressReq: PropTypes.func.isRequired,
	getScheduleReq: PropTypes.func.isRequired,
	studentsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	detailOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	scheduleOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	getSubjectOfClassStatus: PropTypes.string.isRequired,
	getStudentsOfClassStatus: PropTypes.string.isRequired,
	getDetailOfClassByStudentIDStatus: PropTypes.string.isRequired,
	getProgressByStudentStatus: PropTypes.string.isRequired,
	getScheduleOfClassStatus: PropTypes.string.isRequired,
};

export default ClassStudent;
