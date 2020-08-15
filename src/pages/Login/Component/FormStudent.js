import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Input, Icon, } from 'antd';
import { Link } from 'react-router-dom';

import { LoginButton } from '../styled';
import Logo from '../../../assets/images/white.svg';

function FormStudent(props) {
	const { form, handleSubmitFormStudent, loadingLogin, backStartForm } = props;

	return (
		<Form className="phh-form-login" onSubmit={handleSubmitFormStudent}>
			<Col span={24} className="mb-15">
				<div className="logo">
					<span
						style={{
							backgroundColor: '#00bd87',
							padding: '1px',
							borderRadius: '5px',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<img alt="logo" src={Logo} />
					</span>
					<h1>Đào tạo từ xa</h1>
				</div>
			</Col>
			<Col span={24}>
				<h3>Mã học viên</h3>
				<Form.Item>
					{form.getFieldDecorator('tag', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mã học viên',
							},
							{
								whitespace: true,
								message: 'Chứa ký tự không hợp lệ',
							},
						],
					})(<Input prefix={<Icon type="idcard" />} placeholder="Nhập mã học viên" />)}
				</Form.Item>
			</Col>
			<Col span={24}>
				<h3>Mật khẩu</h3>
				<Form.Item>
					{form.getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mật khẩu',
							},
							{
								whitespace: true,
								message: 'Chứa ký tự không hợp lệ',
							},
						],
					})(<Input.Password prefix={<Icon type="lock" />} placeholder="Nhập mật khẩu" />)}
				</Form.Item>
			</Col>
			<Col span={24}>
				<Form.Item>
					<LoginButton icon="login" loading={loadingLogin} htmlType="submit">
						ĐĂNG NHẬP
					</LoginButton>
					<LoginButton icon="rollback" onClick={backStartForm} >
						QUAY VỀ
					</LoginButton>
					<Link style={{ float: 'right' }} to="/forgot-password">
						Quên mật khẩu ?
					</Link>
				</Form.Item>
			</Col>
		</Form>
	);
}

FormStudent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	handleSubmitFormStudent: PropTypes.func.isRequired,
	backStartForm: PropTypes.func.isRequired,
	loadingLogin: PropTypes.bool.isRequired,
};

export default Form.create({name:'login-student'})(FormStudent);
