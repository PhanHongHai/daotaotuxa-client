import React, { useState,  } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Input, Tabs, Icon, Spin } from 'antd';
import _ from 'lodash';

import customMess from '../../../../utils/customMessage';
import LoadingCustom from '../../../../components/LoadingCustom';
import PermissionTab from './PermissionTab';

const { TabPane } = Tabs;

function ModalEditSubAdmin(props) {
	const {
		visible,
		setVisible,
		updateReq,
		info,
		loading,
		form,
		rules,
		loadingGetRules,
		loadingDecentralization,
		decentralizationReq,
		pageSubAdminData,
		keyword,
		groupRule,
		getGroupRuleReq,
		loadingGetGroupRule
	} = props;


	const [dataForm, setDataForm] = useState({});
	const [tabKey, setTabKey] = useState('1');

	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields(err => {
			if (!err) {
				updateReq({
					req: {
						...dataForm,
					},
					pageCurrent: pageSubAdminData,
					keyword,
					ID: info.id,
					cb: res => {
						if (res) {
							setVisible(false);
							customMess('notification', 'success', res);
						}
					},
				});
			}
		});
	};
	const onChangeInput = e => {
		const target = e.target;
		setDataForm({ [target.name]: target.value });
	};

	return (
		<Modal
			className="phh-modal"
			title="Cập nhật nhân viên"
			visible={visible}
			footer={null}
			onCancel={() => {
				form.resetFields();
				setDataForm({});
				setTabKey('1');
				setVisible(false);
			}}
		>
			<Tabs activeKey={tabKey} onChange={key => setTabKey(key)}>
				<TabPane
					tab={
						<span>
							<Icon type="profile" />
							Thông tin quản trị viên
						</span>
					}
					key="1"
				>
					<Form onSubmit={handleSubmit} className="update-rules">
						<Form.Item label="Email" labelAlign="left">
							{form.getFieldDecorator('email', {
								initialValue: info.email,
								rules: [
									{
										required: true,
										message: 'Không được để trống tên',
									},
								],
							})(<Input name="email" onChange={onChangeInput} />)}
						</Form.Item>
						<Form.Item label="Số điện thoại" labelAlign="left">
							{form.getFieldDecorator('phoneNumber', {
								initialValue: info.phoneNumber,
								rules: [
									{
										required: true,
										message: 'Không được để trống số điệnt thoại',
									},
									{
										pattern: /^[0-9]*$/,
										message: 'Input is not number!',
									},
								],
							})(<Input name="phoneNumber" onChange={onChangeInput} />)}
						</Form.Item>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={loading}
								disabled={_.isEmpty(dataForm)}
								style={{ float: 'right' }}
							>
								Cập nhật
							</Button>
						</Form.Item>
					</Form>
				</TabPane>
				<TabPane
					tab={
						<span>
							<Icon type="user" />
							Phân Quyền
						</span>
					}
					key="2"
				>
					<Spin spinning={loadingGetRules} indicator={<LoadingCustom margin={30} />}>
						<PermissionTab
							rules={rules}
							decentralizationReq={decentralizationReq}
							loadingDecentralization={loadingDecentralization}
							groupRule={groupRule}
							getGroupRuleReq={getGroupRuleReq}
							ID={info && info._id}
							loadingGetGroupRule={loadingGetGroupRule}
						/>
					</Spin>
				</TabPane>
			</Tabs>
		</Modal>
	);
}

ModalEditSubAdmin.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
	info: PropTypes.objectOf(PropTypes.any).isRequired,
	pageSubAdminData: PropTypes.objectOf(PropTypes.any).isRequired,
	keyword: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetGroupRule: PropTypes.bool.isRequired,
	loadingDecentralization: PropTypes.bool.isRequired,
	loadingGetRules: PropTypes.bool.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	rules: PropTypes.instanceOf(Array).isRequired,
	groupRule: PropTypes.instanceOf(Array).isRequired,
	decentralizationReq: PropTypes.func.isRequired,
	getGroupRuleReq: PropTypes.func.isRequired,
};

export default Form.create({ name: 'update-subAdmin' })(ModalEditSubAdmin);
