import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, Button } from 'antd';
import { trainingType } from '../../../../constands/Other';
import customMess from '../../../../utils/customMessage';

function ModalCreate(props) {
	const {
		visible,
		setVisible,
		form: { getFieldDecorator, validateFields , resetFields},
		pageCurrent,
		createReq,
		loading,
		keyword
	} = props;

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err)
				createReq({
					req: { ...values },
					keyword,
					pageCurrent,
					cb: res => {
						if (res && res.isCreated) {
							setVisible(false);
							resetFields();
							customMess('notification', 'success', res.msg);
						}
					},
				});
		});
	};

	return (
		<Modal
			className="phh-modal"
			title="Thêm mới ngành đào tạo"
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
		>
			<Form onSubmit={handleSubmit}>
				<Form.Item label="Tên ngành" labelAlign="left">
					{getFieldDecorator('name', {
						rules: [
							{
								required: true,
								message: 'Không được để trống tên ngành đào tạo',
							},
						],
					})(<Input placeholder="Nhập tên ngành" />)}
				</Form.Item>
				<Form.Item label="Mã ngành" labelAlign="left">
					{getFieldDecorator('code', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mã ngành đào tạo',
							},
						],
					})(<Input placeholder="Nhập mã ngành" />)}
				</Form.Item>
				<Form.Item label="Hệ đào tạo" labelAlign="left">
					{getFieldDecorator('type', {
						rules: [
							{
								required: true,
								message: 'Không được để trống hệ đào tạo',
							},
						],
					})(
						<Select placeholder="-- Hệ đào tạo --">
							{trainingType.map(ele => (
								<Select.Option key={ele.key} value={ele.key}>
									{ele.value}
								</Select.Option>
							))}
						</Select>,
					)}
				</Form.Item>
				<Form.Item>
					<Button htmlType="submit" loading={loading} className="btn-submit">
						Thêm
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

ModalCreate.propTypes = {
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	pageCurrent: PropTypes.objectOf(PropTypes.object).isRequired,
	createReq: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	keyword: PropTypes.string.isRequired,
};

export default Form.create({ name: 'create-sector' })(ModalCreate);
