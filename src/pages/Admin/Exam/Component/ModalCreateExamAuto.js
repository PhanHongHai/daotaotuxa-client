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
		loadingGetSubjects,
		form: { getFieldDecorator, validateFields, resetFields },
		totalQuestion,
		createReq,
		getTotalQuestionReq,
		keyword,
		pageCurrent,
		subjects,
	} = props;

	const [typeLevel, setTypeLevel] = useState({
		typeLevel1: 2,
		typeLevel2: 2,
		typeLevel3: 2,
		typeLevel4: 2,
	});
	const [subjectValue, setSubjectValue] = useState('');
	const [numberQuestions, setNumberQuestions] = useState(0);

	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				if (values.level1 === 0 && values.level2 === 0 && values.level3 === 0 && values.level4 === 0)
					customMessage('message', 'error', 'Số lượng câu hỏi không đủ để tạo đề thi');
				console.log(numberQuestions);
				console.log(values.level1 + values.level2 + values.level3 + values.level4);
				if (values.level1 + values.level2 + values.level3 + values.level4 > numberQuestions)
					customMessage('message', 'error', 'Số lượng câu hỏi không hợp lệ với số lượng đã chọn');
				else
					createReq({
						req: {
							title: values.title,
							subjectID: values.subjectID,
							number: values.number,
							point: parseFloat(10 / values.number),
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
								setNumberQuestions(0);
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
				tag: subjectValue,
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
				setSubjectValue('');
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
					{/* <Col xs={24} md={24}>
						<Form.Item label="Điểm mỗi câu hỏi" labelAlign="left">
							{getFieldDecorator('point', {
								rules: [
									{
										required: true,
										message: 'Hãy nhập điểm cho mỗi câu hỏi',
									},
								],
							})(<InputNumber placeholder="Nhập điểm" min={1} max={10} style={{ width: '100%' }} />)}
						</Form.Item>
					</Col> */}
					<Col xs={24} md={24}>
						<Form.Item label="Số lượng câu hỏi" labelAlign="left">
							{getFieldDecorator('number', {
								rules: [
									{
										required: true,
										message: 'Vui lòng chọn số lượng câu hỏi',
									},
								],
							})(
								<Select
									onChange={value => setNumberQuestions(value)}
									placeholder="-- Số lượng câu hỏi --"
									style={{ width: '100%' }}
								>
									<Select.Option value={25}>25</Select.Option>
									<Select.Option value={40}>40</Select.Option>
									<Select.Option value={60}>60</Select.Option>
									<Select.Option value={120}>120</Select.Option>
								</Select>,
							)}
						</Form.Item>
					</Col>
					<Col xs={24} md={24}>
						<Form.Item label="Môn học liên quan" labelAlign="left">
							{getFieldDecorator('subjectID', {
								rules: [
									{
										required: true,
										message: 'Hãy chọn môn học',
									},
								],
							})(
								<Select
									loading={loadingGetSubjects}
									onChange={value => {
										setSubjectValue(value);
										getTotalQuestionReq({
											req: {
												typeLevel1: 2,
												typeLevel2: 2,
												typeLevel3: 2,
												typeLevel4: 2,
												tag: value,
											},
										});
									}}
									showSearch
									placeholder="-- Môn học --"
								>
									{subjects.map(ele => (
										<Select.Option key={ele._id} value={ele._id}>
											#{ele.tag}&ensp;-&ensp; {ele.name}
										</Select.Option>
									))}
								</Select>,
							)}
						</Form.Item>
					</Col>
					{subjectValue && subjectValue !== '' ? (
						<>
							<Col xs={14} md={14}>
								<Form.Item label="Câu hỏi dễ" labelAlign="left" {...formItemLayout}>
									{getFieldDecorator('level1', {
										initialValue: 0,
										rules: [
											{
												required: true,
												message: 'Không được để trống số lượng câu hỏi',
											},
										],
									})(<InputNumber min={0} max={totalQuestion && totalQuestion.level1} />)}
									<p className="text">
										{loadingGetTotalQuestion ? (
											<Icon type="loading" />
										) : (
											<span>Hiện có :{totalQuestion ? totalQuestion.level1 : 0}</span>
										)}
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
										initialValue: 0,
										rules: [
											{
												required: true,
												message: 'Không được để trống số lượng câu hỏi',
											},
										],
									})(<InputNumber min={0} max={totalQuestion && totalQuestion.level2} />)}
									<p className="text">
										{loadingGetTotalQuestion ? (
											<Icon type="loading" />
										) : (
											<span>Hiện có :{totalQuestion ? totalQuestion.level2 : 0}</span>
										)}
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
										initialValue: 0,
										rules: [
											{
												required: true,
												message: 'Không được để trống số lượng câu hỏi',
											},
										],
									})(<InputNumber min={0} max={totalQuestion && totalQuestion.level3} />)}
									<p className="text">
										{loadingGetTotalQuestion ? (
											<Icon type="loading" />
										) : (
											<span>Hiện có :{totalQuestion ? totalQuestion.level3 : 0}</span>
										)}
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
										initialValue: 0,
										rules: [
											{
												required: true,
												message: 'Không được để trống số lượng câu hỏi',
											},
										],
									})(<InputNumber min={0} max={totalQuestion && totalQuestion.level4} />)}
									<p className="text">
										{loadingGetTotalQuestion ? (
											<Icon type="loading" />
										) : (
											<span>Hiện có :{totalQuestion ? totalQuestion.level4 : 0}</span>
										)}
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
						</>
					) : (
						''
					)}
				</Row>
				<span className="flex" style={{ justifyContent: 'flex-end' }}>
					<Button icon="plus" loading={loadingCreate} className="btn-submit" htmlType="submit">
						Tạo đề thi
					</Button>
					<Button
						className="btn-cancel ml-5"
						onClick={() => {
							resetFields();
							setSubjectValue('');
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
	loadingGetSubjects: PropTypes.bool.isRequired,
	keyword: PropTypes.string.isRequired,
	setVisible: PropTypes.func.isRequired,
	createReq: PropTypes.func.isRequired,
	getTotalQuestionReq: PropTypes.func.isRequired,
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	totalQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
	pageCurrent: PropTypes.objectOf(PropTypes.any).isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'create-exam-auto' })(ModalCreateExamAuto);
