import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, Button, ConfigProvider, Icon, Table, Tooltip } from 'antd';
import _ from 'lodash';

import LoadingCustom from '../../../../components/LoadingCustom';

function ModalPickSubject(props) {
	const {
		visible,
		setVisible,
		loadingGetSubject,
		getSubjectReq,
		sectorID,
		onPick,
		subjectsData: { data, pagination },
		subjectCurrent,
	} = props;
	const refInput = useRef(null);
	const [keyword, setKeyword] = useState('');
	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
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
			title: 'Hành động',
			key: 'actions',
			render: row => {
				if (row.subjectID._id === subjectCurrent) return '';
				return (
					<span className="phh-group-btn-action">
						<Tooltip title="Chọn">
							<Button className="btn-edit" icon="select" onClick={() => onPick(row.subjectID._id)} />
						</Tooltip>
					</span>
				);
			},
		},
	];

	const handleCheckData = subjectData => {
		let listRemoveID = [];
		const result = subjectData;
		if (subjectData.length > 0) {
			listRemoveID = subjectData.map(ele => {
				if (_.isNull(ele.subjectID)) return ele._id;
				return 0;
			});
		}
		if (listRemoveID.length > 0) {
			listRemoveID.map(item => {
				return _.remove(subjectData, ele => ele._id === item);
			});
		}
		return result;
	};

	const onChangeTable = page => {
		getSubjectReq({
			req: {
				limit: Number(page.limit),
				page: Number(page.current),
				keyword,
				sectorID,
			},
		});
	};
	const handleReload = () => {
		refInput.current.input.state.value = '';
		setKeyword('');
		getSubjectReq({
			req: {
				sectorID,
				keyword: '',
				page: 1,
				limit: 10,
			},
		});
	};
	const handleSearch = value => {
		setKeyword(value);
		getSubjectReq({
			req: {
				sectorID,
				keyword: value,
				page: 1,
				limit: 10,
			},
		});
	};

	return (
		<Modal
			title="Danh sách môn học"
			width="700px"
			className="phh-modal"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
		>
			<div>
				<div className="phh-group-search mt-10 mb-10">
					<Input.Search
						ref={refInput}
						addonBefore={
							<Button
								className="btn-reload"
								style={{ backgroundColor: 'red !important', height: '35px', color: 'black' }}
								icon="sync"
								onClick={handleReload}
							>
								Làm mới
							</Button>
						}
						placeholder="Nhập từ khóa.."
						onSearch={handleSearch}
					/>
				</div>
				<ConfigProvider
					renderEmpty={() => (
						<div style={{ textAlign: 'center' }}>
							<Icon type="frown" style={{ fontSize: 20 }} />
							<h1 style={{ color: 'silver', fontSize: 20 }}>Không có dữ liệu</h1>
						</div>
					)}
				>
					<Table
						className="phh-table"
						dataSource={handleCheckData(data)}
						onChange={onChangeTable}
						columns={columns}
						rowKey={ele => ele.subjectID._id}
						scroll={{ x: true }}
						loading={{
							spinning: loadingGetSubject,
							indicator: <LoadingCustom margin={0} />,
						}}
						pagination={{
							current: pagination.page && Number(pagination.page),
							total: pagination.total,
							pageSize: pagination.limit && Number(pagination.limit),
							defaultCurrent: pagination.page && Number(pagination.page),
						}}
					/>
				</ConfigProvider>
			</div>
		</Modal>
	);
}

ModalPickSubject.propTypes = {
	subjectCurrent: PropTypes.string.isRequired,
	sectorID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	loadingGetSubject: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	onPick: PropTypes.func.isRequired,
	getSubjectReq: PropTypes.func.isRequired,
	subjectsData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalPickSubject;
