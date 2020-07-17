import React from 'react';
import { Table, ConfigProvider, Icon } from 'antd';
import PropTypes from 'prop-types';

function DataPointTable(props) {
	const { data } = props;
	const column = [
		{
			title: 'Mã môn học',
			key: 'tagSubject',
			dataIndex: 'tagSubject',
		},
		{
			title: 'Tên môn học',
			key: 'name',
			dataIndex: 'name',
		},
		{
			title: 'Điểm',
			key: 'point',
			dataIndex: 'point',
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
				size="small"
				columns={column}
				scroll={{ x: true }}
				dataSource={data}
				rowKey="tagSubject"
			/>
		</ConfigProvider>
	);
}
DataPointTable.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};
export default DataPointTable;
