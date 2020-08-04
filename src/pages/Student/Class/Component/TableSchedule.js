import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Button, Tag } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import { getSocket } from '../../../../socket';
import LoadingCustom from '../../../../components/LoadingCustom';
import { scheduleTitle } from '../../../../constands/Other';

function TableSchedule(props) {
	const {
		scheduleData: { data, pagination },
		loading,
		onChangeTable,
	} = props;
	const history = useHistory();

	const handleJoinRoomTest = ID => {
		getSocket().emit('join-room-test', ID);
		history.push(`/quiz/${ID}`);
	};
	const column = [
		{
			title: 'Nội dung',
			dataIndex: 'type',
			key: 'type',
			render: value => {
				const result = scheduleTitle.find(ele => ele.key === value);
				if (result) return result.value;
				return 'Không xác định';
			},
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
		// {
		// 	title: 'Trạng Thái',
		// 	key: 'status',
		// 	render: row => {
		// 		if (moment(row.dayAt) < moment()) return <Tag color="silver">Kết thúc</Tag>;
		// 		if (moment(row.dayAt).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')) {
		// 			if (moment(row.timeAt).isBefore(moment)) return <Tag color="green">Chuẩn bị</Tag>;
		// 			if (moment(row.timeAt).format('HH:mm') >= moment.format('HH:mm'))
		// 				return <Tag color="silver">Kết thúc</Tag>;
		// 		}
		// 		return <Tag color="cyan">Chưa diễn ra</Tag>;
		// 	},
		// },
		{
			title: 'Thao Tác',
			key: 'actions',
			render: row => {
				if (moment(row.dayAt).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY')) {
					const timeEnd = moment(row.timeAt).add(row.timeRange, 'minute');
					const hourTimeAt = moment(row.timeAt).hour();
					const minuteTimeAt = moment(row.timeAt).minute();
					const hourTimeEnd = moment(timeEnd, 'HH:mm').hour();
					const minuteTimeEnd = moment(timeEnd, 'HH:mm').minute();
					const hourCurrent = moment().hour();
					const minuteCurrent = moment().minute();
					if (hourCurrent >= hourTimeAt && hourCurrent < hourTimeEnd) {
						if (minuteCurrent >= minuteTimeAt)
							return (
								<Button className="btn" onClick={() => handleJoinRoomTest(row._id)}>
									Vào phòng thi
								</Button>
							);
					} else if (hourCurrent === hourTimeEnd) {
						if (minuteCurrent <= minuteTimeEnd) {
							return (
								<Button className="btn" onClick={() => handleJoinRoomTest(row._id)}>
									Vào phòng thi
								</Button>
							);
						}
					}
				}
				return (
					<Button className="btn" disabled>
						Phòng thi đã đóng
					</Button>
				);
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
