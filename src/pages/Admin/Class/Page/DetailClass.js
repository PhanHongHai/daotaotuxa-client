import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Tooltip, Button, Input, Spin } from 'antd';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Action from '../Action';
import customMess from '../../../../utils/customMessage';
// component
import BreadCrumb from '../../../../components/BreadCrumb';
import ModalProfile from '../../../../components/ModalProfile';
import ModalPickTeacher from '../Component/ModalPickTeacher';
import FormEditClass from '../Component/FormEditClass';
import StudentTable from '../Component/StudentTable';
import ModalPoint from '../Component/ModalPoint';
import TableStudentData from '../Component/TableStudentsData';
import countries from '../../../../utils/country.json';

import { DetailClassStyle } from '../styled';
import LoadingCustom from '../../../../components/LoadingCustom';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'audit',
		path: '/admin/lop-hoc',
		text: 'Quản lý lớp học',
	},
];

const tabList = [
	{
		key: 'studentClass',
		tab: 'Học viên trong lớp',
	},
	{
		key: 'students',
		tab: 'Tất cả học viên',
	},
];

const renderCountry = value => {
	return countries.find(ele => ele.key === value).name;
};

function DetailClassComponent(props) {
	const {
		getDetailReq,
		updateDetailReq,
		deleteDetailReq,
		getTeachersReq,
		getSectorsReq,
		getStudentsReq,
		getStudentOfClassReq,
		addStudentToClassReq,
		removeStudentOfClassReq,
		getInfoTeacherReq,
		addTeacherToClassReq,
		students,
		studentsOfClass,
		detailClass,
		teachers,
		infoTeacher,
		sector,
		getDetailClassStatus,
		updateClassStatus,
		deleteClassStatus,
		getStudentsStatus,
		getStudentOfClassStatus,
		addStudentToClassStatus,
		removeStudentToClassStatus,
		getInfoTeacherStatus,
		addTeacherToClassStatus,
	} = props;

	const [visibleChangeTeacher, setVisibleChangeTeacher] = useState(false);
	const [visibleProfile, setVisibleProfile] = useState(false);
	const [infoStudent, setInfoStudent] = useState({});
	const [visiblePoint, setVisiblePoint] = useState(false);
	const [tabKey, setTabKey] = useState('studentClass');
	const [keywordStudentTable, setKeywordStudentTable] = useState('');
	const [keywordStudentClassTable, setKeywordStudentClassTable] = useState('');
	const [pageCurrentStudents, setPageCurrentStudents] = useState({ page: 1, limit: 10 });
	const [pageCurrentStudentClass, setPageCurrentStudentClass] = useState({ page: 1, limit: 10 });
	const refInputStudentTable = useRef(null);
	const refInputAllStudentTable = useRef(null);

	const { ID } = useParams();
	useEffect(() => {
		getDetailReq({
			ID,
		});
		getInfoTeacherReq({
			ID,
		});
		getStudentOfClassReq({
			req: {
				page: 1,
				limit: 10,
				classID: ID,
				keyword: '',
			},
		});
		getTeachersReq({
			req: {
				limit: 10,
				page: 1,
				type: 'teacher',
				keyword: '',
			},
		});
		getStudentsReq({
			req: {
				limit: 10,
				page: 1,
				type: 'student',
				keyword: '',
			},
		});
		getSectorsReq({});
	}, [ID]);

	const loadingGetDetail = getDetailClassStatus === 'FETCHING';
	const loadingUpdateDetail = updateClassStatus === 'FETCHING';
	const loadingDeleteDetail = deleteClassStatus === 'FETCHING';
	const loadingGetStudents = getStudentsStatus === 'FETCHING';
	const loadingGetStudentOfClass = getStudentOfClassStatus === 'FETCHING';
	const loadingAddStudentToClass = addStudentToClassStatus === 'FETCHING';
	const loadingRemoveStudentOfClass = removeStudentToClassStatus === 'FETCHING';
	const loadingGetInfoTeacher = getInfoTeacherStatus === 'FETCHING';
	const loadingAddTeacher = addTeacherToClassStatus === 'FETCHING';

	const handleReloadStudentClassTable = () => {
		refInputStudentTable.current.input.state.value = '';
		setKeywordStudentClassTable('');
		getStudentOfClassReq({
			req: {
				page: 1,
				limit: 10,
				classID: ID,
				keyword: '',
			},
		});
	};
	const handleReloadStudentsTable = () => {
		refInputAllStudentTable.current.input.state.value = '';
		setKeywordStudentTable('');
		getStudentOfClassReq({
			req: {
				page: 1,
				limit: 10,
				type: 'student',
				keyword: '',
			},
		});
	};
	const handleSearchStudentClassTable = value => {
		setKeywordStudentClassTable(value);
		getStudentOfClassReq({
			req: {
				page: 1,
				limit: 10,
				classID: ID,
				keyword: value,
			},
		});
	};
	const handleSearchStudentsTable = value => {
		setKeywordStudentTable(value);
		getStudentsReq({
			req: {
				page: 1,
				limit: 10,
				type: 'student',
				keyword: value,
			},
		});
	};
	const studentClassTableChange = page => {
		setPageCurrentStudentClass({
			limit: Number(page.limit),
			page: Number(page.current),
		});
		getStudentOfClassReq({
			req: {
				page: Number(page.current),
				limit: Number(page.limit),
				classID: ID,
				keyword: keywordStudentClassTable,
			},
		});
	};
	const studentsTableChange = page => {
		setPageCurrentStudents({
			limit: Number(page.limit),
			page: Number(page.current),
		});
		getStudentsReq({
			req: {
				page: Number(page.current),
				limit: Number(page.limit),
				type: 'student',
				keyword: keywordStudentTable,
			},
		});
	};
	const handleUpdateTeacher = teacherData => {
		addTeacherToClassReq({
			req: {
				accountID: teacherData._id,
				classID: ID,
			},
			cb: res => {
				if (res.isUpdated) {
					customMess('notification', 'success', res.msg);
					setVisibleChangeTeacher(false);
				}
			},
		});
	};
	const handleAddStudentToClass = row => {
		addStudentToClassReq({
			req: {
				accountID: row._id,
				classID: ID,
			},
			classID: ID,
			pageCurrent: pageCurrentStudents,
			keyword: keywordStudentTable,
			cb: res => {
				if (res && res.isCreated) customMess('notification', 'success', res.msg);
			},
		});
	};
	const handleRemoveStudentOfClass = row => {
		removeStudentOfClassReq({
			ID: row._id,
			pageCurrent: pageCurrentStudentClass,
			keyword: keywordStudentClassTable,
			classID: ID,
			cb: res => {
				if (res && res.isCreated) customMess('notification', 'success', res.msg);
			},
		});
	};
	const contentList = {
		studentClass: (
			<Card className="phh-card">
				<div className="phh-group-search mb-10 mt-15">
					<Input.Search
						key="studentClass"
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								onClick={handleReloadStudentClassTable}
							>
								Làm mới
							</Button>
						}
						ref={refInputStudentTable}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearchStudentClassTable}
					/>
				</div>
				<StudentTable
					data={studentsOfClass && studentsOfClass.data}
					pagination={studentsOfClass && studentsOfClass.pagination}
					loading={loadingGetStudentOfClass}
					openProfile={setVisibleProfile}
					saveStudent={setInfoStudent}
					openPoint={setVisiblePoint}
					handleChange={studentClassTableChange}
					removeStudentOfClassReq={handleRemoveStudentOfClass}
					loadingRemoveStudentOfClass={loadingRemoveStudentOfClass}
				/>
			</Card>
		),
		students: (
			<Card className="phh-card">
				<div className="phh-group-search mb-10 mt-15">
					<Input.Search
						key="students"
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								onClick={handleReloadStudentsTable}
							>
								Làm mới
							</Button>
						}
						ref={refInputAllStudentTable}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearchStudentsTable}
					/>
				</div>
				<TableStudentData
					data={students && students.data}
					pagination={students && students.pagination}
					loading={loadingGetStudents}
					openProfile={setVisibleProfile}
					saveStudent={setInfoStudent}
					handleChange={studentsTableChange}
					addStudentToClassReq={handleAddStudentToClass}
					loadingAddStudentToClass={loadingAddStudentToClass}
				/>
			</Card>
		),
	};
	return (
		<DetailClassStyle>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Chi tiết lớp học" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row gutter={16}>
					<Col xs={24} sm={8} md={8} className="mb-15">
						<Card
							loading={loadingGetInfoTeacher}
							title={
								<span>
									Thông tin giảng viên &ensp;
									<Tooltip title="Thay đổi giảng viên">
										<Button
											icon="edit"
											style={{ boxShadow: 'none', border: 'none' }}
											onClick={() => setVisibleChangeTeacher(true)}
										/>
									</Tooltip>
								</span>
							}
							className="phh-card"
						>
							<div className="profile-teacher">
								{/* <Avatar size={84} icon="user" style={{ marginBottom: '15px' }} /> */}
								<span className="profile-info">
									<ul>
										<li>Tên : {infoTeacher.accountID && infoTeacher.accountID.name} </li>
										<li>Giới thiệu : {infoTeacher.accountID && infoTeacher.accountID.introduce}</li>
										<li>
											Ngày sinh :
											{!_.isEmpty(infoTeacher.accountID)
												? moment(infoTeacher.accountID && infoTeacher.accountID.birthDay).format('DD-MM-YYYY')
												: ''}
										</li>
										<li>Số điện thoại : {infoTeacher.accountID && infoTeacher.accountID.phoneNumber}</li>
										<li>Địa chỉ : {infoTeacher.accountID && infoTeacher.accountID.address}</li>
										<li>
											Email :{' '}
											<a href={`mailto: ${infoTeacher.accountID && infoTeacher.accountID.email}`}>
												{infoTeacher.accountID && infoTeacher.accountID.email}
											</a>
										</li>
										<li>Quê quán :{infoTeacher.accountID && renderCountry(infoTeacher.accountID.country)}</li>
									</ul>
								</span>
							</div>
						</Card>
					</Col>
					<Col xs={24} sm={16} md={16} className="mb-15">
						<Card className="phh-card" title="Thông tin lớp học">
							<Spin spinning={loadingGetDetail} indicator={<LoadingCustom margin={10} />}>
								<FormEditClass
									updateReq={updateDetailReq}
									deleteReq={deleteDetailReq}
									data={detailClass}
									sectorData={sector}
									loadingUpdate={loadingUpdateDetail}
									loadingDelete={loadingDeleteDetail}
								/>
							</Spin>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-15">
						<Card
							className="phh-card card-body-transparent mb-5 tab-custom"
							tabList={tabList}
							activeTabKey={tabKey}
							onTabChange={key => setTabKey(key)}
						/>
						{contentList[tabKey]}
					</Col>
				</Row>
			</div>
			<ModalPickTeacher
				visible={visibleChangeTeacher}
				setVisible={setVisibleChangeTeacher}
				listTeacher={teachers && teachers.data}
				pagination={teachers && teachers.pagination}
				handlePick={handleUpdateTeacher}
				searchTeacherReq={getTeachersReq}
				loading={loadingAddTeacher}
			/>
			<ModalProfile visible={visibleProfile} setVisible={setVisibleProfile} data={infoStudent} />
			<ModalPoint visible={visiblePoint} setVisible={setVisiblePoint} />
		</DetailClassStyle>
	);
}

const mapStateToProps = state => ({
	detailClass: state.classPage.detailClass,
	getInfoTeacherStatus: state.classPage.getInfoTeacherStatus,
	getDetailClassStatus: state.classPage.getDetailClassStatus,
	updateClassStatus: state.classPage.updateClassStatus,
	deleteClassStatus: state.classPage.deleteClassStatus,
	getStudentsStatus: state.classPage.getStudentsStatus,
	addTeacherToClassStatus: state.classPage.addTeacherToClassStatus,
	getStudentOfClassStatus: state.classPage.getStudentOfClassStatus,
	getSectorsStatus: state.classPage.getSectorsStatus,
	addStudentToClassStatus: state.classPage.addStudentToClassStatus,
	removeStudentToClassStatus: state.classPage.removeStudentToClassStatus,
	infoTeacher: state.classPage.infoTeacher,
	teachers: state.classPage.teachers,
	sector: state.classPage.sector,
	students: state.classPage.students,
	studentsOfClass: state.classPage.studentsOfClass,
});

const mapDispatchToProps = {
	getInfoTeacherReq: Action.getInfoTeacherByClassIDRequest,
	getDetailReq: Action.getDetailClassRequest,
	updateDetailReq: Action.updateDetailClassRequest,
	deleteDetailReq: Action.deleteClassRequest,
	getTeachersReq: Action.getTeachersRequest,
	getSectorsReq: Action.getSectorsForClassRequest,
	getStudentsReq: Action.getStudentsForClassRequest,
	getStudentOfClassReq: Action.getStudentOfClassRequest,
	addStudentToClassReq: Action.addStudentToClassRequest,
	addTeacherToClassReq: Action.addTeacherToClassRequest,
	removeStudentOfClassReq: Action.removeStudentToClassRequest,
};

DetailClassComponent.propTypes = {
	getDetailReq: PropTypes.func.isRequired,
	getInfoTeacherReq: PropTypes.func.isRequired,
	updateDetailReq: PropTypes.func.isRequired,
	deleteDetailReq: PropTypes.func.isRequired,
	getTeachersReq: PropTypes.func.isRequired,
	getSectorsReq: PropTypes.func.isRequired,
	getStudentsReq: PropTypes.func.isRequired,
	addTeacherToClassReq: PropTypes.func.isRequired,
	getStudentOfClassReq: PropTypes.func.isRequired,
	addStudentToClassReq: PropTypes.func.isRequired,
	removeStudentOfClassReq: PropTypes.func.isRequired,
	detailClass: PropTypes.objectOf(PropTypes.any).isRequired,
	infoTeacher: PropTypes.objectOf(PropTypes.any).isRequired,
	sector: PropTypes.objectOf(PropTypes.any).isRequired,
	students: PropTypes.objectOf(PropTypes.any).isRequired,
	studentsOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	teachers: PropTypes.objectOf(PropTypes.any).isRequired,
	getDetailClassStatus: PropTypes.string.isRequired,
	updateClassStatus: PropTypes.string.isRequired,
	deleteClassStatus: PropTypes.string.isRequired,
	getStudentsStatus: PropTypes.string.isRequired,
	addStudentToClassStatus: PropTypes.string.isRequired,
	addTeacherToClassStatus: PropTypes.string.isRequired,
	removeStudentToClassStatus: PropTypes.string.isRequired,
	getStudentOfClassStatus: PropTypes.string.isRequired,
	getInfoTeacherStatus: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClassComponent);
