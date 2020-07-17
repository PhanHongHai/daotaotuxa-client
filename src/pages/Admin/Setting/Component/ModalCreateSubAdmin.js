import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Modal, Icon } from 'antd';

import customMess from '../../../../utils/customMessage';

function ModalCreateSubAdmin(props) {
	const { visible, setVisible, loadingCreate, createReq, form, keyword, pageSubAdminData } = props;

	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				createReq({
					req: {
						...values,
						role: 'employment',
					},
					pageCurrent: pageSubAdminData,
					keyword,
					cb: res => {
						if (res) {
							setVisible(false);
							customMess('notification', 'success', res);
							form.resetFields();
						}
					},
				});
			}
		});
	};

	return (
		<Modal
			className="phh-modal"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
			title="Thêm nhân viên"
		>
			<Form className="create-subAdmin" onSubmit={handleSubmit}>
				<Form.Item label="Email" labelAlign="left">
					{form.getFieldDecorator('email', {
						rules: [
							{
								required: true,
								message: 'Không được để trống email',
							},
							{
								type: 'email',
								message: 'Email không hợp lệ',
							},
							{
								whitespace: true,
								message: 'Chứa ký tự không hợp lệ',
							},
						],
					})(<Input prefix={<Icon type="mail" />} placeholder="Nhập email" />)}
				</Form.Item>
				<Form.Item label="Họ Tên" labelAlign="left">
					{form.getFieldDecorator('name', {
						rules: [
							{
								required: true,
								message: 'Không được để trống họ tên',
							},
						],
					})(<Input prefix={<Icon type="user" />} placeholder="Nhập họ tên" />)}
				</Form.Item>
				<Form.Item label="Mật khẩu" labelAlign="left">
					{form.getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mật khẩu',
							},
						],
					})(<Input.Password prefix={<Icon type="lock" />} placeholder="Nhập mật khẩu" />)}
				</Form.Item>
				<Form.Item label="Số điện thoại" labelAlign="left">
					{form.getFieldDecorator('phoneNumber', {
						rules: [
							{
								required: true,
								message: 'Không được để trống điện thoại',
							},
							{
								pattern: /^[0-9]*$/,
								message: 'Input is not number!',
							},
						],
					})(<Input prefix={<Icon type="phone" />} placeholder="Nhập số điện thoại" />)}
				</Form.Item>

				<Form.Item>
					<Button
						icon="plus"
						type="primary"
						className="btn-submit"
						htmlType="submit"
						loading={loadingCreate}
						style={{ float: 'right' }}
					>
						Tạo nhân viên
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

ModalCreateSubAdmin.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	visible: PropTypes.bool.isRequired,
	loadingCreate: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	createReq: PropTypes.func.isRequired,
	keyword: PropTypes.string.isRequired,
	pageSubAdminData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'create-subAdmin' })(ModalCreateSubAdmin);
