import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Icon, Progress, Tooltip } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableProgressSubject(props) {
	const { data,loading } = props;
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã môn học',
			dataIndex: 'subjectID.tag',
			key: 'tag',
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectID.name',
			key: 'name',
		},
		{
			title: 'Tiến độ',
			dataIndex: 'progress',
			key: 'progress',
			render: value => <Tooltip title={`${value}%`}><Progress percent={value} status="active" /></Tooltip>,
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
					spinning: loading,
					indicator: <LoadingCustom />,
				}}
				pagination={{}}
			/>
		</ConfigProvider>
	);
}

TableProgressSubject.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading:PropTypes.bool.isRequired
};

export default TableProgressSubject;
