import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Select } from 'antd';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

function StepCustomTest(props) {
	const {
		form: { getFieldDecorator, validateFields, resetFields },
	} = props;
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {});
	};
	return (
		<div>
			<Form className="form-custom" {...formItemLayout} onSubmit={handleSubmit}>
				<Form.Item label="Mức độ đề thi" labelAlign="left">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Không được để trống tiêu đề',
							},
						],
					})(<Select placeholder="Nhập tiêu đề"></Select>)}
				</Form.Item>
				<Form.Item label="Thời gian làm bài" labelAlign="left">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: 'Không được để trống tiêu đề',
							},
						],
					})(<Select placeholder="Nhập tiêu đề"></Select>)}
				</Form.Item>
			</Form>
		</div>
	);
}

StepCustomTest.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'step-custom' })(StepCustomTest);
