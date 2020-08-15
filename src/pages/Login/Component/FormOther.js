import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Input, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { LoginButton } from '../styled';
import Logo from '../../../assets/images/logo.png';

function FormOther(props) {
	const { form, handleSubmitFormOther, loadingLogin, isActived, loadingResendActive, backStartForm ,onResendActiveMail} = props;


	return (
		<Form className="phh-form-login" onSubmit={handleSubmitFormOther}>
			<Col span={24}>
				<div className="logo">
					<img alt="logo" src={Logo} />
					<h1>ACADEMY</h1>
					HCM
				</div>
			</Col>
			<Col span={24}>
				<h3>Email</h3>
				<Form.Item>
					{form.getFieldDecorator('email', {
						rules: [
							{
								required: true,
								message: 'Không được để trống Email',
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
					})(<Input type="email" prefix={<Icon type="mail" />} placeholder="Nhập email" />)}
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
			{!isActived ? (
				<span style={{ float: 'right' }}>
					Nhận mail kích hoạt
					<button
						type="button"
						onClick={onResendActiveMail}
						style={{
							boxShadow: 'none',
							color: 'blue',
							background: 'transparent',
							padding: '0 4px',
							cursor: 'pointer',
							border: 'none',
							outline: 'none',
						}}
					>
						tại đây&ensp;{loadingResendActive ? <Icon type="loading" /> : ''}
					</button>
				</span>
			) : (
				''
			)}
			<Col span={24}>
				<Form.Item>
					<LoginButton icon="login" loading={loadingLogin} htmlType="submit">
						ĐĂNG NHẬP
					</LoginButton>
					<LoginButton icon="rollback" onClick={backStartForm}>
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

FormOther.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	handleSubmitFormOther: PropTypes.func.isRequired,
	backStartForm: PropTypes.func.isRequired,
	onResendActiveMail: PropTypes.func.isRequired,
	loadingLogin: PropTypes.bool.isRequired,
	loadingResendActive: PropTypes.bool.isRequired,
	isActived: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'login-other' })(FormOther);
