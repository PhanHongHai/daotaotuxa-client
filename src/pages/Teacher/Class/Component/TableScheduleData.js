import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Button, Tooltip, Tag } from 'antd';
import moment from 'moment';

import LoadingCustom from '../../../../components/LoadingCustom';
import { scheduleTitle } from '../../../../constands/Other';

function TableScheduleData(props) {
	const {
		data,
		loading,
		pagination,
		handleChangePage,
		classID,
		loadingGetExam,
		loadingGetLog,
		handleViewExam,
		setScheduleID,
		getLogScheduleReq,
		setVisibleLogSchedule,
	} = props;
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
			render: value => <Tag style={{ fontSize: 14 }}>#{value.tag} </Tag>,
		},
		{
			title: 'Môn học',
			dataIndex: 'subjectID',
			key: 'name',
			render: value => <Tag style={{ fontSize: 14 }}>{value.name} </Tag>,
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
		// 		if (moment.utc(row.dayAt) < moment().utc()) return <Tag color="silver">Kết thúc</Tag>;
		// 		if (moment.utc(row.dayAt) === moment().utc()) {
		// 			if (moment.utc(row.timeAt).format('HH:MM') < moment.utc().format('HH:MM'))
		// 				return <Tag color="green">Chuẩn bị</Tag>;
		// 			if (moment.utc(row.timeAt).format('HH:MM') >= moment.utc().format('HH:MM'))
		// 				return <Tag color="silver">Kết thúc</Tag>;
		// 		}
		// 		return <Tag color="cyan">Chưa diễn ra</Tag>;
		// 	},
		// },
		{
			title: 'Đề thi',
			dataIndex: 'examID',
			key: 'exam',
			render: value => (
				<div className="phh-group-btn-action">
					<Tooltip title="Xem đề thi">
						<Button loading={loadingGetExam} icon="eye" onClick={() => handleViewExam(value)} />
					</Tooltip>
				</div>
			),
		},
		{
			title: 'Kết quả thi',
			key: 'actions',
			render: row => (
				<div className="phh-group-btn-action">
					<Tooltip title="Xem kết quả">
						<Button
							loading={loadingGetLog}
							icon="eye"
							onClick={() => {
								setScheduleID(row._id);
								getLogScheduleReq({
									req: {
										limit: 10,
										page: 1,
										classID,
										scheduleID: row._id,
									},
								});
								setVisibleLogSchedule(true);
							}}
						/>
					</Tooltip>
				</div>
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
				onChange={handleChangePage}
				columns={column}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
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

TableScheduleData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetExam: PropTypes.bool.isRequired,
	loadingGetLog: PropTypes.bool.isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	handleChangePage: PropTypes.func.isRequired,
	handleViewExam: PropTypes.func.isRequired,
	setScheduleID: PropTypes.func.isRequired,
	getLogScheduleReq: PropTypes.func.isRequired,
	setVisibleLogSchedule: PropTypes.func.isRequired,
	classID: PropTypes.string.isRequired,
};

export default TableScheduleData;
