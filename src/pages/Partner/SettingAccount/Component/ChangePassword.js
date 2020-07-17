import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';

import customMess from '../../../../utils/customMessage';
import AccountAction from '../../../Profile/Action';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 },
	},
};

function ChangePassword(props) {
	const {
		form: { getFieldDecorator, validateFields, getFieldValue, resetFields },
	} = props;
	const loading = useSelector(state => state.profileAccountPage.changePasswordStatus);
	const dispatch = useDispatch();
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				dispatch(
					AccountAction.changePasswordRequest({
						req: {
							...values,
						},
						cb: res => {
							if (res) {
								resetFields();
								customMess('notification', 'success', res.msg);
							}
						},
					}),
				);
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
		<Form className="form-custom" onSubmit={handleSubmit} {...formItemLayout}>
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

			<Button className="btn-submit fl-right" htmlType="submit" loading={loading && loading === 'FETCHING'}>
				Xác nhận thay đổi mật khẩu
			</Button>
		</Form>
	);
}

ChangePassword.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'change-password' })(ChangePassword);
