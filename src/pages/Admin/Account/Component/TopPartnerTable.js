import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Icon } from 'antd';

function TopPartnerTable(props) {
	const { data } = props;
	const column = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Họ Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'SĐT',
			dataIndex: 'phoneNumber',
			key: 'phone',
		},
		{
			title: 'Địa chỉ',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Số Học Viên',
			dataIndex: 'countStudent',
			key: 'countStudent',
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
			<Table size='small' className="phh-table" rowKey="email" dataSource={data} columns={column} scroll={{ x: true }} />
		</ConfigProvider>
	);
}

TopPartnerTable.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default TopPartnerTable;
