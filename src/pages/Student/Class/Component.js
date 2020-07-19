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

import ModalStudent from './Component/ModalStudentList';
import ModalSubject from './Component/ModalSubjectList';

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
	const [visibleModalStudent, setVisibleModalStudent] = useState(false);
	const [visibleModalSubject, setVisibleModalSubject] = useState(false);

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
					<InfoClass loading={loadingGetDetailOfClassByStudent} info={{ countStudent, infoTeacher, infoClass }} />
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
				data={subjectsClass}
				getReq={getSubjectsOfClassReq}
				loading={loadingGetSubjects}
				loadingGetProgressByStudent={loadingGetProgressByStudent}
				classID={ID}
				progressOfStudent={progressOfStudent}
				sectorID={infoClass && infoClass.trainingSectorID._id}
			/>
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
