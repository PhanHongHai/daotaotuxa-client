import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Input, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import customMess from '../../../utils/customMessage';
import BreadCrumb from '../../../components/BreadCrumb';
import TableDataSector from './Component/TableData';
import ModalCreateSector from './Component/ModalCreate';
import ModalUpdateSector from './Component/ModalEdit';
import ModalSubject from './Component/ModalSubject';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
];

function TraniningSector(props) {
	const {
		sectors: { data, pagination },
		createSectorStatus,
		searchSectorStatus,
		getSectorsStatus,
		updateSectorStatus,
		deleteSectorStatus,
		subjectsOfSector,
		subjectsForSector,
		getSubjectsForSectorStatus,
		getSubjectsOfSectorStatus,
		addSubjectToSectorStatus,
		removeSubjectOfSectorStatus,
		getSectorsReq,
		searchSectorReq,
		createSectorReq,
		deleteSectorReq,
		updateSectorReq,
		getSubjectsForSectorReq,
		getSubjectsOfSectorReq,
		addSubjectToSectorReq,
		removeSubjectFromSectorReq,
	} = props;

	useEffect(() => {
		getSectorsReq({
			req: {
				page: 1,
				limit: 10,
				keyword: '',
			},
		});
	}, [getSectorsReq]);

	const loadingGetSectors = getSectorsStatus === 'FETCHING';
	const loadingSearchSector = searchSectorStatus === 'FETCHING';
	const loadingCreateSector = createSectorStatus === 'FETCHING';
	const loadingUpdateSector = updateSectorStatus === 'FETCHING';
	const loadingDeleteSector = deleteSectorStatus === 'FETCHING';
	const loadingGetSubjectOfSector = getSubjectsOfSectorStatus === 'FETCHING';
	const loadingGetSubjectForSector = getSubjectsForSectorStatus === 'FETCHING';
	const loadingAddSubjectToSector = addSubjectToSectorStatus === 'FETCHING';
	const loadingRemoveSubjectFromSector = removeSubjectOfSectorStatus === 'FETCHING';

	const [visibleCreate, setVisibleCreate] = useState(false);
	const [visibleUpdate, setvisibleUpdate] = useState(false);
	const [visibleOpenSubject, setVisibleOpenSubject] = useState(false);
	const [keywordSector, setKeywordSector] = useState('');
	const [infoSector, setInfoSector] = useState({});
	const [pageSectorCurrent, setPageSectorCurrent] = useState({
		page: 1,
		limit: 10,
	});

	const handleConfirmDeleteSector = sector => {
		Modal.confirm({
			title: `Bạn muốn xóa ${sector.name} ?`,
			onOk() {
				deleteSectorReq({
					ID: sector._id,
					pageCurrent: pageSectorCurrent,
					keyword: keywordSector,
					cb: res => {
						if (res && res.isDeleted) customMess('notification', 'success', res.msg);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};
	const handleSearchSector = value => {
		setKeywordSector(value);
		searchSectorReq({
			req: {
				limit: 10,
				page: 1,
				keyword: value,
			},
		});
	};
	const handleResetSector = () => {
		getSectorsReq({
			req: {
				limit: 10,
				page: 1,
				keyword: '',
			},
		});
	};
	const onTableChange = page => {
		setPageSectorCurrent({ page: Number(page.current), limit: 10 });
		getSectorsReq({
			req: {
				limit: 10,
				page: page.current,
				keyword: keywordSector,
			},
		});
	};
	const handleOpenSubject = row => {
		setInfoSector(row);
		getSubjectsOfSectorReq({
			req: {
				page: 1,
				limit: 5,
				sectorID: row._id,
			},
		});
		setVisibleOpenSubject(true);
	};
	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} pageCurrentText="Quản lý ngành đào tạo" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card
					className="phh-card"
					title="Danh sách ngành"
					extra={
						<span className="group-btn">
							<Button type="primary" className="btn" icon="plus" onClick={() => setVisibleCreate(true)}>
								Thêm ngành
							</Button>
						</span>
					}
				>
					<div className="phh-group-search mb-10">
						<Input.Search
							addonBefore={
								<Button
									className="btn-reload"
									style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
									icon="sync"
									onClick={handleResetSector}
								>
									Làm mới
								</Button>
							}
							placeholder="Nhập từ khóa.."
							enterButton="Tìm kiếm"
							onSearch={handleSearchSector}
						/>
					</div>
					<TableDataSector
						data={data}
						pagination={pagination}
						loading={loadingGetSectors}
						loadingSearch={loadingSearchSector}
						setVisibleUpdate={setvisibleUpdate}
						handleRemove={handleConfirmDeleteSector}
						loadingRemove={loadingDeleteSector}
						setInfo={setInfoSector}
						onTableChange={onTableChange}
						handleOpenSubject={handleOpenSubject}
						loadingGetSubjectOfSector={loadingGetSubjectOfSector}
					/>
				</Card>
			</div>
			<ModalCreateSector
				visible={visibleCreate}
				setVisible={setVisibleCreate}
				loading={loadingCreateSector}
				pageCurrent={pageSectorCurrent}
				createReq={createSectorReq}
				keyword={keywordSector}
			/>
			<ModalUpdateSector
				visible={visibleUpdate}
				setVisible={setvisibleUpdate}
				data={infoSector}
				loading={loadingUpdateSector}
				pageCurrent={pageSectorCurrent}
				updateReq={updateSectorReq}
				keyword={keywordSector}
			/>
			<ModalSubject
				visible={visibleOpenSubject}
				subjectsOfSector={subjectsOfSector}
				subjectsForSector={subjectsForSector}
				getSubjectsForSectorReq={getSubjectsForSectorReq}
				getSubjectsOfSectorReq={getSubjectsOfSectorReq}
				addSubjectToSectorReq={addSubjectToSectorReq}
				removeSubjectFromSectorReq={removeSubjectFromSectorReq}
				loadingGetSubjectOfSector={loadingGetSubjectOfSector}
				loadingGetSubjectForSector={loadingGetSubjectForSector}
				loadingAddSubjectToSector={loadingAddSubjectToSector}
				loadingRemoveSubjectFromSector={loadingRemoveSubjectFromSector}
				setVisible={setVisibleOpenSubject}
				sectorID={infoSector && infoSector._id}
			/>
		</div>
	);
}

TraniningSector.propTypes = {
	sectors: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsOfSector: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsForSector: PropTypes.objectOf(PropTypes.any).isRequired,
	getSubjectsForSectorStatus: PropTypes.string.isRequired,
	getSubjectsOfSectorStatus: PropTypes.string.isRequired,
	addSubjectToSectorStatus: PropTypes.string.isRequired,
	removeSubjectOfSectorStatus: PropTypes.string.isRequired,
	createSectorStatus: PropTypes.string.isRequired,
	searchSectorStatus: PropTypes.string.isRequired,
	getSectorsStatus: PropTypes.string.isRequired,
	updateSectorStatus: PropTypes.string.isRequired,
	deleteSectorStatus: PropTypes.string.isRequired,
	getSectorsReq: PropTypes.func.isRequired,
	searchSectorReq: PropTypes.func.isRequired,
	createSectorReq: PropTypes.func.isRequired,
	deleteSectorReq: PropTypes.func.isRequired,
	updateSectorReq: PropTypes.func.isRequired,
	getSubjectsForSectorReq: PropTypes.func.isRequired,
	getSubjectsOfSectorReq: PropTypes.func.isRequired,
	addSubjectToSectorReq: PropTypes.func.isRequired,
	removeSubjectFromSectorReq: PropTypes.func.isRequired,
};

export default TraniningSector;
