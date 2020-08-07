import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Input, Button, DatePicker, Select } from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import TablePoint from './Component/TablePointAll';
import TableSubjectData from './Component/TableSubjectData';
import TableStudentData from './Component/TableStudentData';
import TableScheduleData from './Component/TableScheduleData';
import ModalCreateSubject from './Component/ModalSubjectCreate';
import ModalViewExam from './Component/ModalViewExam';
import ModalLogSchedule from './Component/ModelLogSchedule';
import BreadCrumb from '../../../components/BreadCrumb';
import InfoClass from './Component/InfoClass';

const breadcrumb = [
	{
		icon: 'home',
		path: '/teacher/dashboard',
		text: '',
	},
];

function Component(props) {
	const {
		getDetailClassStatus,
		getStudentOfClassStatus,
		getSubjectOfClassStatus,
		createSubjectOfClassStatus,
		getScheduleOfClassStatus,
		getDetailExamStatus,
		updateOfClassStatus,
		getLogsScheduleOfClassStatus,
		getSubjectAllOfClassStatus,
		getPointSubjectOfStudentStatus,
		detailClass: { infoClass, countStudent },
		studentsClass,
		subjectsClass,
		schedulesClass,
		detailExam,
		subjectsOfClass,
		logsScheduleClass,
		poinOfStudent,
		getDetailClassReq,
		getStudentClassReq,
		getSubjectClassReq,
		createSubjectReq,
		updateClassReq,
		getScheduleClassReq,
		getDetailExamReq,
		getLogScheduleClassReq,
		getSubjectAllReq,
		getPointSubjectClassReq,
	} = props;
	const { ID } = useParams();
	useEffect(() => {
		getDetailClassReq({ ID });
		getStudentClassReq({
			req: {
				page: 1,
				limit: 10,
				classID: ID,
				keyword: '',
			},
		});
	}, [ID]);
	const [tabKey, setTabKey] = useState('student');
	const refSearch = useRef(null);
	const refInput = useRef(null);
	const refDatePicker = useRef(null);
	const [keyword, setKeyword] = useState('');
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleViewExam, setVisibleViewExam] = useState(false);
	const [visibleLogSchedule, setVisibleLogSchedule] = useState(false);
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const [datePick, setDatePick] = useState({});
	const [scheduleID, setScheduleID] = useState('');
	const [typeTablePoint, setTypeTablePoint] = useState(false);

	const loadingGetDetailClass = getDetailClassStatus === 'FETCHING';
	const loadingGetStudentClass = getStudentOfClassStatus === 'FETCHING';
	const loadingGetSubjectClass = getSubjectOfClassStatus === 'FETCHING';
	const loadingCreateSubject = createSubjectOfClassStatus === 'FETCHING';
	const loadingUpdateClass = updateOfClassStatus === 'FETCHING';
	const loadingGetDetailExam = getDetailExamStatus === 'FETCHING';
	const loadingGetLogSchedule = getLogsScheduleOfClassStatus === 'FETCHING';
	const loadingGetScheduleClass = getScheduleOfClassStatus === 'FETCHING';
	const loadingGetSubjectAllClass = getSubjectAllOfClassStatus === 'FETCHING';
	const loadingGetPointSubjectClass = getPointSubjectOfStudentStatus === 'FETCHING';

	const tabList = [
		{
			key: 'student',
			tab: 'Danh Sách Học Viên',
		},
		{
			key: 'point',
			tab: 'Bảng Điểm',
		},
		{
			key: 'schedule',
			tab: 'Danh Sách Lịch Thi',
		},
		{
			key: 'subject',
			tab: 'Danh Sách Môn Học',
		},
	];

	const handleSearch = value => {
		setKeyword(value);
		switch (tabKey) {
			case 'student':
				getStudentClassReq({
					req: {
						page: 1,
						limit: 10,
						classID: ID,
						keyword: value,
					},
				});
				break;

			case 'subject':
				getSubjectClassReq({
					req: {
						page: 1,
						limit: 10,
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
		setKeyword('');
		refSearch.current.input.state.value = '';
		switch (tabKey) {
			case 'student':
				getStudentClassReq({
					req: {
						page: 1,
						limit: 10,
						classID: ID,
						keyword: '',
					},
				});
				break;
			case 'subject':
				getSubjectClassReq({
					req: {
						page: 1,
						limit: 10,
						keyword: '',
						sectorID: infoClass && infoClass.trainingSectorID._id,
					},
				});
				break;

			default:
				break;
		}
	};
	const handleChangePageStudent = page => {
		getStudentClassReq({
			req: {
				page: Number(page.current),
				limit: 10,
				classID: ID,
				keyword,
			},
		});
	};
	const handleChangePageSubject = page => {
		setPageCurrent({ limit: 10, page: Number(page.current) });
		getSubjectClassReq({
			req: {
				page: Number(page.current),
				limit: 10,
				keyword,
				sectorID: infoClass && infoClass.trainingSectorID._id,
			},
		});
	};
	const handleChangeTab = key => {
		setKeyword('');
		setDatePick({});
		switch (key) {
			case 'student':
				getStudentClassReq({
					req: {
						page: 1,
						limit: 10,
						classID: ID,
						keyword: '',
					},
				});
				break;

			case 'subject':
				getSubjectClassReq({
					req: {
						page: 1,
						limit: 10,
						keyword: '',
						sectorID: infoClass && infoClass.trainingSectorID._id,
					},
				});
				break;
			case 'schedule':
				getScheduleClassReq({
					req: {
						page: 1,
						limit: 10,
						keyword: '',
						classID: infoClass && infoClass._id,
					},
				});
				break;

			default:
				getSubjectAllReq({
					req: {
						sectorID: infoClass && infoClass.trainingSectorID._id,
					},
				});
				break;
		}
		setTabKey(key);
	};
	const handleChangeDatePick = date => {
		if (date.length > 0) {
			setDatePick({
				startAt: moment(date[0]).toISOString(),
				endAt: moment(date[1]).toISOString(),
			});
			getScheduleClassReq({
				req: {
					limit: 10,
					page: 1,
					keyword,
					startAt: moment(date[0]).toISOString(),
					endAt: moment(date[1]).toISOString(),
				},
			});
		}
	};
	const handleSearchScheduleTable = value => {
		setKeyword(setKeyword);
		getScheduleClassReq({
			req: {
				page: 1,
				limit: 10,
				keyword: value,
				classID: infoClass && infoClass._id,
				...datePick,
			},
		});
	};
	const onChangeTableSchedule = page => {
		setPageCurrent({
			limit: Number(page.pageSize),
			page: Number(page.current),
		});
		getScheduleClassReq({
			req: {
				limit: Number(page.pageSize),
				page: Number(page.current),
				keyword,
				classID: infoClass && infoClass._id,
				...datePick,
			},
		});
	};
	const handleReloadScheduleTable = () => {
		setKeyword('');
		setDatePick({});
		setPageCurrent({ limit: 10, page: 1 });
		refInput.current.input.state.value = '';
		refDatePicker.current.picker.state.value = [];
		getScheduleClassReq({
			req: {
				limit: 10,
				page: 1,
				keyword,
				classID: infoClass && infoClass._id,
			},
		});
	};
	const handleViewExam = examID => {
		getDetailExamReq({
			ID: examID,
		});
		setVisibleViewExam(true);
	};
	const contentList = {
		student: (
			<Card className="phh-card">
				<div className="phh-group-search mb-10 mt-10 " style={{ alignItems: 'center' }}>
					<Input.Search
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								onClick={handleReload}
								loading={loadingGetStudentClass}
							>
								Làm mới
							</Button>
						}
						ref={refSearch}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearch}
					/>
				</div>
				<TableStudentData
					data={studentsClass && studentsClass.data}
					pagination={studentsClass && studentsClass.pagination}
					loading={loadingGetStudentClass}
					handleChangePage={handleChangePageStudent}
					classID={ID}
				/>
			</Card>
		),
		point: (
			<Card className="phh-card">
				<Row>
					<Col className="mt-15 mb-10" xs={24} md={12}>
						<div className="mr-5" style={{ display: 'flex', alignItems: 'center' }}>
							<h4 style={{ width: '150px' }}>Lọc theo môn học</h4>
							<Select
								className="select-custom"
								style={{ width: '60%' }}
								loading={loadingGetSubjectAllClass}
								placeholder="-- Môn Học --"
								onChange={value => {
									setTypeTablePoint(false);
									getPointSubjectClassReq({
										req: {
											limit: 10,
											page: 1,
											classID: ID,
											subjectID: value,
										},
									});
								}}
							>
								{subjectsOfClass &&
									subjectsOfClass.map(ele => (
										<Select.Option value={ele.subjectID._id} key={ele._id}>
											{ele.subjectID.name}
										</Select.Option>
									))}
							</Select>
						</div>
					</Col>
					<Col className="mt-15 mb-10" xs={24} md={12}>
						<div className="phh-group-search" style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button className="mr-5" style={{ height: '35px', color: 'white' }} icon="sync">
								Làm mới
							</Button>
							<Button className=" mr-5" style={{ height: '35px', color: 'white' }} icon="file-excel">
								Bảng điểm tổng
							</Button>
							<Button className="" style={{ height: '35px', color: 'white' }} icon="file-excel">
								Xuất excel
							</Button>
						</div>
					</Col>
				</Row>

				<TablePoint dataPoint={poinOfStudent} type={typeTablePoint} loading={loadingGetPointSubjectClass} />
			</Card>
		),
		schedule: (
			<Card className="phh-card">
				<div className="mt-15 mb-10">
					<Row gutter={16}>
						<Col xs={24} md={24}>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<h3>Lọc theo ngày tháng :&ensp;</h3>
								<DatePicker.RangePicker
									className="phh-date-pick"
									ref={refDatePicker}
									format="DD-MM-YYYY"
									placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
									onChange={handleChangeDatePick}
								/>
							</div>
						</Col>
					</Row>
				</div>
				<div className="phh-group-search mb-10">
					<Input.Search
						ref={refInput}
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								loading={loadingGetScheduleClass}
								onClick={handleReloadScheduleTable}
							>
								Làm mới
							</Button>
						}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearchScheduleTable}
					/>
				</div>
				<TableScheduleData
					data={schedulesClass && schedulesClass.data}
					pagination={schedulesClass && schedulesClass.pagination}
					loading={loadingGetScheduleClass}
					handleChangePage={onChangeTableSchedule}
					classID={ID}
					loadingGetExam={loadingGetDetailExam}
					handleViewExam={handleViewExam}
					setScheduleID={setScheduleID}
					setVisibleLogSchedule={setVisibleLogSchedule}
					getLogScheduleReq={getLogScheduleClassReq}
					loadingGetLog={loadingGetLogSchedule}
				/>
			</Card>
		),
		subject: (
			<Card className="phh-card">
				<div className="phh-group-search mb-10 mt-10 flex" style={{ alignItems: 'center' }}>
					<Input.Search
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								onClick={handleReload}
								loading={loadingGetSubjectClass}
							>
								Làm mới
							</Button>
						}
						ref={refSearch}
						placeholder="Nhập từ khóa.."
						enterButton
						onSearch={handleSearch}
					/>
					{/* <span className="group-btn">
						<Tooltip title="Thêm mới môn học">
							<Button icon="plus" style={{ height: '40px' }} />
						</Tooltip>
					</span> */}
				</div>
				<TableSubjectData
					data={subjectsClass && subjectsClass.data}
					pagination={subjectsClass && subjectsClass.pagination}
					loading={loadingGetSubjectClass}
					handleChangePage={handleChangePageSubject}
					classID={ID}
				/>
			</Card>
		),
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="appstore" visible={false} pageCurrentText="Lớp Học" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col xs={24} sm={24} md={24} className="mb-10">
						<Card title="Thông Tin Lớp Học" className="phh-card" loading={loadingGetDetailClass}>
							<InfoClass
								info={{ countStudent, infoClass }}
								updateReq={updateClassReq}
								loadingUpdate={loadingUpdateClass}
							/>
						</Card>
					</Col>
					<Col xs={24} sm={24} md={24} className="mb-10">
						<Card
							className="phh-card card-body-transparent mb-10 tab-custom"
							tabList={tabList}
							activeTabKey={tabKey}
							onTabChange={key => handleChangeTab(key)}
						/>
						{contentList[tabKey]}
					</Col>
				</Row>
			</div>
			<ModalCreateSubject
				createReq={createSubjectReq}
				loadingCreate={loadingCreateSubject}
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				pageCurrent={pageCurrent}
				keyword={keyword}
				sectorID={infoClass && infoClass.trainingSectorID._id}
			/>
			<ModalViewExam
				visible={visibleViewExam}
				setVisible={setVisibleViewExam}
				data={detailExam}
				loading={loadingGetDetailExam}
			/>
			<ModalLogSchedule
				visible={visibleLogSchedule}
				setVisible={setVisibleLogSchedule}
				classID={ID}
				scheduleID={scheduleID}
				getLogScheduleReq={getLogScheduleClassReq}
				dataLog={logsScheduleClass}
				loading={loadingGetLogSchedule}
			/>
		</div>
	);
}

Component.propTypes = {
	getDetailClassStatus: PropTypes.string.isRequired,
	getStudentOfClassStatus: PropTypes.string.isRequired,
	getSubjectOfClassStatus: PropTypes.string.isRequired,
	createSubjectOfClassStatus: PropTypes.string.isRequired,
	updateOfClassStatus: PropTypes.string.isRequired,
	getScheduleOfClassStatus: PropTypes.string.isRequired,
	getDetailExamStatus: PropTypes.string.isRequired,
	getSubjectAllOfClassStatus: PropTypes.string.isRequired,
	getLogsScheduleOfClassStatus: PropTypes.string.isRequired,
	getPointSubjectOfStudentStatus: PropTypes.string.isRequired,
	detailClass: PropTypes.objectOf(PropTypes.any).isRequired,
	getDetailClassReq: PropTypes.func.isRequired,
	getStudentClassReq: PropTypes.func.isRequired,
	getSubjectClassReq: PropTypes.func.isRequired,
	createSubjectReq: PropTypes.func.isRequired,
	updateClassReq: PropTypes.func.isRequired,
	getScheduleClassReq: PropTypes.func.isRequired,
	getDetailExamReq: PropTypes.func.isRequired,
	getLogScheduleClassReq: PropTypes.func.isRequired,
	getSubjectAllReq: PropTypes.func.isRequired,
	getPointSubjectClassReq: PropTypes.func.isRequired,
	studentsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	schedulesClass: PropTypes.objectOf(PropTypes.any).isRequired,
	detailExam: PropTypes.objectOf(PropTypes.any).isRequired,
	logsScheduleClass: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsOfClass: PropTypes.objectOf(PropTypes.any).isRequired,
	poinOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Component;
