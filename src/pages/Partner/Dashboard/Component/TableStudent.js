import React from 'react';
import { Table, Button, ConfigProvider, Icon, Tag, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


import LoadingCustom from '../../../../components/LoadingCustom';
import countries from '../../../../utils/country.json';

function TableData(props) {
	const {
		data,
		pagination,
		loadingGet,
		loadingSearch,
		loadingDelete,
		openDelete,
		savePageCurrent,
		getReq,
		keyword,
	} = props;

	const history = useHistory();
	/**
	 * change page
	 * @param {object} pagi
	 */
	const onTableChange = pagi => {
		savePageCurrent({
			page: Number(pagi.current),
			limit: 10,
		});
		getReq({
			req: {
				page: Number(pagi.current),
				limit: 10,
				keyword,
			},
		});
	};

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
			title: 'Xác thực',
			dataIndex: 'isActived',
			key: 'actived',
			render: value => (value ? <Tag color="green">Đã xác thực</Tag> : <Tag color="silver">Chưa xác thực</Tag>),
		},
		{
			title: 'Phê duyệt',
			dataIndex: 'isApproved',
			key: 'isApproved',
			render: value => (value ? <Tag color="green">Đã được phê duyệt</Tag> : <Tag color="silver">Chưa phê duyệt</Tag>),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Chi tiết">
							<Button icon="export" onClick={() => history.push(`/partner/dashboard/hoc-vien/${row._id}`)} />
						</Tooltip>
						<Tooltip title="Xóa">
							<Button icon="delete" loading={loadingDelete} onClick={() => openDelete(row)} />
						</Tooltip>
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
					spinning: loadingGet || loadingSearch,
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
TableData.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	keyword: PropTypes.string.isRequired,
	loadingGet: PropTypes.bool.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	loadingDelete: PropTypes.bool.isRequired,
	openDelete: PropTypes.func.isRequired,
	savePageCurrent: PropTypes.func.isRequired,
	getReq: PropTypes.func.isRequired,
};
export default TableData;
