import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span:4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 20 },
	},
};

function ModalAuth(props) {
	const {
		visible,
		setVisible,
		form: { getFieldDecorator, validateFields, resetFields },
		loading,
		authPasswordReq,
		setCheck,
	} = props;

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err)
				authPasswordReq({
					req: {
						...values,
					},
					cb: res => {
						if (res && res.isAuthed) {
							setCheck(true);
							setVisible(false);
							resetFields();
						}
					},
				});
		});
	};

	return (
		<Modal className="phh-modal" title="Xác thực" footer={null} visible={visible} onCancel={() => setVisible(false)}>
			<Form onSubmit={handleSubmit} className="form-custom" {...formItemLayout} >
				<Form.Item label="Mật khẩu" labelAlign="left">
					{getFieldDecorator('password', {
						rules: [
							{
								required: true,
								message: 'Không được để trống mật khẩu',
							},
						],
					})(<Input.Password placeholder="Nhập mật khẩu" />)}
				</Form.Item>
				<span className="flex" style={{ justifyContent: 'flex-end' }}>
					<Button icon="file-protect" className="btn-submit" htmlType="submit" loading={loading}>
						Xác nhận
					</Button>
					<Button className="btn-cancel ml-5" onClick={() => setVisible(false)}>
						Đóng
					</Button>
				</span>
			</Form>
		</Modal>
	);
}

ModalAuth.propTypes = {
	visible: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	authPasswordReq: PropTypes.func.isRequired,
	setCheck: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'auth-account' })(ModalAuth);
