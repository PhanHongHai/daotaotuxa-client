import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table, Button } from 'antd';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';

import countries from '../../../../utils/country.json';
import LoadingCustom from '../../../../components/LoadingCustom';

function TableStudentData(props) {
	const { data, loading, pagination, handleChangePage, classID } = props;
	const history = useHistory();
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		{
			title: 'Họ Tên',
			dataIndex: 'account.name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'account.email',
			key: 'email',
		},
		{
			title: 'Giới Tính',
			dataIndex: 'account.sex',
			key: 'sex',
			render: value => (Number(value) === 1 ? 'Nam' : 'Nữ'),
		},
		{
			title: 'SĐT',
			dataIndex: 'account.phoneNumber',
			key: 'phone',
		},
		{
			title: 'Quê Quán',
			dataIndex: 'account.country',
			key: 'country',
			render: value => {
				const result = countries.find(ele => ele.key === value);
				if (typeof result !== 'undefined') return result.name;
				return 'Không xác định';
			},
		},
		{
			title: 'Số ngày điểm danh',
			dataIndex: 'totalAttendance',
			key: 'totalAttendance',
			render: value => value && value.length,
		},
		{
			title: 'Thao Tác',
			key: 'actions',
			render: row => (
				<div className="phh-group-btn-default" style={{ width: '100%', display: 'flex' }}>
					<Button onClick={() => history.push(`/teacher/dashboard/hoc-vien/${classID}/${row.account._id}`)}>Xem chi tiết</Button>
					{/* <Button className="ml-5">Xóa</Button> */}
				</div>
			),
		},
	];
	const handleCheckData = studentData => {
		let listRemoveID = [];
		const result = studentData;
		if (studentData.length > 0) {
			listRemoveID = studentData.map(ele => {
				if (_.isNull(ele.accountID)) return ele._id;
				return 0;
			});
		}
		if (listRemoveID.length > 0) {
			listRemoveID.map(item => {
				return _.remove(studentData, ele => ele._id === item);
			});
		}
		return result;
	};

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
				dataSource={handleCheckData(data)}
				onChange={handleChangePage}
				columns={column}
				rowKey={ele => ele.account._id}
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

TableStudentData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	handleChangePage: PropTypes.func.isRequired,
	classID: PropTypes.string.isRequired,
};

export default TableStudentData;
