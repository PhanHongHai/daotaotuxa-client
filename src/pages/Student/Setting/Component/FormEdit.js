import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Button, Input, Select, DatePicker, Radio, ConfigProvider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import viVN from 'antd/es/locale/vi_VN';

import countries from '../../../../utils/country.json';
import AccountAction from '../../../Profile/Action';
import customMess from '../../../../utils/customMessage';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span:  4},
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

const disabledDate = current => {
	return current && current > moment().endOf('day');
};

moment.locale('vi');

function FormEdit(props) {
	const {
		form: { getFieldDecorator, validateFields },
	} = props;
	const [formData, setFormData] = useState({});
	const info = useSelector(state => state.loginPage.profileUser);
	const loadingEdit = useSelector(state => state.profileAccountPage.updateInfoStatus);
	const dispatch = useDispatch();

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
	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err) {
				dispatch(
					AccountAction.updateProfileRequest({
						req: {
							...formData,
						},
						cb: res => {
							if (res) {
								setFormData({});
								customMess('notification', 'success', res.msg);
							}
						},
					}),
				);
			}
		});
	};
	return (
		<Form className="form-custom" {...formItemLayout} onSubmit={handleSubmit}>
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
						<ConfigProvider locale={viVN}>
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
							initialValue: info && Number(info.sex),
							rules: [
								{
									required: true,
									message: 'Không được để trống giới tính',
								},
							],
						})(
							<Radio.Group className='radio-custom' onChange={onChangeInput} name="sex">
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
			</Row>

			<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
				<Button
					icon="edit"
					disabled={_.isEmpty(formData)}
					className="btn-submit	mr-5"
					htmlType="submit"
					loading={loadingEdit && loadingEdit === 'FETCHING'}
				>
					Cập nhật
				</Button>
			</span>
		</Form>
	);
}

FormEdit.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'edit-account' })(FormEdit);
