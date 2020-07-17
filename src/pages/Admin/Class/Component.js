import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Card, Input, Button, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import BreadCrumb from '../../../components/BreadCrumb';
import TableDataClass from './Component/TableData';
import ModalCreate from './Component/ModalCreate';
import ModalListStudent from './Component/ModalStudent';
import customMess from '../../../utils/customMessage';

import { ClassStyled } from './styled';

const { confirm } = Modal;
const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];


function ClassComponent(props) {
	const {
		getClassesReq,
//		filterReq,
		searchClassReq,
		createClassReq,
		deleteClassReq,
		searchTeacherReq,
		getTeachersReq,
		getSectorsReq,
		getStudentOfClassReq,
		getStudentsReq,
		addStudentToClassReq,
		removeStudentClassReq,
		addStudentToClassStatus,
		removeStudentToClassStatus,
		getStudentsStatus,
		getStudentOfClassStatus,
		getClassesStatus,
	//	filterClassStatus,
		searchClassStatus,
		createClassStatus,
		deleteClassStatus,
		getSectorsStatus,
		classes: { data, pagination },
		sector,
		students,
		studentsOfClass,
	} = props;

	useEffect(() => {
		getClassesReq({
			req: {
				page: 1,
				limit: 10,
				status: '',
				keyword: '',
			},
		});
		getStudentsReq({
			req: {
				limit: 3,
				page: 1,
				keyword: '',
				type: 'student',
			},
		});
	}, [getClassesReq, getStudentsReq]);

	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleListStudent, setVisibleListStudent] = useState(false);
	const [keyWord, setKeyWord] = useState('');
	const [statusClass, setStatusClass] = useState('');
	const [pageCurrent, setPageCurrent] = useState({
		page: 1,
		limit: 10,
	});
const [classData, setClassData] = useState({});

	const history = useHistory();
	const refInputSearchClass = useRef(null);

	const loadingGetClasses = getClassesStatus === 'FETCHING';
//	const loadingFilterClass = filterClassStatus === 'FETCHING';
	const loadingSearchClass = searchClassStatus === 'FETCHING';
	const loadingCreateClass = createClassStatus === 'FETCHING';
	const loadingDeleteClass = deleteClassStatus === 'FETCHING';
	const loadingGetSector = getSectorsStatus === 'FETCHING';
	const loadingGetStudents = getStudentsStatus === 'FETCHING';
	const loadingGetStudentOfClass = getStudentOfClassStatus === 'FETCHING';
	const loadingAddStudentToClass = addStudentToClassStatus === 'FETCHING';
	const loadingRemoveStudentOfClass = removeStudentToClassStatus === 'FETCHING';

	const handleSearchClass = value => {
		setKeyWord(value);
		searchClassReq({
			req: {
				keyword: value,
				page: 1,
				limit: 10,
				status: statusClass,
			},
		});
	};
	const handleCreateClass = createData => {
		createClassReq({
			req: { ...createData },
			keyword: keyWord,
			status: statusClass,
			pageCurrent,
			cb: res => {
				if (res.isCreated) {
					setVisibleCreate(false);
					customMess('notification', 'success', res.msg);
				}
			},
		});
	};
	const handleReloadClass = () => {
		setKeyWord('');
		setStatusClass([]);
		refInputSearchClass.current.input.state.value = '';
		setPageCurrent({
			page: 1,
			limit: 10,
		});
		getClassesReq({
			req: {
				page: 1,
				limit: 10,
				status: [],
				keyword: '',
			},
		});
	};
	// const handleFilter = checkedValues => {
	// 	setStatusClass(checkedValues);
	// 	filterReq({
	// 		req: {
	// 			staus: checkedValues,
	// 		},
	// 	});
	// };
	const handleDelete = dataClass => {
		confirm({
			title: `Bạn có muốn xóa lớp học có mã lớp là ${dataClass.name} ?`,
			onOk() {
				deleteClassReq({
					ID: dataClass._id,
					pageCurrent,
					keyword: keyWord,
					status: statusClass,
					cb: res => {
						if (res.isDeleted) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const handleChangePageClass = page => {
		setPageCurrent({
			page: Number(page.current),
			limit: 10,
		});
		getClassesReq({
			req: {
				page: Number(page.current),
				limit: 10,
				status: statusClass,
				keyword: keyWord,
			},
		});
	};
	const handleOpenListStudent = row => {
		setClassData(row);
		getStudentOfClassReq({
			req: {
				limit: 3,
				page: 1,
				keyword: '',
				classID: row._id,
			},
		});
		setVisibleListStudent(true);
	};
	return (
		<ClassStyled>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Quản lý lớp học" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card
					className="phh-card"
					title="Danh sách lớp học"
					extra={
						<span className="group-btn">
							<Button type="primary" className="btn" icon="plus" onClick={() => setVisibleCreate(true)}>
								Thêm mới lớp học
							</Button>
							<Button className="btn-analy" icon="area-chart" onClick={() => history.push('/admin/lop-hoc/thong-ke')}>
								Thống kê
							</Button>
						</span>
					}
				>
					<div className="phh-group-search mb-10">
						{/* <Dropdown overlay={<Checkbox.Group onChange={handleFilter} options={optionFilter} />} trigger={['click']}>
							<Tooltip title="Lọc">{loadingFilterClass ? <Icon type="loading" /> : <Icon type="filter" />}</Tooltip>
						</Dropdown> */}
						<Input.Search
							ref={refInputSearchClass}
							addonBefore={
								<Button
									className="btn-reload"
									style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
									icon="sync"
									loading={loadingGetClasses}
									onClick={handleReloadClass}
								>
									Làm mới
								</Button>
							}
							placeholder="Nhập từ khóa.."
							enterButton
							onSearch={handleSearchClass}
						/>
					</div>
					<TableDataClass
						data={data}
						pagination={pagination}
						loading={loadingGetClasses}
						loadingSearch={loadingSearchClass}
						openListStudent={handleOpenListStudent}
						loadingDeleteClass={loadingDeleteClass}
						openDeleteClass={handleDelete}
						onTableChange={handleChangePageClass}
					/>
				</Card>
			</div>
			<ModalCreate
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				sectorData={sector}
				loading={loadingCreateClass}
				handleCreate={handleCreateClass}
				getTeachersReq={getTeachersReq}
				searchTeacherReq={searchTeacherReq}
				getSectorsReq={getSectorsReq}
				loadingGetSector={loadingGetSector}
			/>
			<ModalListStudent
				visible={visibleListStudent}
				setVisible={setVisibleListStudent}
				listStudent={studentsOfClass && studentsOfClass.data}
				loadingGetStudents={loadingGetStudents}
				loadingGetStudentOfClass={loadingGetStudentOfClass}
				paginationStudentOfClass={studentsOfClass && studentsOfClass.pagination}
				listStudentPartner={students && students.data}
				paginationStudents={students && students.pagination}
				getStudentOfClassReq={getStudentOfClassReq}
				getStudentsReq={getStudentsReq}
				loadingAddStudentToClass={loadingAddStudentToClass}
				loadingRemoveStudentOfClass={loadingRemoveStudentOfClass}
				addStudentToClassReq={addStudentToClassReq}
				removeStudentClassReq={removeStudentClassReq}
				classData={classData}
			/>
		</ClassStyled>
	);
}

ClassComponent.propTypes = {
	getClassesReq: PropTypes.func.isRequired,
//	filterReq: PropTypes.func.isRequired,
	searchClassReq: PropTypes.func.isRequired,
	createClassReq: PropTypes.func.isRequired,
	deleteClassReq: PropTypes.func.isRequired,
	getTeachersReq: PropTypes.func.isRequired,
	searchTeacherReq: PropTypes.func.isRequired,
	getSectorsReq: PropTypes.func.isRequired,
	getStudentsReq: PropTypes.func.isRequired,
	getStudentOfClassReq: PropTypes.func.isRequired,
	addStudentToClassReq: PropTypes.func.isRequired,
	removeStudentClassReq: PropTypes.func.isRequired,
	getClassesStatus: PropTypes.string.isRequired,
//	filterClassStatus: PropTypes.string.isRequired,
	searchClassStatus: PropTypes.string.isRequired,
	createClassStatus: PropTypes.string.isRequired,
	deleteClassStatus: PropTypes.string.isRequired,
	getSectorsStatus: PropTypes.string.isRequired,
	getStudentsStatus: PropTypes.string.isRequired,
	addStudentToClassStatus: PropTypes.string.isRequired,
	removeStudentToClassStatus: PropTypes.string.isRequired,
	getStudentOfClassStatus: PropTypes.string.isRequired,
	sector: PropTypes.instanceOf(Array).isRequired,
	students: PropTypes.instanceOf(Array).isRequired,
	studentsOfClass: PropTypes.instanceOf(Array).isRequired,
	classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ClassComponent;
