import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Row, Col, ConfigProvider, DatePicker, Radio } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import viVN from 'antd/es/locale/vi_VN';

import customMess from '../../../../utils/customMessage';
import countries from '../../../../utils/country.json';
import { localeVI } from '../../../../constands/Other';

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

function FormDetail(props) {
	const {
		form: { getFieldDecorator, validateFields },
		studentDetail,
		loadingEdit,
		loadingDelete,
		handleDelte,
		updateReq,
	} = props;

	const [formData, setFormData] = useState({});

	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err) {
				updateReq({
					req: {
						...formData,
					},
					ID: studentDetail && studentDetail._id,
					cb: res => {
						if (res) {
							customMess('notification', 'success', res.msg);
						}
					},
				});
			}
		});
	};

	const onChangeInput = e => {
		const target = e.target;
		setFormData({ ...formData, [target.name]: target.value });
	};
	const onChangeSelect = value => {
		setFormData({ ...formData, country: value });
	};
	const onChangeDate = date => {
		setFormData({ ...formData, birthDay: date });
	};

	return (
		<Form className="create-account form-custom" onSubmit={handleSubmit} {...formItemLayout}>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24}>
					<Form.Item label="Email" labelAlign="left">
						{getFieldDecorator('email', {
							initialValue: studentDetail && studentDetail.email,
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
							initialValue: studentDetail && studentDetail.name,
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
							initialValue: studentDetail && studentDetail.phoneNumber,
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
							initialValue: studentDetail && studentDetail.idCard,
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
						<ConfigProvider locale={viVN}>
							{getFieldDecorator('birthDay', {
								initialValue: studentDetail && moment(studentDetail.birthDay),
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
						</ConfigProvider>
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={24}>
					<Form.Item label="Giới Tính" labelAlign="left">
						{getFieldDecorator('sex', {
							initialValue: studentDetail && Number(studentDetail.sex),
							rules: [
								{
									required: true,
									message: 'Không được để trống giới tính',
								},
							],
						})(
							<Radio.Group
								className="radio-custom"
								defaultValue={studentDetail && Number(studentDetail.sex)}
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
							initialValue: studentDetail && studentDetail.country,
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
						{getFieldDecorator('address', { initialValue: studentDetail && studentDetail.address })(
							<Input onChange={onChangeInput} name="address" placeholder="Nhập địa chỉ" />,
						)}
					</Form.Item>
				</Col>
			</Row>

			<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
				<Button
					icon="edit"
					disabled={_.isEmpty(formData)}
					className="btn-submit	mr-5"
					htmlType="submit"
					loading={loadingEdit}
				>
					Cập nhật
				</Button>
				<Button
					icon="delete"
					className="btn-cancel	mr-5"
					loading={loadingDelete}
					onClick={() => handleDelte(studentDetail)}
				>
					Xóa
				</Button>
			</span>
		</Form>
	);
}

FormDetail.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	studentDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingEdit: PropTypes.bool.isRequired,
	loadingDelete: PropTypes.bool.isRequired,
	handleDelte: PropTypes.func.isRequired,
	updateReq: PropTypes.func.isRequired,
};

export default Form.create({ name: 'edit-student' })(FormDetail);
