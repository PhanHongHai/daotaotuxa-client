import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Row, Col, Tooltip } from 'antd';

import _ from 'lodash';

function FormEmployment(props) {
	const { loadingEdit, handleSubmit, form, info, saveDataForm, formData, openChangePass } = props;

	const onChangeInput = e => {
		const target = e.target;
		saveDataForm({ ...formData, [target.name]: target.value });
	};

	return (
		<Form className="edit-account form-custom" onSubmit={handleSubmit}>
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
					<Form.Item label="Mật khẩu" labelAlign="left">
						<span style={{ display: 'flex' }}>
							<h1>**************</h1>
							<Tooltip title="Thay đổi mật khẩu">
								<Button
									icon="edit"
									className="btn-transparent"
									style={{ fontSize: '14px' }}
									onClick={() => openChangePass(true)}
								/>
							</Tooltip>
						</span>
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={24}>
					<Button
						icon="plus"
						className="btn-submit"
						htmlType="submit"
						loading={loadingEdit}
						style={{ float: 'right' }}
						disabled={_.isEmpty(formData)}
					>
						Cập nhật
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

FormEmployment.propTypes = {
	loadingEdit: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	formData: PropTypes.objectOf(PropTypes.object).isRequired,
	saveDataForm: PropTypes.func.isRequired,
	openChangePass: PropTypes.func.isRequired,
};

export default Form.create({ name: 'edit-admin' })(FormEmployment);
