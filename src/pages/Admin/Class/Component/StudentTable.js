import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tooltip, Button, ConfigProvider, Icon, Tag } from 'antd';

import countries from '../../../../utils/country.json';
import LoadingCustom from '../../../../components/LoadingCustom';


function StudentTable(props) {
	const {
		data,
		openProfile,
		saveStudent,
		openPoint,
		handleChange,
		removeStudentOfClassReq,
		loadingRemoveStudentOfClass,
		loading
	} = props;

	const column = [
		{
			title: 'Họ tên',
			dataIndex: 'accountID.name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'accountID.email',
			key: 'email',
		},
		{
			title: 'CMND',
			dataIndex: 'accountID.idCard',
			key: 'idCard',
		},
		{
			title: 'Giới tính',
			dataIndex: 'accountID.sex',
			key: 'sex',
		},
		{
			title: 'Quê quán',
			dataIndex: 'accountID.country',
			key: 'country',
			render: value => {
				const result = countries.find(ele => ele.key === value);
				if (typeof result !== 'undefined') return result.name;
				return 'Không xác định';
			},
		},
		{
			title: 'SĐT',
			dataIndex: 'accountID.phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Xác thực',
			dataIndex: 'accountID.isVerify',
			key: 'isVerify',
			render: value => {
				if (value) return <Tag color="green">Đã xác thực</Tag>;
				return <Tag color="silver">Chưa xác thực</Tag>;
			},
		},
		{
			title: 'Thao tác',
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
					<Tooltip title="Bảng điểm">
						<Button icon="fund" onClick={() => openPoint(true)} />
					</Tooltip>
					<Tooltip title="Xóa">
						<Button icon="close" loading={loadingRemoveStudentOfClass} onClick={() => removeStudentOfClassReq(row)} />
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
				rowKey="_id"
				className="phh-table"
				onChange={handleChange}
				scroll={{ x: true }}
				dataSource={data}
				columns={column}
				loading={{
					spinning:loading,
					indicator:<LoadingCustom margin={0} />
				}}
			/>
		</ConfigProvider>
	);
}

StudentTable.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	openProfile: PropTypes.func.isRequired,
	openPoint: PropTypes.func.isRequired,
	saveStudent: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	removeStudentOfClassReq: PropTypes.func.isRequired,
	loadingRemoveStudentOfClass: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default StudentTable;
