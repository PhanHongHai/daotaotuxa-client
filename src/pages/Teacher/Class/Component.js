import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Input, Button, Tooltip } from 'antd';
import { useParams } from 'react-router-dom';

import TablePoint from './Component/TablePointAll';
import TableSubjectData from './Component/TableSubjectData';
import TableStudentData from './Component/TableStudentData';
import ModalCreateSubject from './Component/ModalSubjectCreate';
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
		updateOfClassStatus,
		detailClass: { infoClass, countStudent },
		studentsClass,
		subjectsClass,
		getDetailClassReq,
		getStudentClassReq,
		getSubjectClassReq,
		createSubjectReq,
		updateClassReq
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
	const [keyword, setKeyword] = useState('');
	const [visibleCreate, setVisibleCreate] = useState(false);
	const [pageCurrent, setPageCurrent] = useState({ limit: 10, page: 1 });
	const loadingGetDetailClass = getDetailClassStatus === 'FETCHING';
	const loadingGetStudentClass = getStudentOfClassStatus === 'FETCHING';
	const loadingGetSubjectClass = getSubjectOfClassStatus === 'FETCHING';
	const loadingCreateSubject = createSubjectOfClassStatus === 'FECTHING';
	const loadingUpdateClass = updateOfClassStatus === 'FECTHING';

	const tabList = [
		{
			key: 'student',
			tab: 'Danh Sách Học Viên',
		},
		{
			key: 'point',
			tab: 'Danh Sách Điểm',
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

			default:
				break;
		}
		setTabKey(key);
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
				<div className="phh-group-search mb-10 mt-10 " style={{ alignItems: 'center' }}>
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
						ref={refSearch}
						placeholder="Nhập từ khóa.."
						enterButton
					/>
				</div>
				<TablePoint data={[]} />
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
							<InfoClass info={{ countStudent, infoClass }} updateReq={updateClassReq} loadingUpdate={loadingUpdateClass} />
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
		</div>
	);
}

Component.propTypes = {
	getDetailClassStatus: PropTypes.string.isRequired,
	getStudentOfClassStatus: PropTypes.string.isRequired,
	getSubjectOfClassStatus: PropTypes.string.isRequired,
	createSubjectOfClassStatus: PropTypes.string.isRequired,
	updateOfClassStatus: PropTypes.string.isRequired,
	detailClass: PropTypes.objectOf(PropTypes.any).isRequired,
	getDetailClassReq: PropTypes.func.isRequired,
	getStudentClassReq: PropTypes.func.isRequired,
	getSubjectClassReq: PropTypes.func.isRequired,
	createSubjectReq: PropTypes.func.isRequired,
	updateClassReq: PropTypes.func.isRequired,
	studentsClass: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsClass: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Component;
