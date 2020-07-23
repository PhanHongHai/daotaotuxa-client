import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Button } from 'antd';
import _ from 'lodash';

import { trainingType } from '../../../../constands/Other';
import customMess from '../../../../utils/customMessage';

function ModalEdit(props) {
	const {
		visible,
		setVisible,
		data,
		form: { getFieldDecorator, validateFields },
		loading,
		updateReq,
		pageCurrent,
		keyword,
	} = props;

	const [formData, setFormData] = useState({});

	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err)
				updateReq({
					req: { ...formData },
					ID: data._id,
					pageCurrent,
					keyword,
					cb: res => {
						if (res && res.isUpdated) {
							setVisible(false);
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
		<Modal
			className="phh-modal"
			title="Cập nhật ngành đào tạo"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
		>
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
				<Form.Item label="Mã ngành" labelAlign="left">
					{getFieldDecorator('code', {
						initialValue: data && data.code,
						rules: [
							{
								required: true,
								message: 'Không được để trống mã ngành đào tạo',
							},
						],
					})(<Input onChange={onChangeInput} name="name" placeholder="Nhập mã ngành" />)}
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
					<Button
						style={{ float: 'right' }}
						htmlType="submit"
						disabled={_.isEmpty(formData)}
						loading={loading}
						className="btn-submit"
					>
						Cập nhật
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

ModalEdit.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	data: PropTypes.objectOf(PropTypes.object).isRequired,
	loading: PropTypes.bool.isRequired,
	updateReq: PropTypes.func.isRequired,
	pageCurrent: PropTypes.objectOf(PropTypes.object).isRequired,
	keyword: PropTypes.string.isRequired,
};

export default Form.create({ name: 'update-sector' })(ModalEdit);
