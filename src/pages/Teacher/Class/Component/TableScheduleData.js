import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Button, Tooltip, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import LoadingCustom from '../../../../components/LoadingCustom';
import {scheduleTitle} from '../../../../constands/Other';

function TableScheduleData(props) {
	const { data, loading, pagination, handleChangePage, classID, loadingGetExam, handleViewExam } = props;
	const history = useHistory();
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
					<Tooltip title="Xem">
						<Button loading={loadingGetExam} icon="eye" onClick={() => handleViewExam(value)} />
					</Tooltip>
				</div>
			),
		},
		{
			title: 'Thao tác',
			key: 'actions',
			render: row => (
				<div className="phh-group-btn-action">
					<Tooltip title="Chi tiết">
						<Button icon="export" onClick={() => history.push(`/admin/lich-thi/chi-tiet/${row._id}`)} />
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
					indicator: <LoadingCustom margin={10} />,
				}}
				pagination={pagination}
			/>
		</ConfigProvider>
	);
}

TableScheduleData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetExam: PropTypes.bool.isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	handleChangePage: PropTypes.func.isRequired,
	handleViewExam: PropTypes.func.isRequired,
	classID: PropTypes.string.isRequired,
};

export default TableScheduleData;
