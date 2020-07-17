import React from 'react';
import { Row, Col, Form, Input, Icon, Typography } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// styled
import { ForgotPasswordContainer, Container, SubmitButton } from './styled';

import Logo from '../../assets/images/logo.png';

const { Title } = Typography;

function ForgotPasswordComponent(props) {
	const {
		form: { getFieldDecorator, validateFields },
		forgotPWReq,
		statusForgotPassword,
	} = props;

	const loadingForgotPW = statusForgotPassword === 'FETCHING';

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				forgotPWReq({
					req: {
						...values,
					},
				});
			}
		});
	};
	return (
		<ForgotPasswordContainer>
			<Row type="flex" justify="center" align="middle">
				<Container>
					<Form className="forgot-password" onSubmit={handleSubmit}>
						<Col span={24} className="margin-bottom-20">
							<div className="logo">
								<img alt="logo" src={Logo} />
								<h1>ACADEMY</h1>
								HCM
							</div>
						</Col>
						<Col>
							<Typography>
								<Title level={4}>Quên mật khẩu</Title>
							</Typography>
							<p style={{ lineHeight: '20px !important' }}>
								Nhập địa chỉ email đã xác minh tài khoản người dùng của bạn và chúng tôi sẽ gửi cho bạn một liên kết đặt
								lại mật khẩu.
							</p>
						</Col>
						<Col span={24}>
							<Form.Item label='Email' labelAlign='left'>
								{getFieldDecorator('email', {
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
							<Form.Item>
								<SubmitButton icon="mail" loading={loadingForgotPW} htmlType="submit">
									Gửi yêu cầu
								</SubmitButton>
								<span style={{ float: 'right' }}>
									Đã có thông tin đăng nhập ? <Link to="/login">Đăng nhập</Link>
								</span>
							</Form.Item>
						</Col>
					</Form>
				</Container>
			</Row>
		</ForgotPasswordContainer>
	);
}

ForgotPasswordComponent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	forgotPWReq: PropTypes.func.isRequired,
	statusForgotPassword: PropTypes.string.isRequired,
};

export default Form.create({ name: 'forgot-password' })(ForgotPasswordComponent);
