import React, { useState } from 'react';
import { Row, Col, Form, Input, Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
// styled
import { LoginContainer, LoginButton, Container } from './styled';
import Logo from '../../assets/images/logo.png';

function LoginComponent(props) {
	const { form, statusLogin, loginRequest, isActived, resendActiveReq, statusResendActiveMail } = props;
	const [emailCurrent, setEmailCurrent] = useState('');
	const loadingLogin = statusLogin === 'FETCHING';
	const loadingResendActive = statusResendActiveMail === 'FETCHING';

	const history = useHistory();

	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				setEmailCurrent(values.email);
				loginRequest({
					req: {
						...values,
					},
					cb: res => {
						if (res) {
							switch (res.role) {
								case 'admin':
								case 'employment':
									history.push('/admin/dashboard');
									break;
								case 'partner':
									history.push('/partner/dashboard');
									break;
								case 'teacher':
									history.push('/teacher/dashboard');
									break;
								default:
									history.push('/student/dashboard');
									break;
							}
							notification.success({
								message: 'Thông báo !',
								description: 'Đăng nhập thành công',
								placement: 'bottomRight',
							});
						}
					},
				});
			}
		});
	};
	const onResendActiveMail = () => {
		resendActiveReq({
			req: {
				email: emailCurrent,
			},
		});
	};
	return (
		<LoginContainer>
			<Row type="flex" justify="center" align="middle">
				<Container>
					<Form className="phh-form-login" onSubmit={handleSubmit}>
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
								<Link style={{ float: 'right' }} to="/forgot-password">
									Quên mật khẩu ?
								</Link>
							</Form.Item>
						</Col>
					</Form>
				</Container>
			</Row>
		</LoginContainer>
	);
}

LoginComponent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	loginRequest: PropTypes.func.isRequired,
	resendActiveReq: PropTypes.func.isRequired,
	statusLogin: PropTypes.string.isRequired,
	statusResendActiveMail: PropTypes.string.isRequired,
	isActived: PropTypes.bool.isRequired,
};

export default Form.create({ name: 'phh-login' })(LoginComponent);
