import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';

function TablePointAll(props) {
	const { data } = props;
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã học viên',
			dataIndex: 'tag',
			key: 'tag',
		},
		{
			title: 'Họ Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Lập trình web',
			dataIndex: 'ltw',
			key: 'ltw',
		},
		{
			title: 'Ngoại ngữ chuyên ngành',
			dataIndex: 'nncn',
			key: 'nncn',
		},
		{
			title: 'Hệ thống thông tin',
			dataIndex: 'httt',
			key: 'httt',
		},
		{
			title: 'Toán đại cương',
			dataIndex: 'ltm',
			key: 'ltm',
		},
		{
			title: 'Vật lý đại cương',
			dataIndex: 'vldc',
			key: 'vldc',
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
				dataSource={data}
				columns={column}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				loading={{
					spinning: false,
					indicator: <LoadingCustom />,
				}}
				pagination={{}}
			/>
		</ConfigProvider>
	);
}

TablePointAll.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default TablePointAll;
