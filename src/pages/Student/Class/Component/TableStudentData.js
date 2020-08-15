import React from 'react';
import PropTypes from 'prop-types';
import { ConfigProvider, Icon, Table } from 'antd';
import _ from 'lodash';

import countries from '../../../../utils/country.json';
import LoadingCustom from '../../../../components/LoadingCustom';

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

function TableStudentData(props) {
	const {
		studentList: { data, pagination },
		onChangePage,
		loading,
	} = props;
	const column = [
		{
			title: '#',
			key: 'stt',
			render: (value, row, index) => index + 1,
		},
		// {
		// 	title: 'Mã Học Viên',
		// 	dataIndex: 'tag',
		// 	key: 'tag',
		// },
		{
			title: 'Họ Tên',
			dataIndex: 'accountID.name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'accountID.email',
			key: 'email',
		},
		{
			title: 'Giới Tính',
			dataIndex: 'accountID.sex',
			key: 'sex',
			render: value => (Number(value) === 1 ? 'Nam' : 'Nữ'),
		},
		{
			title: 'SĐT',
			dataIndex: 'accountID.phoneNumber',
			key: 'phone',
			render: value => <span>xxxxxxxx{value.slice(7, 10)}</span>,
		},
		{
			title: 'Quê Quán',
			dataIndex: 'accountID.country',
			key: 'country',
			render: value => {
				const result = countries.find(ele => ele.key === value);
				if (typeof result !== 'undefined') return result.name;
				return 'Không xác định';
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
				dataSource={handleCheckData(data)}
				columns={column}
				rowKey={ele => ele._id}
				scroll={{ x: true }}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
				}}
				onChange={onChangePage}
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
	studentList: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	onChangePage: PropTypes.func.isRequired,
};

export default TableStudentData;
