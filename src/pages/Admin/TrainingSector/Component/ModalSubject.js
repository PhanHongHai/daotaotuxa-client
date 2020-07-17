import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Tabs, Table, ConfigProvider, Icon, Tooltip, Input } from 'antd';

import customMess from '../../../../utils/customMessage';
import LoadingCustom from '../../../../components/LoadingCustom';
import { TabStyle } from '../styled';

const { TabPane } = Tabs;

function ModalSubject(props) {
	const {
		visible,
		setVisible,
		loadingGetSubjectOfSector,
		loadingGetSubjectForSector,
		loadingAddSubjectToSector,
		loadingRemoveSubjectFromSector,
		getSubjectsForSectorReq,
		getSubjectsOfSectorReq,
		addSubjectToSectorReq,
		removeSubjectFromSectorReq,
		subjectsOfSector,
		subjectsForSector,
		sectorID,
	} = props;
	const refSearch = useRef(null);
	const [pageCurrent, setPageCurrent] = useState({ limit: 5, page: 1 });
	const [tabKey, setTabKey] = useState('subjectOfSector');
	const [keyword, setKeyword] = useState('');
	const columnAllSubject = [
		{
			title: 'Mã môn học',
			dataIndex: 'tag',
			key: 'tag',
			render: value => <span>#{value}</span>,
		},
		{
			title: 'Tên môn học',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'introduce',
			key: 'introduce',
			render: value => (value.length > 20 ? <Tooltip title={value}>{value.slice(0, 20)}...</Tooltip> : value),
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: row => (
				<span className="phh-group-btn-action">
					<Tooltip title="Thêm">
						<Button
							loading={loadingAddSubjectToSector}
							onClick={() => {
								addSubjectToSectorReq({
									req: {
										subjectID: row._id,
										sectorID,
									},
									pageCurrent,
									keyword,
									cb: res => {
										if (res && res.isCreated) customMess('notification', 'success', res.msg);
									},
								});
							}}
							icon="plus"
						/>
					</Tooltip>
				</span>
			),
		},
	];
	const columnSubjectOfSector = [
		{
			title: 'Mã môn học',
			dataIndex: 'subjectID.tag',
			key: 'tag',
			render: value => <span>#{value}</span>,
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectID.name',
			key: 'name',
		},
		{
			title: 'Mô tả',
			dataIndex: 'subjectID.introduce',
			key: 'introduce',
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: row => (
				<span className="phh-group-btn-action">
					<Tooltip title="Xóa">
						<Button
							loading={loadingRemoveSubjectFromSector}
							onClick={() => {
								removeSubjectFromSectorReq({
									ID: row._id,
									sectorID,
									cb: res => {
										if (res && res.isRemoved) customMess('notification', 'success', res.msg);
									},
								});
							}}
							icon="close"
						/>
					</Tooltip>
				</span>
			),
		},
	];
	const handleChangeTab = key => {
		setTabKey(key);
		if (key === 'subjectForSector')
			getSubjectsForSectorReq({
				req: {
					limit: 10,
					page: 1,
					keyword: '',
					sectorID,
				},
			});
		if (key === 'subjectOfSector')
			getSubjectsOfSectorReq({
				req: {
					limit: 10,
					page: 1,
					sectorID,
				},
			});
	};
	const handleChangeSubjectForSector = page => {
		setPageCurrent({
			limit: 5,
			page: Number(page.current),
		});
		getSubjectsForSectorReq({
			req: {
				limit: 5,
				page: Number(page.current),
				keyword,
				sectorID,
			},
		});
	};
	const handleChangeSubjectOfSector = page => {
		getSubjectsOfSectorReq({
			req: {
				limit: 5,
				page: Number(page.current),
				sectorID,
			},
		});
	};
	const handleSearch = value => {
		setKeyword(value);
		getSubjectsForSectorReq({
			req: {
				limit: 5,
				page: 1,
				keyword: value,
				sectorID,
			},
		});
	};
	const handleReload = () => {
		setKeyword('');
		refSearch.current.input.state.value = '';
		setPageCurrent({ limit: 5, page: 1 });
		getSubjectsForSectorReq({
			req: {
				limit: 5,
				page: 1,
				keyword: '',
				sectorID,
			},
		});
	};
	return (
		<Modal
			className="phh-modal"
			visible={visible}
			title="Danh sách môn học"
			width={600}
			onCancel={() => {
				setTabKey('subjectOfSector');
				setVisible(false);
			}}
			footer={null}
		>
			<TabStyle type="card tab-custom" activeKey={tabKey} onChange={handleChangeTab}>
				<TabPane
					tab={
						<span className="title-tab">
							<Icon type="info-circle" />
							&ensp;Danh sách môn học của ngành
						</span>
					}
					key="subjectOfSector"
				>
					<div className="phh-group-search mb-10">
						<Input.Search
							ref={refSearch}
							addonBefore={
								<Tooltip title="Làm mới">
									<Button
										className="btn-reload"
										style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
										icon="sync"
									/>
								</Tooltip>
							}
							placeholder="Nhập từ khóa.."
							enterButton
						/>
					</div>
					<ConfigProvider
						renderEmpty={() => (
							<div style={{ textAlign: 'center' }}>
								<Icon type="frown" style={{ fontSize: 25 }} />
								<h1 style={{ color: 'silver', fontSize: 20 }}>Không có dữ liệu</h1>
							</div>
						)}
					>
						<Table
							rowKey="_id"
							className="phh-table"
							size="small"
							onChange={handleChangeSubjectOfSector}
							scroll={{ x: true, y: true }}
							dataSource={subjectsOfSector && subjectsOfSector.data}
							columns={columnSubjectOfSector}
							loading={{
								spinning: loadingGetSubjectOfSector,
								indicator: <LoadingCustom margin={0} />,
							}}
						/>
					</ConfigProvider>
				</TabPane>
				<TabPane
					tab={
						<span className="title-tab">
							<Icon type="info-circle" />
							&ensp;Danh sách tất cả môn học
						</span>
					}
					key="subjectForSector"
				>
					<div className="phh-group-search mb-10">
						<Input.Search
							ref={refSearch}
							onSearch={handleSearch}
							addonBefore={
								<Tooltip title="Làm mới">
									<Button
										className="btn-reload"
										style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
										icon="sync"
										onClick={handleReload}
									/>
								</Tooltip>
							}
							placeholder="Nhập từ khóa.."
							enterButton
						/>
					</div>
					<ConfigProvider
						renderEmpty={() => (
							<div style={{ textAlign: 'center' }}>
								<Icon type="frown" style={{ fontSize: 25 }} />
								<h1 style={{ color: 'silver', fontSize: 20 }}>Không có dữ liệu</h1>
							</div>
						)}
					>
						<Table
							rowKey="_id"
							className="phh-table"
							onChange={handleChangeSubjectForSector}
							size="small"
							scroll={{ x: true, y: true }}
							dataSource={subjectsForSector && subjectsForSector.data}
							columns={columnAllSubject}
							loading={{
								spinning: loadingGetSubjectForSector,
								indicator: <LoadingCustom margin={0} />,
							}}
						/>
					</ConfigProvider>
				</TabPane>
			</TabStyle>
		</Modal>
	);
}

ModalSubject.propTypes = {
	visible: PropTypes.bool.isRequired,
	loadingGetSubjectOfSector: PropTypes.bool.isRequired,
	loadingGetSubjectForSector: PropTypes.bool.isRequired,
	loadingAddSubjectToSector: PropTypes.bool.isRequired,
	loadingRemoveSubjectFromSector: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getSubjectsForSectorReq: PropTypes.func.isRequired,
	getSubjectsOfSectorReq: PropTypes.func.isRequired,
	addSubjectToSectorReq: PropTypes.func.isRequired,
	removeSubjectFromSectorReq: PropTypes.func.isRequired,
	subjectsOfSector: PropTypes.objectOf(PropTypes.any).isRequired,
	subjectsForSector: PropTypes.objectOf(PropTypes.any).isRequired,
	sectorID: PropTypes.string.isRequired,
};

export default ModalSubject;
