import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Radio, Button, Form, Select } from 'antd';
import { useHistory } from 'react-router-dom';

import CkeditorCustom from './CkeditorCustom';

import { FormCreateQuestionStyle } from '../styled';
import cusstomMess from '../../../../utils/customMessage';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 3 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 21 },
	},
};

function FormCreateQuestion(props) {
	const {
		form: { getFieldDecorator, validateFields },
		loadingCreate,
		loadingSubjectsForQuestion,
		subjects,
		createQuestionReq,
	} = props;
	const [valueContent, setValueContent] = useState('');
	const [valueAnswerA, setValueAnswerA] = useState('');
	const [valueAnswerB, setValueAnswerB] = useState('');
	const [valueAnswerC, setValueAnswerC] = useState('');
	const [valueAnswerD, setValueAnswerD] = useState('');
	const [answerValue, setAnswerValue] = useState('');

	const history = useHistory();

	const onChangeValueContent = (event, editor) => {
		const data = editor.getData();
		setValueContent(data);
	};
	const onChangeValueAnswerA = (event, editor) => {
		const data = editor.getData();
		setValueAnswerA(data);
	};
	const onChangeValueAnswerB = (event, editor) => {
		const data = editor.getData();
		setValueAnswerB(data);
	};
	const onChangeValueAnswerC = (event, editor) => {
		const data = editor.getData();
		setValueAnswerC(data);
	};
	const onChangeValueAnswerD = (event, editor) => {
		const data = editor.getData();
		setValueAnswerD(data);
	};
	const handleChangeRadio = e => setAnswerValue(e.target.value);
	const handleSubmit = e => {
		e.preventDefault();
		validateFields((err, values) => {
			if (!err) {
				if (
					valueContent === '' ||
					answerValue === '' ||
					valueAnswerA === '' ||
					valueAnswerB === '' ||
					valueAnswerC === '' ||
					valueAnswerD === ''
				)
					cusstomMess('notification', 'error', 'Không được để trống thông tin câu hỏi');
				else
					createQuestionReq({
						req: {
							type: values.type,
							level: values.level,
							tag: values.tag,
							content: valueContent,
							answerA: valueAnswerA,
							answerB: valueAnswerB,
							answerC: valueAnswerC,
							answerD: valueAnswerD,
							answer: answerValue,
						},
						cb: res => {
							if (res && res.isCreated) {
								history.push('/admin/ngan-hang-cau-hoi');
								cusstomMess('notification', 'success', res.msg);
							}
						},
					});
			}
		});
	};
	return (
		<FormCreateQuestionStyle className="form-custom" onSubmit={handleSubmit}>
			<Row gutter={16}>
				<Col xs={24} md={24}>
					<Form.Item label="Nội dung câu hỏi" labelAlign="left">
						{getFieldDecorator('content', {
							rules: [
								{
									required: true,
									message: 'Không được để trống nội dung câu hỏi',
								},
							],
						})(<CkeditorCustom onChange={onChangeValueContent} />)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Trạng thái" labelAlign="left" {...formItemLayout}>
						{getFieldDecorator('type', {
							innitalValue: 1,
							rules: [
								{
									required: true,
									message: 'Xin hãy chọn trạng thái câu hỏi',
								},
							],
						})(
							<Radio.Group>
								<Radio value={1}>Công khai</Radio>
								<Radio value={0}>Riêng tư</Radio>
							</Radio.Group>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Môn học liên quan" labelAlign="left" {...formItemLayout}>
						{getFieldDecorator(
							'tag',
							{},
						)(
							<Select loading={loadingSubjectsForQuestion} mode="multiple">
								{subjects.map(ele => (
									<Select.Option key={ele._id} value={ele.name}>
										{ele.name}
									</Select.Option>
								))}
							</Select>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Độ khó" labelAlign="left" {...formItemLayout}>
						{getFieldDecorator('level', {
							rules: [
								{
									required: true,
									message: 'Xin hãy chọn độ khó câu hỏi',
								},
							],
						})(
							<Select placeholder='-- Mức độ --' >
								<Select.Option value={1}>Dễ</Select.Option>
								<Select.Option value={2}>Trung bình</Select.Option>
								<Select.Option value={3}>Khó</Select.Option>
								<Select.Option value={4}>Rất khó</Select.Option>
							</Select>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Row>
						<Col xs={24} md={4}>
							<h4>Đáp án đúng</h4>
						</Col>
						<Col xs={24} md={20}>
							<h4>Nội dung câu hỏi</h4>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<div className="list-answer">
								<Row>
									<Col xs={24} md={3}>
										<span className="radio-answer">
											<Radio.Group onChange={handleChangeRadio} value={answerValue}>
												<Radio value="A">A</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorCustom onChange={onChangeValueAnswerA} />
										</span>
									</Col>
								</Row>
							</div>
						</Col>
						<Col span={24}>
							<div className="list-answer">
								<Row>
									<Col xs={24} md={3}>
										<span className="radio-answer">
											<Radio.Group onChange={handleChangeRadio} value={answerValue}>
												<Radio value="B">B</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorCustom onChange={onChangeValueAnswerB} />
										</span>
									</Col>
								</Row>
							</div>
						</Col>
						<Col span={24}>
							<div className="list-answer">
								<Row>
									<Col xs={24} md={3}>
										<span className="radio-answer">
											<Radio.Group onChange={handleChangeRadio} value={answerValue}>
												<Radio value="C">C</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorCustom onChange={onChangeValueAnswerC} />
										</span>
									</Col>
								</Row>
							</div>
						</Col>
						<Col span={24}>
							<div className="list-answer">
								<Row>
									<Col xs={24} md={3}>
										<span className="radio-answer">
											<Radio.Group onChange={handleChangeRadio} value={answerValue}>
												<Radio value="D">D</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorCustom onChange={onChangeValueAnswerD} />
										</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={24} className="mt-10">
					<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
						<Button icon="plus" className="btn-submit" htmlType="submit" loading={loadingCreate}>
							Tạo câu hỏi
						</Button>
						<Button className="btn-cancel ml-5" onClick={() => history.goBack()}>
							Quay về
						</Button>
					</span>
				</Col>
			</Row>
		</FormCreateQuestionStyle>
	);
}

FormCreateQuestion.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingCreate: PropTypes.bool.isRequired,
	loadingSubjectsForQuestion: PropTypes.bool.isRequired,
	createQuestionReq: PropTypes.func.isRequired,
	subjects: PropTypes.instanceOf(Array).isRequired,
};

export default Form.create({ name: 'create-question' })(FormCreateQuestion);
