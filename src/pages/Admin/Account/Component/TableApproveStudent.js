import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, ConfigProvider, Icon, Popover, } from 'antd';

import LoadingCustom from '../../../../components/LoadingCustom';
import countries from '../../../../utils/country.json';

function TableApproveStudent(props) {
	const { onTableChange, loading, data, pagination, handleApprove, loadingApprove } = props;

	const columnStudent = [
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Họ Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Giới Tính',
			dataIndex: 'sex',
			key: 'sex',
			render: value => (Number(value) === 1 ? 'Nam' : 'Nữ'),
		},
		{
			title: 'SĐT',
			dataIndex: 'phoneNumber',
			key: 'phone',
		},
		{
			title: 'Quê Quán',
			dataIndex: 'country',
			key: 'country',
			render: value => {
				const result = countries.find(ele => ele.key === value);
				if (typeof result !== 'undefined') return result.name;
				return 'Không xác định';
			},
		},
		{
			title: 'Người Đề Cử',
			dataIndex: 'ownerID',
			key: 'ownerID',
			render: value => {
				if (value)
					return (
						<Popover
							title="Thông tin"
							content={
								<ul>
									<li>Email :{value.email}</li>
									<li>Địa chỉ : {value.address}</li>
									<li>SĐT :{value.phoneNumber}</li>
								</ul>
							}
						>
							<span className="pointer"> {value.name}</span>
						</Popover>
					);
				return '';
			},
		},
		{
			title: 'Hành động',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-default">
						<Button loading={loadingApprove} onClick={() => handleApprove(row)}>
							Duyệt
						</Button>
					</div>
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
				rowKey={ele => ele._id}
				onChange={onTableChange}
				dataSource={data}
				columns={columnStudent}
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

TableApproveStudent.propTypes = {
	onTableChange: PropTypes.func.isRequired,
	handleApprove: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	loadingApprove: PropTypes.bool.isRequired,
	data: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default TableApproveStudent;
