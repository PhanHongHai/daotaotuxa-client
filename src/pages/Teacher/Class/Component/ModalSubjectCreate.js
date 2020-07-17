import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

import customMess from '../../../../utils/customMessage';

function ModalCreate(props) {
	const {
		visible,
		setVisible,
		createReq,
		loadingCreate,
		keyword,
		pageCurrent,
		sectorID,
		form: { getFieldDecorator, validateFields, resetFields },
	} = props;
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				createReq({
					req: {
						...values,
					},
					keyword,
					pageCurrent,
					sectorID,
					cb: res => {
						if (res && res.isCreated) {
							setVisible(false);
							customMess('notification', 'success', res.msg);
							resetFields();
						}
					},
				});
			}
		});
	};

	return (
		<Modal
			className="phh-modal"
			title="Thêm mới môn học"
			centered
			visible={visible}
			onCancel={() => setVisible(false)}
			footer={null}
		>
			<Form className="create-subject form-custom" onSubmit={handleSubmit}>
				<Form.Item label="Tên môn học">
					{getFieldDecorator('name', {
						rules: [
							{
								required: true,
								message: 'Không được để trống tên môn học',
							},
							{
								min:5,
								message:'Tối thiểu 5 ký tự'
							},
							{
								max:100,
								message:'Tối đa 100 ký tự'
							}
						],
					})(<Input placeholder="Nhập tên môn học" />)}
				</Form.Item>
				<Form.Item label="Mã môn học">
					{getFieldDecorator('tag', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mã môn học',
							},
						],
					})(<Input placeholder="Nhập mã môn học" />)}
				</Form.Item>
				<Form.Item label="Mô tả">
					{getFieldDecorator('introduce', {})(<Input.TextArea rows={4} placeholder="Nhập mô tả môn học" />)}
				</Form.Item>
				<Form.Item>
					<Button
						loading={loadingCreate}
						icon="plus"
						className="btn-submit"
						htmlType="submit"
						style={{ float: 'right' }}
					>
						Tạo môn học
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	);
}

ModalCreate.propTypes = {
	keyword: PropTypes.string.isRequired,
	sectorID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	createReq: PropTypes.func.isRequired,
	loadingCreate: PropTypes.bool.isRequired,
	form: PropTypes.objectOf(PropTypes.object).isRequired,
	pageCurrent: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Form.create({ name: 'create-subject' })(ModalCreate);
