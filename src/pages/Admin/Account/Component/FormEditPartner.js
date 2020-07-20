import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Row, Col, Select, InputNumber, Radio } from 'antd';
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

function FormEditPartner(props) {
	const { loadingEdit, handleSubmit, form, info, saveDataForm, dataForm } = props;

	const onChangeInput = e => {
		const target = e.target;
		saveDataForm({ ...dataForm, [target.name]: target.value });
	};
	const onChangeInputNumber = value => {
		saveDataForm({ ...dataForm, commissionRate: value });
	};
	const onChangeSelect = value => {
		saveDataForm({ ...dataForm, country: value });
	};

	return (
		<Form className="create-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
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
							<Input onChange={onChangeInput} name="address" placeholder="Nhập địa chỉ" />,
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
							<Select showSearch onChange={onChangeSelect} placeholder="Chọn quê quán">
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
					<Form.Item label="Tỷ lệ hoa hồng" labelAlign="left">
						{form.getFieldDecorator('commissionRate', {
							initialValue: info && info.commissionRate,

							rules: [
								{
									required: true,
									message: 'Không được để trống tỷ lệ hoa hồng',
								},
							],
						})(
							<InputNumber
								onChange={onChangeInputNumber}
								min={0}
								max={100}
								formatter={value => `${value}%`}
								parser={value => value.replace('%', '')}
								style={{ width: '100%' }}
								placeholder="Nhập tỷ lệ hoa hồng"
							/>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Giới Tính" labelAlign="left">
						{form.getFieldDecorator('sex', {
							initialValue: info && info.sex,
							valuePropName: 'checked',
							rules: [
								{
									required: true,
									message: 'Không được để trống giới tính',
								},
							],
						})(
							<Radio.Group defaultValue={info && Number(info.sex)} onChange={onChangeInput} name="sex">
								<Radio key={1} value={1}>
									Nam
								</Radio>
								<Radio key={2} value={2}>
									Nữ
								</Radio>
							</Radio.Group>,
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
						Cập nhật đối tác
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

FormEditPartner.propTypes = {
	loadingEdit: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	saveDataForm: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	dataForm: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Form.create({ name: 'edit-partner' })(FormEditPartner);
