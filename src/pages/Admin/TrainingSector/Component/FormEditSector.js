import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';
import _ from 'lodash';

import { trainingType } from '../../../../constands/Other';
import customMess from '../../../../utils/customMessage';

function FormEditSector(props) {
	const {
		data,
		form: { getFieldDecorator, validateFields },
		loading,
		loadingDelete,
		updateReq,
		handleDelete
	} = props;

	const [formData, setFormData] = useState({});

	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err)
				updateReq({
					req: { ...formData },
					ID:data._id,
					cb: res => {
						if (res && res.isUpdated) {
							customMess('notification', 'success', res.msg);
						}
					},
				});
		});
	};
	const onChangeInput = e => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};
	const onChangeSelect = value => {
		setFormData({ ...formData, type: value });
	};

	return (
			<Form onSubmit={handleSubmit}>
				<Form.Item label="Tên ngành" labelAlign="left">
					{getFieldDecorator('name', {
						initialValue: data && data.name,
						rules: [
							{
								required: true,
								message: 'Không được để trống tên ngành đào tạo',
							},
						],
					})(<Input onChange={onChangeInput} name="name" placeholder="Nhập tên ngành" />)}
				</Form.Item>
				<Form.Item label="Hệ đào tạo" labelAlign="left">
					{getFieldDecorator('type', {
						initialValue: data && data.type,
						rules: [
							{
								required: true,
								message: 'Không được để trống hệ đào tạo',
							},
						],
					})(
						<Select onChange={onChangeSelect} name="type" placeholder="-- Hệ đào tạo --">
							{trainingType.map(ele => (
								<Select.Option key={ele.key} value={ele.key}>
									{ele.value}
								</Select.Option>
							))}
						</Select>,
					)}
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" disabled={_.isEmpty(formData)} loading={loading} className="btn-submit">
						Cập nhật
					</Button>
					<Button loading={loadingDelete} onClick={handleDelete} >
						Xóa
					</Button>
				</Form.Item>
			</Form>
	);
}

FormEditSector.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingDelete: PropTypes.bool.isRequired,
	updateReq: PropTypes.func.isRequired,
	handleDelete: PropTypes.func.isRequired,
};

export default Form.create({ name: 'update-sector' })(FormEditSector);
