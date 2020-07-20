import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Form, Button, Input, Select, DatePicker, Radio, ConfigProvider } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import moment from 'moment';
import 'moment/locale/vi';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import AccountAction from '../Action';
import countries from '../../../../utils/country.json';

import BreadCrumb from '../../../../components/BreadCrumb';
import customMess from '../../../../utils/customMessage';

moment.locale('vi');

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'user',
		path: '/admin/tai-khoan/hoc-vien',
		text: 'Quản lý học viên',
	},
];

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

const disabledDate = current => {
	return current && current > moment().endOf('day');
};

function CreateStudent(props) {
	const {
		form: { validateFields, getFieldDecorator,resetFields },
		createStatus,
		createReq,
	} = props;
	const history = useHistory();
	const loadingCreate = createStatus === 'FETCHING';
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				createReq({
					req: {
						...values,
						role: 'student',
					},
					cb: res => {
						if (res.isRedirect) {
							history.push('/admin/tai-khoan/hoc-vien');
							customMess('notification', 'success', res.msg);
							resetFields();
						}
					},
				});
			}
		});
	};

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Tạo tài khoản học viên" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Card className="phh-card" title="Thông tin tài khoản">
					<Form className="create-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
						<Row gutter={16}>
							<Col xs={24} sm={24} md={24}>
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
							<Col xs={24} sm={24} md={24}>
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
							<Col xs={24} sm={12} md={24}>
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

							<Col xs={24} sm={12} md={24}>
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
							<Col xs={24} sm={12} md={24}>
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

							<Col xs={24} sm={12} md={24}>
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
							<Col xs={24} sm={12} md={24}>
								<Form.Item label="Giới Tính" labelAlign="left">
									{getFieldDecorator('sex', {
										rules: [
											{
												required: true,
												message: 'Không được để trống giới tính',
											},
										],
									})(
										<Radio.Group>
											<Radio value={1}>Nam</Radio>
											<Radio value={2}>Nữ</Radio>
										</Radio.Group>,
									)}
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={24}>
								<Form.Item label="Quê Quán" labelAlign="left">
									{getFieldDecorator('country', {
										rules: [
											{
												required: true,
												message: 'Không được để trống quê quán',
											},
										],
									})(
										<Select showSearch placeholder="Chọn quê quán">
											{countries.map(ele => (
												<Select.Option value={ele.key} key={ele.key}>
													{ele.name}
												</Select.Option>
											))}
										</Select>,
									)}
								</Form.Item>
							</Col>
							<Col xs={24} sm={12} md={24}>
								<Form.Item label="Địa chỉ" labelAlign="left">
									{getFieldDecorator('address', {})(<Input placeholder="Nhập địa chỉ" />)}
								</Form.Item>
							</Col>
						</Row>

						<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
							<Button icon="plus" className="btn-submit" htmlType="submit" loading={loadingCreate}>
								Tạo học viên
							</Button>
						</span>
					</Form>
				</Card>
			</div>
		</div>
	);
}

CreateStudent.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	createStatus: PropTypes.string.isRequired,
	createReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	createStatus: state.accountPage.createStudentStatus,
});

const mapDispatchToProps = {
	createReq: AccountAction.createStudentRequest,
};
export default Form.create({ name: 'student-create' })(connect(mapStateToProps, mapDispatchToProps)(CreateStudent));
