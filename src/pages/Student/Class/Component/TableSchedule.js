import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Button, Tag } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableSchedule(props) {
	const {
		scheduleData: { data, pagination },
		loading,
		onChangeTable
	} = props;
	const history = useHistory();

	const column = [
		{
			title: 'Tiêu Đề',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Mã môn học',
			dataIndex: 'subjectID',
			key: 'tag',
			render: value => `#${value.tag}`,
		},
		{
			title: 'Môn học',
			dataIndex: 'subjectID',
			key: 'name',
			render: value => value.name,
		},
		{
			title: 'Ngày Kiểm Tra',
			dataIndex: 'dayAt',
			key: 'dayAt',
			render: value => moment(value).format('DD-MM-YYYY'),
		},
		{
			title: 'Thời gian thi',
			dataIndex: 'timeAt',
			key: 'timeAt',
			render: value => moment(value).format('HH:mm'),
		},
		{
			title: 'Thời gian làm bài',
			dataIndex: 'timeRange',
			key: 'timeRange',
			render: value => `${value} phút`,
		},
		{
			title: 'Trạng Thái',
			key: 'status',
			render: row => {
				if (moment.utc(row.dayAt) < moment().utc()) return <Tag color="silver">Kết thúc</Tag>;
				if (moment.utc(row.dayAt) === moment().utc()) {
					if (moment.utc(row.timeAt).format('HH:MM') < moment.utc().format('HH:MM'))
						return <Tag color="green">Chuẩn bị</Tag>;
					if (moment.utc(row.timeAt).format('HH:MM') >= moment.utc().format('HH:MM'))
						return <Tag color="silver">Kết thúc</Tag>;
				}
				return <Tag color="cyan">Chưa diễn ra</Tag>;
			},
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
				onChange={onChangeTable}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
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

TableSchedule.propTypes = {
	scheduleData: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	onChangeTable: PropTypes.func.isRequired,
};

export default TableSchedule;
