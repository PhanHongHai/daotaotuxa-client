import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, ConfigProvider, Table, Icon, Tooltip } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

import LoadingCustom from '../../../../components/LoadingCustom';
import { trainingType } from '../../../../constands/Other';

function TableDataSector(props) {
	const {
		onTableChange,
		data,
		loading,
		loadingSearch,
		loadingDeleteClass,
		pagination,
		openListStudent,
		openDeleteClass,
	} = props;
	const history = useHistory();

	const columns = [
		{
			title: '#',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Mã lớp',
			dataIndex: 'tag',
			key: 'tag',
			render: value => <Tag style={{ fontSize: 14 }}>{value} </Tag>,
		},
		{
			title: 'Tên lớp',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Hệ',
			dataIndex: 'trainingSectorID.type',
			key: 'sectorType',
			render: value => trainingType.find(ele => ele.key === value).value,
		},
		{
			title: 'Ngành đào tạo',
			dataIndex: 'trainingSectorID.name',
			key: 'sectorName',
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
		{
			title: 'Hành động',
			key: 'actions',
			render: row => {
				return (
					<span className="phh-group-btn-action">
						<Tooltip title="Danh sách học viên">
							<Button onClick={() => openListStudent(row)} icon="profile" />
						</Tooltip>
						<Tooltip title="Chi tiết">
							<Button
								className="btn-edit"
								onClick={() => history.push(`/admin/lop-hoc/chi-tiet/${row._id}`)}
								icon="export"
							/>
						</Tooltip>
						<Tooltip title="Xóa lớp học">
							<Button
								className="btn-delete"
								icon="delete"
								loading={loadingDeleteClass}
								onClick={() => openDeleteClass(row)}
							/>
						</Tooltip>
					</span>
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
				rowKey={ele => ele.id}
				onChange={onTableChange}
				dataSource={data}
				columns={columns}
				scroll={{ x: true }}
				loading={{
					spinning: loading || loadingSearch,
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

TableDataSector.propTypes = {
	pagination: PropTypes.objectOf(PropTypes.object).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	loadingDeleteClass: PropTypes.bool.isRequired,
	data: PropTypes.instanceOf(Array).isRequired,
	onTableChange: PropTypes.func.isRequired,
	openListStudent: PropTypes.func.isRequired,
	openDeleteClass: PropTypes.func.isRequired,
};

export default TableDataSector;
