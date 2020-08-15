import React, { useState, useEffect } from 'react';
import { Row, Col, Breadcrumb, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';

import InfoClass from './Component/InfoClass';

import ModalStudent from './Component/ModalStudentList';
import ModalSubject from './Component/ModalSubjectList';
import ModalQuickTest from './Component/ModalQuickTest';
import ModalPoint from './Component/ModalPoint';
import ModalSchedule from './Component/ModalSchedule';
import ModalHistoryTest from './Component/ModalHistoryTest';

const { Title } = Typography;

function ClassStudent(props) {
	const {
		getStudentsOfClassReq,
		getSubjectsOfClassReq,
		getDetailOfClassReq,
		getProgressReq,
		getScheduleReq,
		getPointsReq,
		getLogsPointReq,
		getQuestionsForQuickTestReq,
		studentsClass,
		subjectsClass,
		progressOfStudent,
		detailOfClass: { countStudent, infoTeacher, infoClass },
		pointsOfStudent,
		scheduleOfClass,
		logsPoint,
		questionsForQuickTest,
		getSubjectOfClassStatus,
		getStudentsOfClassStatus,
		getDetailOfClassByStudentIDStatus,
		getProgressByStudentStatus,
		getScheduleOfClassStatus,
		getPointsByStudentStatus,
		getLogsPointByStudentStatus,
	getRandomQuestionsForTestStatus,

	} = props;
	const { ID } = useParams();

	const [visibleModalStudent, setVisibleModalStudent] = useState(false);
	const [visibleModalSubject, setVisibleModalSubject] = useState(false);
	const [visibleModalQuickTest, setVisibleModalQuickTest] = useState(false);
	const [visibleModalPoint, setVisibleModalPoint] = useState(false);
	const [visibleModalSchedule, setVisibleModalSchedule] = useState(false);
	const [visibleModalHistoryTest, setVisibleModalHistoryTest] = useState(false);

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
		getPointsReq({
			req: {
				page: 1,
				limit: 10,
			},
		});
		getLogsPointReq({
			req: {
				page: 1,
				limit: 10,
			},
		});
	}, [ID]);

	const loadingGetSubjects = getSubjectOfClassStatus === 'FETCHING';
	const loadingGetStudents = getStudentsOfClassStatus === 'FETCHING';
	const loadingGetProgressByStudent = getProgressByStudentStatus === 'FETCHING';
	const loadingGetScheduleOfClass = getScheduleOfClassStatus === 'FETCHING';
	const loadingGetPointsOfStudent = getPointsByStudentStatus === 'FETCHING';
	const loadingGetLogPoint = getLogsPointByStudentStatus === 'FETCHING';
	const loadingGetRandomQuestionsForTest = getRandomQuestionsForTestStatus === 'FETCHING';
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
						openHistory={setVisibleModalHistoryTest}
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
				getQuestionsReq={getQuestionsForQuickTestReq}
				loadingGetQuestions={loadingGetRandomQuestionsForTest}
				questionsData={questionsForQuickTest}
			/>
			<ModalPoint
				visible={visibleModalPoint}
				setVisible={setVisibleModalPoint}
				data={pointsOfStudent}
				loading={loadingGetPointsOfStudent}
				getPointsReq={getPointsReq}
			/>
			<ModalSchedule
				scheduleData={scheduleOfClass}
				loadingGet={loadingGetScheduleOfClass}
				getSchedulesReq={getScheduleReq}
				visible={visibleModalSchedule}
				setVisible={setVisibleModalSchedule}
				classID={ID}
			/>
			<ModalHistoryTest
				logsPointData={logsPoint}
				loading={loadingGetLogPoint}
				getLogPointReq={getLogsPointReq}
				visible={visibleModalHistoryTest}
				setVisible={setVisibleModalHistoryTest}
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
	getPointsReq: PropTypes.func.isRequired,
	getLogsPointReq: PropTypes.func.isRequired,
	getQuestionsForQuickTestReq: PropTypes.func.isRequired,
	studentsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	detailOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	scheduleOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	pointsOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	logsPoint: PropTypes.objectOf(PropTypes.any).isRequired,
	questionsForQuickTest: PropTypes.objectOf(PropTypes.any).isRequired,
	getSubjectOfClassStatus: PropTypes.string.isRequired,
	getStudentsOfClassStatus: PropTypes.string.isRequired,
	getDetailOfClassByStudentIDStatus: PropTypes.string.isRequired,
	getProgressByStudentStatus: PropTypes.string.isRequired,
	getScheduleOfClassStatus: PropTypes.string.isRequired,
	getPointsByStudentStatus: PropTypes.string.isRequired,
	getLogsPointByStudentStatus: PropTypes.string.isRequired,
	getRandomQuestionsForTestStatus: PropTypes.string.isRequired,
};

export default ClassStudent;
