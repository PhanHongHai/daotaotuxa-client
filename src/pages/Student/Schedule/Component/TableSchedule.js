import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Button } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableSchedule(props) {
	const { data } = props;
	const history = useHistory();

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
			title: 'Thao Tác',
			key: 'actions',
			render: row => (
				<Button className="btn" onClick={() => history.push(`/quiz/${row._id}`)}>
					Vào phòng thi
				</Button>
			),
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

TableSchedule.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default TableSchedule;
