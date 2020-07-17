import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input, Button, Row, Col, Select, Radio } from 'antd';
import _ from 'lodash';

import AccountAction from '../../../Profile/Action';

import customMess from '../../../../utils/customMessage';
import countries from '../../../../utils/country.json';



function FormEditAccount(props) {
	const { form } = props;
	const [dataForm, setDataForm] = useState({});
	const info = useSelector(state => state.loginPage.profileUser);
	const loadingEdit = useSelector(state => state.profileAccountPage.updateInfoStatus);
	const dispatch = useDispatch();
	const onChangeInput = e => {
		const target = e.target;
		setDataForm({ ...dataForm, [target.name]: target.value });
	};
	const onChangeSelect = value => {
		setDataForm({ ...dataForm, country: value });
	};

	const handleSubmit = e => {
		e.preventDefault();
		form.validateFields(err => {
			if (!err) {
				dispatch(
					AccountAction.updateProfileRequest({
						req: {
							...dataForm,
						},
						cb: res => {
							if (res) {
								setDataForm({});
								customMess('notification', 'success', res.msg);
							}
						},
					}),
				);
			}
		});
	};
	return (
		<Form className="form-custom" onSubmit={handleSubmit}>
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
							<Radio.Group
								className="radio-custom"
								defaultValue={info && Number(info.sex)}
								onChange={onChangeInput}
								name="sex"
							>
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
					<span style={{ display: 'inline-block' }}>
						Tỷ lệ hoa hồng :&ensp;
						<h3 style={{ color: 'green', display: 'inline-block' }}>{info && info.commissionRate}%</h3>
					</span>

					<Button
						icon="plus"
						className="btn-submit"
						htmlType="submit"
						loading={loadingEdit && loadingEdit === 'FETCHING'}
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

FormEditAccount.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'info-account' })(FormEditAccount);
