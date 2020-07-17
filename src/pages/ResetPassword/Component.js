import React from 'react';
import { Row, Col, Form, Input, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useHistory, Link, useParams } from 'react-router-dom';
// styled
import { ResetPasswordContainer, SubmitButton, Container } from './styled';
import Logo from '../../assets/images/logo.png';

const { Title } = Typography;

function ResetPasswordComponent(props) {
	const {
		form: { getFieldValue, validateFields, getFieldDecorator },
		resetPWReq,
		statusResetPassword,
	} = props;
	const history = useHistory();
	const { tokenReset } = useParams();
	const loadingReset = statusResetPassword === 'FETCHING';
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				resetPWReq({
					req: {
						...values,
						tokenChange: tokenReset,
					},
					cb: res => {
						if (res && res.isRedirect) history.push('/login');
					},
				});
			}
		});
	};
	const compareToNewPassword = (rule, value, callback) => {
		if (value && value !== getFieldValue('newPassword')) {
			callback('Giá trị nhập lại không đúng');
		} else {
			callback();
		}
	};
	return (
		<ResetPasswordContainer>
			<Row type="flex" justify="center" align="middle">
				<Container>
					<Form className="reset-password" onSubmit={handleSubmit}>
						<Col span={24}>
							<div className="logo">
								<img alt="logo" src={Logo} />
								<h1>ACADEMY</h1>
								HCM
							</div>
						</Col>
						<Col>
							<Typography>
								<Title level={4}>Đổi mật khẩu</Title>
							</Typography>
							<p style={{ lineHeight: '20px !important' }}>Nhập mật khẩu mới để thay đổi mật khẩu cũ</p>
						</Col>
						<Col span={24}>
							<Form.Item label="Mật khẩu mới" labelAlign="left">
								{getFieldDecorator('newPassword', {
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
								})(<Input.Password placeholder="Nhập mật khẩu mới" />)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item label="Nhập lại mật khẩu" labelAlign="left">
								{getFieldDecorator('confirmPassword', {
									rules: [
										{
											required: true,
											message: 'Không được để trống nhập lại mật khẩu',
										},
										{
											validator: compareToNewPassword,
										},
									],
								})(<Input.Password placeholder="Nhập lại mật khẩu" />)}
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item>
								<SubmitButton icon="login" loading={loadingReset} htmlType="submit">
									Xác nhận
								</SubmitButton>
								<span style={{ float: 'right' }}>
									Đã có thông tin đăng nhập ? <Link to="/login">Đăng nhập</Link>
								</span>
							</Form.Item>
						</Col>
					</Form>
				</Container>
			</Row>
		</ResetPasswordContainer>
	);
}

ResetPasswordComponent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	statusResetPassword: PropTypes.string.isRequired,
	resetPWReq: PropTypes.func.isRequired,
};

export default Form.create({ name: 'reset-password' })(ResetPasswordComponent);
