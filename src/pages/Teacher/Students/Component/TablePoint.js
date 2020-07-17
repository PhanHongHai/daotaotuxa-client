import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table } from 'antd';


import LoadingCustom from '../../../../components/LoadingCustom';

function TablePoint(props) {
	const { data } = props;
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã môn học',
			dataIndex: 'tag',
			key: 'tag',
		},
		{
			title: 'Tên môn học',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Điểm quá trình',
			dataIndex: 'pointProcess',
			key: 'pointProcess',
		},
		{
			title: 'Điểm giữa kỳ',
			dataIndex: 'pointMiddle',
			key: 'pointMiddle',
		},
		{
			title: 'Điểm cuối kỳ',
			dataIndex: 'pointLast',
			key: 'pointLast',
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

TablePoint.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default TablePoint;
