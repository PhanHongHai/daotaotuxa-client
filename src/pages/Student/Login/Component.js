import React from 'react';
import { Row, Col, Form, Input, Icon, notification } from 'antd';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
// styled
import { LoginContainer, LoginButton, Container } from './styled';
import Logo from '../../../assets/images/white.svg';

function LoginComponent(props) {
	const { form, statusLogin, loginRequest } = props;
	const loadingLogin = statusLogin === 'FETCHING';
const history =useHistory();
	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				loginRequest({
					req: {
						...values,
					},
					cb: res => {
						if (res) {
							history.push('/student/dashboard');
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

	return (
		<LoginContainer>
			<Row type="flex" justify="center" align="middle">
				<Container>
					<Form className="phh-form-login" onSubmit={handleSubmit}>
						<Col span={24} className='mb-15'>
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
	statusLogin: PropTypes.string.isRequired,
};

export default Form.create({ name: 'login-student' })(LoginComponent);
