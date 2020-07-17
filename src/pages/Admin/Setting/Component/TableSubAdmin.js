import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Modal, ConfigProvider, Icon, Switch, Tag, Tooltip } from 'antd';

// import ModalEdit from './ModalEdit';
import customMess from '../../../../utils/customMessage';
import ModalEditSubAdmin from './ModalEditSubAdmin';
import LoadingCustom from '../../../../components/LoadingCustom';

const { confirm } = Modal;

function TableSubAdmin(props) {
	const {
		data,
		searchReq,
		updateReq,
		loadingGet,
		loadingDelete,
		loadingUpdate,
		loadingSearch,
		loadingGetRules,
		keyword,
		deleteReq,
		pagination,
		rules,
		decentralizationReq,
		loadingDecentralization,
		pageSubAdminData,
		setKeyWordSubAdmin,
		loadingGetGroupRule,
		getGroupRuleReq,
		groupRule,
	} = props;
	const [visibleEdit, setVisibleEdit] = useState(false);
	const [info, setInfo] = useState({});
	/**
	 * open confirm delete account sub admin
	 * @param {object} data
	 */
	const openConfirmDelete = dataAcc => {
		confirm({
			title: `Bạn có muốn xóa tài khoản có email ${dataAcc.email} ?`,
			onOk() {
				deleteReq({
					ID: dataAcc.id,
					pageCurrent: pageSubAdminData,
					keyword,
					cb: res => {
						if (res !== null) customMess('notification', 'success', res);
					},
				});
			},
			okText: 'Xác nhận',
			cancelText: 'Hủy',
		});
	};
	/**
	 * change page
	 * @param {object} pagi
	 */
	const onTableChange = (pagi, pageSize) => {
		setKeyWordSubAdmin({
			page: Number(pagi.current),
			limit: Number(pageSize),
		});
		searchReq({
			req: {
				page: Number(pagi.current),
				limit: Number(pageSize),
				keyword,
			},
		});
	};
	const handleChangeStatus = (id, value) => {
		updateReq({
			req: {
				status: value,
			},
			ID: id,
			cb: res => {
				if (res !== null) customMess('notification', 'success', res);
			},
		});
	};
	const column = [
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
		},
		{
			title: 'Xác thực',
			dataIndex: 'isActived',
			key: 'actived',
			render: value => (value ? <Tag color="green">Đã xác thực</Tag> : <Tag color="silver">Chưa xác thực</Tag>),
		},
		{
			title: 'Trạng thái',
			key: 'status',
			render: row => (
				<Switch
					defaultChecked={row.status}
					onChange={checked => handleChangeStatus(row._id, checked)}
					checkedChildren="Bật"
					unCheckedChildren="Tắt"
				/>
			),
		},
		{
			title: 'Hành động',
			key: 'action',
			render: row => (
				<div className="phh-group-btn-action" style={{ display: 'flex' }}>
					<Tooltip title="Cập nhật">
						<Button
							icon="edit"
							className="btn-edit"
							loading={loadingGetGroupRule}
							onClick={async () => {
								await setInfo(row);
								await getGroupRuleReq({
									ID: row._id,
									cb: res => {
										if (res.isOpen) setVisibleEdit(true);
									},
								});
							}}
						/>
					</Tooltip>
					<Tooltip title="Xóa">
						<Button
							icon="delete"
							loading={loadingDelete}
							className="btn-delete"
							onClick={() => openConfirmDelete(row)}
						/>
					</Tooltip>
				</div>
			),
		},
	];

	return (
		<div>
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
					onChange={onTableChange}
					loading={{
						spinning: loadingGet || loadingSearch,
						indicator: <LoadingCustom />,
					}}
					pagination={{
						current: pagination.page && Number(pagination.page),
						total: pagination.total,
						pageSize: pagination.limit && Number(pagination.limit),
						defaultCurrent: pagination.page && Number(pagination.page),
					}}
				/>
			</ConfigProvider>
			<ModalEditSubAdmin
				visible={visibleEdit}
				setVisible={setVisibleEdit}
				info={info}
				updateReq={updateReq}
				loading={loadingUpdate}
				rules={rules}
				loadingDecentralization={loadingDecentralization}
				decentralizationReq={decentralizationReq}
				pageSubAdminData={pageSubAdminData}
				keyword={keyword}
				groupRule={groupRule}
				loadingGetRules={loadingGetRules}
				getGroupRuleReq={getGroupRuleReq}
				loadingGetGroupRule={loadingGetGroupRule}
			/>
		</div>
	);
}

TableSubAdmin.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	groupRule: PropTypes.instanceOf(Array).isRequired,
	pagination: PropTypes.objectOf(PropTypes.any).isRequired,
	pageSubAdminData: PropTypes.objectOf(PropTypes.any).isRequired,
	setKeyWordSubAdmin: PropTypes.func.isRequired,
	deleteReq: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	searchReq: PropTypes.func.isRequired,
	getGroupRuleReq: PropTypes.func.isRequired,
	decentralizationReq: PropTypes.func.isRequired,
	keyword: PropTypes.string.isRequired,
	loadingGet: PropTypes.bool.isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	loadingSearch: PropTypes.bool.isRequired,
	loadingDelete: PropTypes.bool.isRequired,
	loadingGetRules: PropTypes.bool.isRequired,
	loadingGetGroupRule: PropTypes.bool.isRequired,
	loadingDecentralization: PropTypes.bool.isRequired,
	rules: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TableSubAdmin;
