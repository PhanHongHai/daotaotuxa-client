import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button, Row, Col, InputNumber, Select, Icon } from 'antd';
import customMessage from '../../../../utils/customMessage';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 9 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 15 },
	},
};

function ModalCreateExamAuto(props) {
	const {
		visible,
		setVisible,
		loadingCreate,
		loadingGetTotalQuestion,
		form: { getFieldDecorator, validateFields, resetFields },
		totalQuestion,
		createReq,
		getTotalQuestionReq,
		keyword,
		pageCurrent,
	} = props;

	const [typeLevel, setTypeLevel] = useState({
		typeLevel1: 2,
		typeLevel2: 2,
		typeLevel3: 2,
		typeLevel4: 2,
	});

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				if (values.level1 === 0 && values.level2 === 0 && values.level3 === 0 && values.level4 === 0)
					customMessage('message', 'error', 'Vui lòng nhập số lượng câu hỏi');
				else
					createReq({
						req: {
							title: values.title,
							level1: { number: values.level1, type: values.typeLevel1 },
							level2: { number: values.level2, type: values.typeLevel2 },
							level3: { number: values.level3, type: values.typeLevel3 },
							level4: { number: values.level4, type: values.typeLevel4 },
						},
						pageCurrent,
						keyword,
						cb: res => {
							if (res && res.isCreated) {
								customMessage('notification', 'success', res.msg);
								setVisible(false);
								resetFields();
							}
						},
					});
			}
		});
	};
	const handleSelectType = (value, name) => {
		setTypeLevel({ ...typeLevel, [name]: value });
		getTotalQuestionReq({
			req: {
				...typeLevel,
				[name]: value,
			},
		});
	};
	return (
		<Modal
			width="700px"
			footer={null}
			className="phh-modal"
			title="Thêm mới đề thi tự động"
			visible={visible}
			onCancel={() => {
				resetFields();
				setVisible(false);
			}}
		>
			<Form className="form-custom form-exam-auto" onSubmit={handleSubmit}>
				<Row gutter={16}>
					<Col xs={24} md={24}>
						<Form.Item label="Tiêu đề" labelAlign="left">
							{getFieldDecorator('title', {
								rules: [
									{
										required: true,
										message: 'Không được để trống tiêu đề ',
									},
								],
							})(<Input placeholder="Nhập tiêu đề" />)}
						</Form.Item>
					</Col>
					<Col xs={14} md={14}>
						<Form.Item label="Câu hỏi dễ" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('level1', {
								initialValue: 1,
								rules: [
									{
										required: true,
										message: 'Không được để trống số lượng câu hỏi',
									},
								],
							})(<InputNumber min={0} max={totalQuestion && totalQuestion.level1} />)}
							<p className="text">
								Tối đa : {loadingGetTotalQuestion ? <Icon type="loading" /> : totalQuestion && totalQuestion.level1}{' '}
							</p>
						</Form.Item>
					</Col>
					<Col xs={10} md={10}>
						<Form.Item label="Trạng thái" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('typeLevel1', {
								initialValue: 2,
							})(
								<Select onChange={value => handleSelectType(value, 'typeLevel1')}>
									<Select.Option value={2}>Tất cả</Select.Option>
									<Select.Option value={1}>Công khai</Select.Option>
									<Select.Option value={0}>Riêng tư</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={14} md={14}>
						<Form.Item label="Câu hỏi trung bình" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('level2', {
								initialValue: 1,
								rules: [
									{
										required: true,
										message: 'Không được để trống số lượng câu hỏi',
									},
								],
							})(<InputNumber min={0} max={totalQuestion && totalQuestion.level2} />)}

							<p className="text">
								Tối đa : {loadingGetTotalQuestion ? <Icon type="loading" /> : totalQuestion && totalQuestion.level2}{' '}
							</p>
						</Form.Item>
					</Col>
					<Col xs={10} md={10}>
						<Form.Item label="Trạng thái" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('typeLevel2', {
								initialValue: 2,
							})(
								<Select onChange={value => handleSelectType(value, 'typeLevel2')}>
									<Select.Option value={2}>Tất cả</Select.Option>
									<Select.Option value={1}>Công khai</Select.Option>
									<Select.Option value={0}>Riêng tư</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={14} md={14}>
						<Form.Item label="Câu hỏi khó" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('level3', {
								initialValue: 1,
								rules: [
									{
										required: true,
										message: 'Không được để trống số lượng câu hỏi',
									},
								],
							})(<InputNumber min={0} max={totalQuestion && totalQuestion.level3} />)}
							<p className="text">
								Tối đa : {loadingGetTotalQuestion ? <Icon type="loading" /> : totalQuestion && totalQuestion.level3}{' '}
							</p>
						</Form.Item>
					</Col>
					<Col xs={10} md={10}>
						<Form.Item label="Trạng thái" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('typeLevel3', {
								initialValue: 2,
							})(
								<Select onChange={value => handleSelectType(value, 'typeLevel3')}>
									<Select.Option value={2}>Tất cả</Select.Option>
									<Select.Option value={1}>Công khai</Select.Option>
									<Select.Option value={0}>Riêng tư</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={14} md={14}>
						<Form.Item label="Câu hỏi rất khó" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('level4', {
								initialValue: 1,
								rules: [
									{
										required: true,
										message: 'Không được để trống số lượng câu hỏi',
									},
								],
							})(<InputNumber min={0} max={totalQuestion && totalQuestion.level4} />)}
							<p className="text">
								Tối đa : {loadingGetTotalQuestion ? <Icon type="loading" /> : totalQuestion && totalQuestion.level4}{' '}
							</p>
						</Form.Item>
					</Col>
					<Col xs={10} md={10}>
						<Form.Item label="Trạng thái" labelAlign="left" {...formItemLayout}>
							{getFieldDecorator('typeLevel4', {
								initialValue: 2,
							})(
								<Select onChange={value => handleSelectType(value, 'typeLevel4')}>
									<Select.Option value={2}>Tất cả</Select.Option>
									<Select.Option value={1}>Công khai</Select.Option>
									<Select.Option value={0}>Riêng tư</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
				</Row>
				<span className="flex" style={{ justifyContent: 'flex-end' }}>
					<Button icon="plus" loading={loadingCreate} className="btn-submit" htmlType="submit">
						Tạo đề thi
					</Button>
					<Button
						className="btn-cancel ml-5"
						onClick={() => {
							resetFields();
							setVisible(false);
						}}
					>
						Đóng
					</Button>
				</span>
			</Form>
		</Modal>
	);
}

ModalCreateExamAuto.propTypes = {
	visible: PropTypes.bool.isRequired,
	loadingCreate: PropTypes.bool.isRequired,
	loadingGetTotalQuestion: PropTypes.bool.isRequired,
	keyword: PropTypes.string.isRequired,
	setVisible: PropTypes.func.isRequired,
	createReq: PropTypes.func.isRequired,
	getTotalQuestionReq: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	totalQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
	pageCurrent: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'create-exam-auto' })(ModalCreateExamAuto);
