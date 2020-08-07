import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Tag } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';

function TablePoint(props) {
	const {
		points: { data, pagination },
		loading,
		onChangePage,
	} = props;
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
			render: value => <Tag>#{value} </Tag>,
		},
		{
			title: 'Tên môn học',
			dataIndex: 'subjectID.name',
			key: 'name',
			render: value => <Tag>{value} </Tag>,
		},
		{
			title: 'Điểm giữa kỳ (30%)',
			dataIndex: 'pointMiddle',
			key: 'pointMiddle',
			render: value => {
				return <span style={{ color: value < 5 ? 'red' : 'green' }}>{value} </span>;
			},
		},
		{
			title: 'Điểm cuối kỳ (70%)',
			dataIndex: 'pointLast',
			key: 'pointLast',
			render: value => {
				return <span style={{ color: value < 5 ? 'red' : 'green' }}>{value} </span>;
			},
		},
		{
			title: 'Điểm tổng kết',
			dataIndex: 'pointTotal',
			key: 'pointTotal',
			render: value => {
				return <span style={{ color: value < 5 ? 'red' : 'green' }}>{value} </span>;
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
				bordered
				className="phh-table"
				dataSource={data}
				columns={column}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				onChange={onChangePage}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom />,
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

TablePoint.propTypes = {
	points: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	onChangePage: PropTypes.func.isRequired,
};

export default TablePoint;
