import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, Row, Col } from 'antd';

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

function ModalCreatePost(props) {
	const {
		visible,
		setvisible,
		form: { getFieldDecorator },
	} = props;
	return (
		<Modal
			title="Tạo mới bài viết"
			className="phh-modal"
			footer={null}
			visible={visible}
			width={600}
			onCancel={() => setvisible(false)}
		>
			<Form className="create-post form-custom">
				<Row gutter={16}>
					<Col xs={24} md={24}>
						<Form.Item label="Tiêu đề" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: 'Không được để trống tiêu đề bài viết',
									},
								],
							})(<Input placeholder="Nhập tiêu đề" />)}
						</Form.Item>
					</Col>
					<Col xs={24} md={24}>
						<Form.Item label="Nội dung" labelAlign="left">
							{getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: 'Không được để trống nội dung bài viết',
									},
								],
							})(<Input.TextArea rows={4} cols={3} placeholder="Nhập nội dung bài viết" />)}
						</Form.Item>
					</Col>
					<Col xs={24} md={24}>
						<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
							<Button className="btn-submit">Xác nhận</Button>
							<Button className="btn-cancel ml-5 " onClick={() => setvisible(false)}>
								Hủy
							</Button>
						</span>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
}

ModalCreatePost.propTypes = {
	visible: PropTypes.bool.isRequired,
	setvisible: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'create-post' })(ModalCreatePost);
