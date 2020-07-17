import React from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	Card,
	Form,
	Button,
	Input,
	Select,
	DatePicker,
	Radio,
	ConfigProvider,
	Typography,
	Breadcrumb,
} from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';
import { useHistory, Link } from 'react-router-dom';

import countries from '../../../utils/country.json';
import customMess from '../../../utils/customMessage';

moment.locale('vi');

const disabledDate = current => {
	return current && current > moment().endOf('day');
};

function CreateStudent(props) {
	const {
		form: { validateFields, getFieldDecorator },
		createStudentStatus,
		createStudentReq,
	} = props;
	const history = useHistory();
	const loadingCreate = createStudentStatus === 'FETCHING';
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				createStudentReq({
					req: {
						...values,
						role: 'student',
					},
					cb: res => {
						if (res.isRedirect) {
							history.push('/partner/dashboard');
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};

	return (
		<div className="container mt-15 mb-15">
			<div>
				<Row>
					<Col xs={24} md={24} className="mb-10">
						<Typography.Title level={3}>Thêm Học Viên</Typography.Title>
						<Breadcrumb>
							<Breadcrumb.Item>
								<Link to="/partner/dashboard">Dashboard</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Thêm học viên</Breadcrumb.Item>
						</Breadcrumb>
					</Col>
					<Col xs={24} md={24}>
						<Card className="phh-card" title="Thêm tài khoản học viên">
							<Form className="create-account form-custom" onSubmit={handleSubmit}>
								<Row gutter={16}>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Email" labelAlign="left">
											{getFieldDecorator('email', {
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
											})(<Input placeholder="Nhập email" />)}
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Họ tên" labelAlign="left">
											{getFieldDecorator('name', {
												rules: [
													{
														required: true,
														message: 'Không được để trống họ tên',
													},
												],
											})(<Input placeholder="Nhập họ tên" />)}
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Mật khẩu" labelAlign="left">
											{getFieldDecorator('password', {
												rules: [
													{
														required: true,
														message: 'Không được để trống mật khẩu',
													},
												],
											})(<Input.Password placeholder="Nhập mật khẩu" />)}
										</Form.Item>
									</Col>

									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Số điện thoại" labelAlign="left">
											{getFieldDecorator('phoneNumber', {
												rules: [
													{
														required: true,
														message: 'Không được để trống điện thoại',
													},
													{
														pattern: /^[0-9]*$/,
														message: 'Không phải là số !',
													},
												],
											})(<Input placeholder="Nhập số điện thoại" />)}
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="CMND" labelAlign="left">
											{getFieldDecorator('idCard', {
												rules: [
													{
														required: true,
														message: 'Không được để trống CMND',
													},
													{
														pattern: /^[0-9]*$/,
														message: 'Không phải là số !',
													},
												],
											})(<Input placeholder="Nhập CMND" />)}
										</Form.Item>
									</Col>

									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Ngày sinh" labelAlign="left">
											<ConfigProvider locale={viVN}>
												{getFieldDecorator('birthDay', {
													rules: [
														{
															required: true,
															message: 'Không được để trống ngày sinh',
														},
													],
												})(<DatePicker disabledDate={disabledDate} placeholder="Ngày sinh" format="DD-MM-YYYY" />)}
											</ConfigProvider>
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Quê Quán" labelAlign="left">
											{getFieldDecorator('country', {
												rules: [
													{
														required: true,
														message: 'Không được để trống quê quán',
													},
												],
											})(
												<Select placeholder="Chọn quê quán">
													{countries.map(ele => (
														<Select.Option value={ele.key} key={ele.key}>
															{ele.name}
														</Select.Option>
													))}
												</Select>,
											)}
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Địa chỉ" labelAlign="left">
											{getFieldDecorator('address', {})(<Input placeholder="Nhập địa chỉ" />)}
										</Form.Item>
									</Col>
									<Col xs={24} sm={12} md={12}>
										<Form.Item label="Giới Tính" labelAlign="left">
											{getFieldDecorator('sex', {
												rules: [
													{
														required: true,
														message: 'Không được để trống giới tính',
													},
												],
											})(
												<Radio.Group className="radio-custom">
													<Radio value={1}>Nam</Radio>
													<Radio value={2}>Nữ</Radio>
												</Radio.Group>,
											)}
										</Form.Item>
									</Col>
								</Row>

								<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
									<Button icon="plus" className="btn-submit" htmlType="submit" loading={loadingCreate}>
										Tạo học viên
									</Button>
									<Button className="btn-cancel ml-5" onClick={() => history.goBack()}>
										Quay lại
									</Button>
								</span>
							</Form>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}

CreateStudent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	createStudentStatus: PropTypes.string.isRequired,
	createStudentReq: PropTypes.func.isRequired,
};

export default Form.create({ name: 'student-create' })(CreateStudent);
