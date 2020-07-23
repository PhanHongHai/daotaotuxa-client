import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, ConfigProvider, Icon, Tag, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';

import ModalEdit from './ModalEdit';
import customMess from '../../../../utils/customMessage';
import LoadingCustom from '../../../../components/LoadingCustom';
import countries from '../../../../utils/country.json';

const { confirm } = Modal;

function TableData(props) {
	const {
		data,
		pagination,
		loading,
		updateReq,
		getUserReq,
		deleteReq,
		loadingUpdate,
		loadingDelete,
		loadingSearch,
		keyWord,
		type,
		setPaginationData,
		paginationData,
	} = props;

	const [visibleEdit, setVisibleEdit] = useState(false);
	const [dataDetail, setDataDetail] = useState({});
	const [dataForm, setDataForm] = useState({});
	const history = useHistory();

	const handleDelete = dataAcc => {
		confirm({
			title: `Bạn có muốn xóa tài khoản có email ${dataAcc.email} ?`,
			onOk() {
				deleteReq({
					ID: dataAcc._id,
					paginationData,
					keyword: keyWord,
					cb: res => {
						if (res !== null) customMess('notification', 'success', res);
					},
				});
			},
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
		});
	};

	/**
	 * change page
	 * @param {object} pagi
	 */
	const onTableChange = pagi => {
		setPaginationData({
			page: Number(pagi.current),
			limit: 10,
		});
		getUserReq({
			req: {
				page: Number(pagi.current),
				limit: 10,
				keyword: keyWord,
				type,
			},
		});
	};

	// const handleChangeStatus = (id, value) => {
	// 	updateReq({
	// 		req: {
	// 			status: value,
	// 		},
	// 		ID: id,
	// 		cb: res => {
	// 			if (res !== null) customMess('notification', 'success', res);
	// 		},
	// 	});
	// };
	const columnStudent = [
		{
			title: 'MSHV',
			dataIndex: 'tag',
			key: 'tag',
			render: value => {
				if (value) return <Tag style={{ fontSize: '14px' }}> {value} </Tag>;
				return 'Không xác định';
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
			render: value => {
				if (value) return value;
				return 'Chưa đăng ký email';
			},
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
		// {
		// 	title: 'Xác thực',
		// 	dataIndex: 'isActived',
		// 	key: 'actived',
		// 	render: value => (value ? <Tag color="green">Đã xác thực</Tag> : <Tag color="silver">Chưa xác thực</Tag>),
		// },
		{
			title: 'Hành động',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Tooltip title="Chi tiết">
							<Button icon="export" onClick={() => history.push(`/admin/tai-khoan/hoc-vien/chi-tiet/${row._id}`)} />
						</Tooltip>
						<Tooltip title="Xóa">
							<Button icon="delete" loading={loadingDelete} onClick={() => handleDelete(row)} />
						</Tooltip>
					</div>
				);
			},
		},
	];
	const columnPartner = [
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
			title: 'Tỷ lệ hoa hồng',
			dataIndex: 'commissionRate',
			key: 'commissionRate',
			render: value => {
				if (value) return <span>{value}%</span>;
				return <span>0 %</span>;
			},
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
			render: value => (value ? <Tag color="green">Đã kích hoạt</Tag> : <Tag color="silver">Chưa kích hoạt</Tag>),
		},
		// {
		// 	title: 'Trạng thái',
		// 	key: 'status',
		// 	render: row => (
		// 		<Switch
		// 			defaultChecked={row.status}
		// 			onChange={checked => handleChangeStatus(row._id, checked)}
		// 			checkedChildren="Bật"
		// 			unCheckedChildren="Tắt"
		// 		/>
		// 	),
		// },
		{
			title: 'Hành động',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Button
							className="btn-edit"
							icon="edit"
							onClick={() => {
								setDataDetail(row);
								setVisibleEdit(true);
							}}
						/>
						<Button className="btn-delete" icon="delete" loading={loadingDelete} onClick={() => handleDelete(row)} />
					</div>
				);
			},
		},
	];
	const columnTeacher = [
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
			render: value => (value ? <Tag color="green">Đã kích hoạt</Tag> : <Tag color="silver">Chưa kích hoạt</Tag>),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: row => {
				return (
					<div className="phh-group-btn-action">
						<Button
							className="btn-edit"
							icon="edit"
							onClick={() => {
								setDataDetail(row);
								setVisibleEdit(true);
							}}
						/>
						<Button className="btn-delete" icon="delete" loading={loadingDelete} onClick={() => handleDelete(row)} />
					</div>
				);
			},
		},
	];
	const renderColumnByType = typeAccount => {
		switch (typeAccount) {
			case 'student':
				return columnStudent;

			case 'teacher':
				return columnTeacher;

			default:
				return columnPartner;
		}
	};

	return (
		<>
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
					columns={renderColumnByType(type)}
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
			<ModalEdit
				info={dataDetail}
				visible={visibleEdit}
				setVisible={setVisibleEdit}
				updateReq={updateReq}
				loadingUpdate={loadingUpdate}
				type={type}
				setDataForm={setDataForm}
				dataForm={dataForm}
				paginationData={paginationData}
				keyword={keyWord}
			/>
		</>
	);
}

TableData.propTypes = {
	getUserReq: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	deleteReq: PropTypes.func.isRequired,
	setPaginationData: PropTypes.func.isRequired,
	data: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	paginationData: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingDelete: PropTypes.bool.isRequired,
	keyWord: PropTypes.string.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
};

export default TableData;
