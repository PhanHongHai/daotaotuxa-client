import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Row, Col, Select } from 'antd';

import _ from 'lodash';

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

function FormEditTeacher(props) {
	const { loadingEdit, handleSubmit, form, info ,saveDataForm, dataForm} = props;


	const onChangeInput = e => {
		const target = e.target;
		saveDataForm({...dataForm, [target.name]: target.value });
	};
	const onChangeSelect = value => {
		saveDataForm({ ...dataForm, country: value });
	};
	return (
		<Form className="edit-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
			<Row gutter={16}>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Email" labelAlign="left">
						{form.getFieldDecorator('email', {
							initialValue: info && info.email,
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
						})(<Input onChange={onChangeInput} name="email" placeholder="Nhập email" />)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Họ tên" labelAlign="left">
						{form.getFieldDecorator('name', {
							initialValue: info && info.name,
							rules: [
								{
									required: true,
									message: 'Không được để trống họ tên',
								},
							],
						})(<Input onChange={onChangeInput} name="name" placeholder="Nhập họ tên" />)}
					</Form.Item>
				</Col>
			

				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Số điện thoại" labelAlign="left">
						{form.getFieldDecorator('phoneNumber', {
							initialValue: info && info.phoneNumber,
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
						})(<Input onChange={onChangeInput} name="phoneNumber" placeholder="Nhập số điện thoại" />)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Địa chỉ" labelAlign="left">
						{form.getFieldDecorator('address', { initialValue: info && info.address })(
							<Input placeholder="Nhập địa chỉ" onChange={onChangeInput} name="address" />,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Quê Quán" labelAlign="left">
						{form.getFieldDecorator('country', {
							initialValue: info && info.country,
							rules: [
								{
									required: true,
									message: 'Không được để trống quê quán',
								},
							],
						})(
							<Select placeholder="Chọn quê quán" onChange={onChangeSelect}>
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
						loading={loadingEdit}
						style={{ float: 'right' }}
						disabled={_.isEmpty(dataForm)}
					>
						Cập nhật giảng viên
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

FormEditTeacher.propTypes = {
	loadingEdit: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	dataForm: PropTypes.objectOf(PropTypes.object).isRequired,
	saveDataForm: PropTypes.func.isRequired,
};

export default Form.create({ name: 'edit-teacher' })(FormEditTeacher);
