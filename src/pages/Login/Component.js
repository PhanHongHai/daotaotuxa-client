import React, { useState, useCallback } from 'react';
import { Row, Form, Col, Typography } from 'antd';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
// styled
import { LoginContainer, Container, StyleButton } from './styled';
import Logo from '../../assets/images/logo.png';
import FormStudent from './Component/FormStudent';
import FormOther from './Component/FormOther';
import customMess from '../../utils/customMessage';

function LoginComponent(props) {
	const { statusLogin, loginRequest, isActived, resendActiveReq, statusResendActiveMail,loginStudentRequest } = props;

	const [typeLogin, setTypeLogin] = useState(null);
	const loadingLogin = statusLogin === 'FETCHING';
	const loadingResendActive = statusResendActiveMail === 'FETCHING';

	const [formInitRef, setFormInitRef] = useState(null);
	const history = useHistory();

	const [emailCurrent, setEmailCurrent] = useState('');
	const saveFormRef = useCallback(node => {
		if (node !== null) {
			setFormInitRef(node);
		}
	}, []);
	const handleSubmitFormOther = e => {
		e.preventDefault();
		formInitRef.validateFields((err, values) => {
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
								// case 'teacher':
								// 	history.push('/teacher/dashboard');
								// 	break;
								case 'student':
									localStorage.clear();
									history.push('/hoc-vien');
									break;
								default:
									history.push('/teacher/dashboard');
									break;
							}
							customMess('notification','success','Đăng nhập thành công');
						
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
	const handleSubmitFormStudent = e => {
		e.preventDefault();
		formInitRef.validateFields((err, values) => {
			if (!err) {
				loginStudentRequest({
					req: {
						...values,
					},
					cb: res => {
						if (res) {
							history.push('/student/dashboard');
							customMess('notification','success','Đăng nhập thành công');
						}
					},
				});
			}
		});
	};
	const backStartForm = () => setTypeLogin(null);
	const renderFormLogin = () => {
		switch (typeLogin) {
			case 'student':
				return (
					<FormStudent
						ref={saveFormRef}
						handleSubmitFormStudent={handleSubmitFormStudent}
						loadingLogin={loadingLogin}
						backStartForm={backStartForm}
					/>
				);
			case 'other':
				return (
					<FormOther
						ref={saveFormRef}
						isActived={isActived}
						handleSubmitFormOther={handleSubmitFormOther}
						onResendActiveMail={onResendActiveMail}
						loadingResendActive={loadingResendActive}
						loadingLogin={loadingLogin}
						backStartForm={backStartForm}
					/>
				);
			default:
				return '';
		}
	};
	return (
		<LoginContainer>
			<Row type="flex" justify="center" align="middle">
				<Container>
					{typeLogin === null ? (
						<Form className="phh-form-get-start">
							<Col span={24}>
								<div className="logo">
									<img alt="logo" src={Logo} />
									<h1>ACADEMY</h1>
									HCM
								</div>
							</Col>
							<Col span={24}>
								<Typography>
									<Typography.Title level={4}>Trang đăng nhập</Typography.Title>
								</Typography>
								<p style={{ lineHeight: '20px !important' }}>Xin hãy chọn loại người dùng</p>
							</Col>
							<Col span={24}>
								<Form.Item>
									<StyleButton color="#47A1DD" onClick={() => setTypeLogin('student')} className="mb-10" icon="user">
										HỌC VIÊN
									</StyleButton>
									<StyleButton color="#1bb394" onClick={() => setTypeLogin('other')} icon="login">
										LOẠI TÀI KHOẢN KHÁC..
									</StyleButton>
								</Form.Item>
							</Col>
						</Form>
					) : (
						''
					)}
					{renderFormLogin()}
				</Container>
			</Row>
		</LoginContainer>
	);
}

LoginComponent.propTypes = {
	loginRequest: PropTypes.func.isRequired,
	loginStudentRequest: PropTypes.func.isRequired,
	resendActiveReq: PropTypes.func.isRequired,
	statusLogin: PropTypes.string.isRequired,
	statusResendActiveMail: PropTypes.string.isRequired,
	isActived: PropTypes.bool.isRequired,
};

export default LoginComponent;
