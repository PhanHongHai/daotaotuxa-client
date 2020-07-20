import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Row, Col, Select } from 'antd';

import countries from '../../../../utils/country.json';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

function FormCreateTeacher(props) {
	const { loadingCreate, handleSubmit, form } = props;
	return (
		<Form className="create-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
			<Row gutter={16}>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Email" labelAlign="left">
						{form.getFieldDecorator('email', {
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
						{form.getFieldDecorator('name', {
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
						{form.getFieldDecorator('password', {
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
						{form.getFieldDecorator('phoneNumber', {
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
					<Form.Item label="Địa chỉ" labelAlign="left">
						{form.getFieldDecorator('address', {})(<Input placeholder="Nhập địa chỉ" />)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Quê Quán" labelAlign="left">
						{form.getFieldDecorator('country', {
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
				<Col xs={24} sm={24} md={24}>
					<Button
						icon="plus"
						className="btn-submit"
						htmlType="submit"
						loading={loadingCreate}
						style={{ float: 'right' }}
					>
						Tạo tài khoản
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

FormCreateTeacher.propTypes = {
	loadingCreate: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'create-teacher' })(FormCreateTeacher);
