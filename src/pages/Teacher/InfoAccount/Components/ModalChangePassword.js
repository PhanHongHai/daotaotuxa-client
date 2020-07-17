import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

import customMess from '../../../../utils/customMessage';

function ModalChangePassword(props) {
	const {
		visible,
		setVisible,
		form: { getFieldDecorator, validateFields, getFieldValue, resetFields },
		changeReq,
		loading,
	} = props;
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				changeReq({
					req: {
						...values,
					},
					cb: res => {
						if (res) {
							setVisible(false);
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};
	const compareToFirstPassword = (rule, value, callback) => {
		if (value && value !== getFieldValue('newPassword')) {
			callback('Không trùng khớp');
		} else {
			callback();
		}
	};

	return (
		<Modal
			title="Thay đổi mật khẩu"
			visible={visible}
			onCancel={() => {
				resetFields();
				setVisible(false);
			}}
			footer={null}
			className="phh-modal"
		>
			<Form className="form-custom" onSubmit={handleSubmit}>
				<Form.Item label="Mật khẩu cũ" labelAlign="left">
					{getFieldDecorator('oldPassword', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mật khẩu cũ',
							},
						],
					})(<Input.Password placeholder="Nhập mật khẩu cũ" />)}
				</Form.Item>
				<Form.Item label="Mật khẩu mới" labelAlign="left">
					{getFieldDecorator('newPassword', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mật khẩu mới',
							},
						],
					})(<Input.Password placeholder="Nhập mật khẩu mới" />)}
				</Form.Item>
				<Form.Item label="Xác nhận mật khẩu mới" labelAlign="left">
					{getFieldDecorator('confirmPassword', {
						rules: [
							{
								required: true,
								message: 'Không được để ô nhập lại mật khẩu mới',
							},
							{
								validator: compareToFirstPassword,
							},
						],
					})(<Input.Password placeholder="Nhập mật khẩu mới" />)}
				</Form.Item>
				<Form.Item>
					<Button className="btn-submit fl-right" htmlType="submit" loading={loading}>
						Xác nhận
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

ModalChangePassword.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	changeReq: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'change-password' })(ModalChangePassword);
