import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
		md: { span: 6 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
		md: { span: 18 },
	},
};

function FormSubjectEdit(props) {
	const {
		form: { getFieldDecorator },
	} = props;

	return (
		<Form className="create-subject form-custom">
			<Row gutter={16}>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Tiêu đề" labelAlign="left"  {...formItemLayout}> 
						{getFieldDecorator('title', {
							rules: [
								{
									required: true,
									message: 'Không được để trống tiêu đề',
								},
							],
						})(<Input placeholder="Nhập tiêu đề môn học" />)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={12} md={12}>
					<Form.Item label="Ngành đào tạo" labelAlign="left"  {...formItemLayout}>
						{getFieldDecorator('trainingSectorID', {
							rules: [
								{
									required: true,
									message: 'Không được để trống ngành đào tạo',
								},
							],
						})(
							<Select placeholder="Chọn ngành đào tạo">
								<Option key="1" value="1">
									Công nghệ thông tin
								</Option>
								<Option key="2" value="2">
									Trắc địa
								</Option>
								<Option key="3" value="3">
									Hệ thống thông tin
								</Option>
							</Select>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={24}>
					<Form.Item label="Giới thiệu" labelAlign="left">
						{getFieldDecorator('introduce', {})(<Input.TextArea rows={4} placeholder="Nhập tiêu đề môn học" />)}
					</Form.Item>
				</Col>
				<Col xs={24} sm={24} md={24}>
					<Form.Item>
						<Button icon="plus" className="btn-submit" htmlType="submit" style={{ float: 'right' }}>
							Cập nhật
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}

FormSubjectEdit.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'edit-subject' })(FormSubjectEdit);
