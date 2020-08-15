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
	const [level, setLevel] = React.useState(1);
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			resetFields();
		});
	};
	return (
		<div>
			<Form className="form-custom" {...formItemLayout} onSubmit={handleSubmit}>
				<Form.Item label="Mức độ đề thi" labelAlign="left">
					{getFieldDecorator('level', {
						initialValue: 1,
						rules: [
							{
								required: true,
								message: 'Không được để trống tiêu đề',
							},
						],
					})(
						<Select onChange={value => setLevel(value)} placeholder="-- Mức độ --">
							<Select.Option value={1}>Dễ</Select.Option>
							<Select.Option value={2}>Trung bình</Select.Option>
							<Select.Option value={3}>Khó</Select.Option>
							<Select.Option value={4}>Rất Khó</Select.Option>
						</Select>,
					)}
				</Form.Item>
				<Form.Item label="Số lượng câu hỏi" labelAlign="left">
					{getFieldDecorator('level', {
						initialValue: 1,
						rules: [
							{
								required: true,
								message: 'Xin hãy chọn số lượng câu hỏi',
							},
						],
					})(
						<Select onChange={value => setLevel(value)} placeholder="-- Mức độ --">
							<Select.Option value={1}>Dễ</Select.Option>
							<Select.Option value={2}>Trung bình</Select.Option>
							<Select.Option value={3}>Khó</Select.Option>
							<Select.Option value={4}>Rất Khó</Select.Option>
						</Select>,
					)}
				</Form.Item>
				<Form.Item label="Thời gian làm bài" labelAlign="left"></Form.Item>
				<Form.Item>
					<Button>Bắt đầu</Button>
				</Form.Item>
			</Form>
		</div>
	);
}

StepCustomTest.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'step-custom' })(StepCustomTest);
