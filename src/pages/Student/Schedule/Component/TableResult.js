import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table,  } from 'antd';
import moment from 'moment';


import LoadingCustom from '../../../../components/LoadingCustom';

function TableResult(props) {
	const { data } = props;


	const column = [
		{
			title: 'Tiêu Đề',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Mã Môn Học',
			dataIndex: 'tag',
			key: 'tag',
		},
		{
			title: 'Môn Học',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Ngày Thi',
			dataIndex: 'startAt',
			key: 'startAt',
			render: value => moment(value).format('DD-MM-YYYY'),
		},
		{
			title: 'Thời Gian',
			dataIndex: 'timeAt',
			key: 'timeAt',
			render: value => moment(value).format('HH:mm'),
		},

		{
			title: 'Tổng số câu hỏi',
			key: 'totalAnswer',
			render: row => row.wrongAnswer + row.rightAnswer,
		},
		{
			title: 'Số câu trả lời đúng',
			dataIndex: 'rightAnswer',
			key: 'rightAnswer',
		},

		{
			title: 'Số điểm đạt được',
			dataIndex: 'point',
			key: 'point',
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

TableResult.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default TableResult;
