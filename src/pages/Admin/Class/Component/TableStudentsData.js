import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip, Button, ConfigProvider, Icon, Tag } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';

function TableStudentsData(props) {
	const {
		data,
		openProfile,
		saveStudent,
		handleChange,
		addStudentToClassReq,
		loadingAddStudentToClass,
		loading,
	} = props;

	const column = [
		{
			title: 'Họ tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'CMND',
			dataIndex: 'idCard',
			key: 'idCard',
		},
		{
			title: 'Giới tính',
			dataIndex: 'sex',
			key: 'sex',
		},
		{
			title: 'Quê quán',
			dataIndex: 'country',
			key: 'country',
		},
		{
			title: 'SĐT',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Xác thực',
			dataIndex: 'isVerify',
			key: 'isVerify',
			render: value => {
				if (value) return <Tag color="green">Đã xác thực</Tag>;
				return <Tag color="silver">Chưa xác thực</Tag>;
			},
		},
		{
			title: 'Xử lý',
			key: 'actions',
			render: row => (
				<span className="phh-group-btn-action">
					{/* <Tooltip title="Hồ sơ học viên">
						<Button
							icon="idcard"
							onClick={() => {
								saveStudent(row);
								openProfile(true);
							}}
						/>
					</Tooltip> */}
					<Tooltip title="Thêm vào lớp">
						<Button
							className="btn-submit icon-white"
							icon="plus"
							style={{ color: '#fff',  }}
							loading={loadingAddStudentToClass}
							onClick={() => addStudentToClassReq(row)}
						/>
					</Tooltip>
				</span>
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
				rowKey="email"
				className="phh-table"
				scroll={{ x: true }}
				onChange={handleChange}
				dataSource={data}
				columns={column}
				loading={{
					spinning: loading,
					indicator: <LoadingCustom margin={0} />,
				}}
			/>
		</ConfigProvider>
	);
}

TableStudentsData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	openProfile: PropTypes.func.isRequired,
	saveStudent: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	addStudentToClassReq: PropTypes.func.isRequired,
	loadingAddStudentToClass: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default TableStudentsData;
