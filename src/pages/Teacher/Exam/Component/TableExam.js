import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ConfigProvider, Icon, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableExam(props) {
	const { data, loading, loadingRemove, pagination, handleRemoveExam, onChangeTable, handleViewExam } = props;
	const history = useHistory();
	const columns = [
		{
			title: '#',
			key: 'index',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Số lượng câu hỏi',
			dataIndex: 'questions',
			key: 'number',
			render: value => value.length,
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Xem nhanh">
							<Button icon="eye" onClick={() => handleViewExam(row)} />
						</Tooltip>
						<Tooltip title="Chi tiết">
							<Button icon="export" onClick={() => history.push(`/admin/quan-ly-de-thi/chi-tiet/${row._id}`)} />
						</Tooltip>
						<Tooltip title="Xóa">
							<Button icon="delete" loading={loadingRemove} onClick={() => handleRemoveExam(row)} />
						</Tooltip>
					</div>
				);
			},
		},
	];

	return (
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
				rowKey={ele => ele._id}
				dataSource={data}
				columns={columns}
				scroll={{ x: true }}
				onChange={onChangeTable}
				loading={{
					spinning: loading,
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
	);
}

TableExam.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingRemove: PropTypes.bool.isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	handleRemoveExam: PropTypes.func.isRequired,
	onChangeTable: PropTypes.func.isRequired,
	handleViewExam: PropTypes.func.isRequired,
};

export default TableExam;
