import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Icon, Tooltip, Tag } from 'antd';
import moment from 'moment';


function TableClasses(props) {
	const { data } = props;
	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã lớp',
			dataIndex: 'tag',
			key: 'tag',
			render: value => <Tag>#{value} </Tag>,
		},
		{
			title: 'Tên lớp',
			dataIndex: 'name',
			key: 'tag',
			render: value => (value.length > 20 ? <Tooltip title={value}>{value.slice(0, 20)}... </Tooltip> : value),
		},
		{
			title: 'Thời gian học',
			key: 'dateTime',
			render: row => (
				<span>
					{moment(row.startAt).year()} - &ensp;{moment(row.endAt).year() + 4}
				</span>
			),
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			key: 'status',
			render: value => {
				switch (value) {
					case 'OP':
						return <Tag color="#1bb394">Chờ Khai giảng</Tag>;
					case 'HP':
						return <Tag color="blue">Đang diễn ra</Tag>;
					default:
						return <Tag color="gray">Kết thúc</Tag>;
				}
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
				className="phh-table mt-15"
				dataSource={data}
				columns={columns}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				pagination={{
					total: data && data.length,
					pageSize: 6,
					defaultCurrent: 1,
				}}
			/>
		</ConfigProvider>
	);
}

TableClasses.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default TableClasses;
