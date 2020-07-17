import React from 'react';
import PropTypes from 'prop-types';
import { Button, ConfigProvider, Table, Icon, Tooltip } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import { trainingType } from '../../../../constands/Other';

function TableDataSector(props) {
	const {
		onTableChange,
		data,
		loading,
		loadingSearch,
		pagination,
		setVisibleUpdate,
		handleRemove,
		loadingRemove,
		loadingGetSubjectOfSector,
		handleOpenSubject,
		setInfo,
	} = props;

	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã ngành',
			dataIndex: 'idSector',
			key: 'idSector',
			render: () => <span>67345345</span>,
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Hệ',
			dataIndex: 'type',
			key: 'type',
			render: value => {
				return trainingType.find(ele => ele.key === value).value;
			},
		},
		{
			title: 'Thao Tác',
			key: 'actions',
			render: row => {
				return (
					<span className="phh-group-btn-action">
						<Tooltip title="Môn Học">
							<Button loading={loadingGetSubjectOfSector} icon="book" onClick={() => handleOpenSubject(row)} />
						</Tooltip>
						<Tooltip title="Cập nhật">
							<Button
								className="btn-edit"
								icon="edit"
								onClick={() => {
									setInfo(row);
									setVisibleUpdate(true);
								}}
							/>
						</Tooltip>
						<Tooltip title="Xóa">
							<Button className="btn-delete" icon="delete" loading={loadingRemove} onClick={() => handleRemove(row)} />
						</Tooltip>
					</span>
				);
			},
		},
	];

	return (
		<>
			<ConfigProvider
				renderEmpty={() => (
					<div style={{ textAlign: 'center' }}>
						<Icon type="frown" style={{ fontSize: 30 }} />
						<h1 style={{ color: 'silver' }}>Không có dữ liệu</h1>
					</div>
				)}
			>
				<Table
					className="phh-table"
					rowKey={ele => ele.id}
					onChange={onTableChange}
					dataSource={data}
					columns={columns}
					scroll={{ x: true }}
					loading={{
						spinning: loading || loadingSearch,
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
		</>
	);
}

TableDataSector.propTypes = {
	pagination: PropTypes.objectOf(PropTypes.objectOf).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	loadingRemove: PropTypes.bool.isRequired,
	loadingGetSubjectOfSector: PropTypes.bool.isRequired,
	data: PropTypes.instanceOf(Array).isRequired,
	onTableChange: PropTypes.func.isRequired,
	setVisibleUpdate: PropTypes.func.isRequired,
	handleRemove: PropTypes.func.isRequired,
	handleOpenSubject: PropTypes.func.isRequired,
	setInfo: PropTypes.func.isRequired,
};

export default TableDataSector;
