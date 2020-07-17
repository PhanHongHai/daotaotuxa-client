import React from 'react';
import PropTypes from 'prop-types';
import { Table, ConfigProvider, Icon, Tooltip, Button, Tag } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableSchedule(props) {
	const {
		sheduleData: { data, pagination },
		handleRemove,
		loadingRemove,
		loadingGetDetailExam,
		loadingGet,
		onChangeTable,
		handleViewClass,
		handleViewExam,
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
			key:'tag',
			render: value => `#${value.tag}`,
		},
		{
			title: 'Môn học',
			dataIndex: 'subjectID',
			key:'name',
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
			render : value => `${value} phút`
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
			title: 'Đề thi',
			dataIndex: 'examID',
			key: 'exam',
			render: value => (
				<div className="phh-group-btn-action">
					<Tooltip title="Xem">
						<Button loading={loadingGetDetailExam} icon="eye" onClick={() => handleViewExam(value)} />
					</Tooltip>
				</div>
			),
		},
		{
			title: 'Lớp',
			dataIndex: 'classes',
			key: 'classes',
			render: value => (
				<div className="phh-group-btn-action">
					<Tooltip title="Xem">
						<Button icon="eye" onClick={() => handleViewClass(value)} />
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
					<Tooltip title="Xóa">
						<Button icon="delete" onClick={() => handleRemove(row)} loading={loadingRemove} />
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
				columns={column}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				onChange={onChangeTable}
				loading={{
					spinning: loadingGet,
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

TableSchedule.propTypes = {
	sheduleData: PropTypes.objectOf(PropTypes.any).isRequired,
	handleRemove: PropTypes.func.isRequired,
	loadingRemove: PropTypes.bool.isRequired,
	loadingGet: PropTypes.bool.isRequired,
	loadingGetDetailExam: PropTypes.bool.isRequired,
	onChangeTable: PropTypes.func.isRequired,
	handleViewClass: PropTypes.func.isRequired,
	handleViewExam: PropTypes.func.isRequired,
};

export default TableSchedule;
