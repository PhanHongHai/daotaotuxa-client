import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Button, Icon, Tooltip } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableContent(props) {
	const { data, openEdit, loading, loadingGetDetal, onChangePage, pagination, openDelete } = props;
	const column = [
		{
			title: 'Tiêu đề',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Dung lượng',
			dataIndex: 'size',
			key: 'size',
			render: value => <span>{value}&ensp;MB</span>,
		},
		{
			title: 'Xử lý',
			key: 'actions',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Xem">
							<Button
								className="btn-edit"
								icon="eye"
								loading={loadingGetDetal}
								onClick={() => {
									openEdit(row._id);
								}}
							/>
						</Tooltip>
						<Tooltip title="Tải xuống">
							<a className="btn-type" href={row.url} download>
								<Icon type='download' />
							</a>
						</Tooltip>
						<Tooltip title="Xóa">
							<Button onClick={() => openDelete(row)} className="btn-delete" icon="delete" />
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
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
				}}
				size="small"
				className="phh-table"
				rowKey="_id"
				scroll={{ x: true }}
				dataSource={data}
				columns={column}
				onChange={onChangePage}
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

TableContent.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetDetal: PropTypes.bool.isRequired,
	openEdit: PropTypes.func.isRequired,
	onChangePage: PropTypes.func.isRequired,
	openDelete: PropTypes.func.isRequired,
};

export default TableContent;
