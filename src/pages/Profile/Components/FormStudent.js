import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Row, Col, Select,DatePicker,Radio } from 'antd';
import moment from 'moment';
import _ from 'lodash';

import countries from '../../../utils/country.json';
import { localeVI } from '../../../constands/Other';

const disabledDate = current => {
	return current && current > moment().endOf('day');
};

function FormStudent(props) {
	const { loadingEdit, handleSubmit, form:{getFieldDecorator}, info, saveDataForm, dataForm } = props;

	const onChangeInput = e => {
		const target = e.target;
		saveDataForm({ ...dataForm, [target.name]: target.value });
	};
	const onChangeSelect = value => {
		saveDataForm({ ...dataForm, country: value });
  };
  const onChangeDate = date => {
		saveDataForm({ ...dataForm, birthDay: date });
	};
	return (
		<Form className="edit-account form-custom" onSubmit={handleSubmit}>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24}>
					<Form.Item label="Email" labelAlign="left">
						{getFieldDecorator('email', {
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
				<Col xs={24} sm={24} md={24}>
					<Form.Item label="Họ tên" labelAlign="left">
						{getFieldDecorator('name', {
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

				<Col xs={24} sm={12} md={24}>
					<Form.Item label="Số điện thoại" labelAlign="left">
						{getFieldDecorator('phoneNumber', {
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
				<Col xs={24} sm={12} md={24}>
					<Form.Item label="CMND" labelAlign="left">
						{getFieldDecorator('idCard', {
							initialValue: info && info.idCard,
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
						})(<Input onChange={onChangeInput} name="idCard" placeholder="Nhập CMND" />)}
					</Form.Item>
				</Col>

				<Col xs={24} sm={12} md={24}>
					<Form.Item label="Ngày sinh" labelAlign="left">
						{getFieldDecorator('birthDay', {
							initialValue: info && moment(info.birthDay),
							rules: [
								{
									required: true,
									message: 'Không được để trống ngày sinh',
								},
							],
						})(
							<DatePicker
								onChange={onChangeDate}
								locale={localeVI}
								disabledDate={disabledDate}
								placeholder="Ngày sinh"
								format="DD-MM-YYYY"
							/>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={24}>
					<Form.Item label="Giới Tính" labelAlign="left">
						{getFieldDecorator('sex', {
							initialValue: info && Number(info.sex),
							rules: [
								{
									required: true,
									message: 'Không được để trống giới tính',
								},
							],
						})(
							<Radio.Group
								defaultValue={info && Number(info.sex)}
								onChange={onChangeInput}
								name="sex"
							>
								<Radio value={1}>Nam</Radio>
								<Radio value={2}>Nữ</Radio>
							</Radio.Group>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={24}>
					<Form.Item label="Quê Quán" labelAlign="left">
						{getFieldDecorator('country', {
							initialValue: info && info.country,
							rules: [
								{
									required: true,
									message: 'Không được để trống quê quán',
								},
							],
						})(
							<Select onChange={onChangeSelect} placeholder="Chọn quê quán">
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
						{getFieldDecorator('address', { initialValue: info && info.address })(
							<Input onChange={onChangeInput} name="address" placeholder="Nhập địa chỉ" />,
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
						Cập nhật
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

FormStudent.propTypes = {
	loadingEdit: PropTypes.bool.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	info: PropTypes.objectOf(PropTypes.object).isRequired,
	dataForm: PropTypes.objectOf(PropTypes.object).isRequired,
	saveDataForm: PropTypes.func.isRequired,
};

export default Form.create({ name: 'edit-student' })(FormStudent);
