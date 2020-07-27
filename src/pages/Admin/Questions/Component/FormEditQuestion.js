import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Radio, Button, Form, Select } from 'antd';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

import CkeditorUpdateContent from './CkeditorUpdateContent';

import { FormEditQuestionStyle } from '../styled';
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

function FormEditQuestion(props) {
	const {
		form: { getFieldDecorator, validateFields },
		loadingUpdate,
		loadingSubjectsForQuestion,
		subjects,
		updateQuestionReq,
		handleRemoveQuestion,
		questionID,
		info,
	} = props;
	const [formValue, setFormValue] = useState({});
	const [valueAnswer, setValueAnswer] = useState(null);
	const history = useHistory();

	const onChangeType = e => {
		setFormValue({ ...formValue, type: e.target.value });
	};
	const onChangeSelect = (value, name) => {
		setFormValue({ ...formValue, [name]: value });
	};
	const onChangeAnswer = e => {
		setValueAnswer(e.target.value);
		setFormValue({ ...formValue, answer: e.target.value });
	};
	const onChangeValueContent = (event, editor) => {
		const data = editor.getData();
		setFormValue({ ...formValue, content: data });
	};
	const onChangeValueAnswerA = (event, editor) => {
		const data = editor.getData();
		setFormValue({ ...formValue, answerA: data });
	};
	const onChangeValueAnswerB = (event, editor) => {
		const data = editor.getData();
		setFormValue({ ...formValue, answerB: data });
	};
	const onChangeValueAnswerC = (event, editor) => {
		const data = editor.getData();
		setFormValue({ ...formValue, answerC: data });
	};
	const onChangeValueAnswerD = (event, editor) => {
		const data = editor.getData();
		setFormValue({ ...formValue, answerD: data });
	};
	const handleSubmit = e => {
		e.preventDefault();
		validateFields(err => {
			if (!err)
				updateQuestionReq({
					req: {
						...formValue,
					},
					ID: questionID,
					cb: res => {
						if (res && res.isUpdated) {
							setFormValue({});
							cusstomMess('notification', 'success', res.msg);
						}
					},
				});
		});
	};
	return (
		<FormEditQuestionStyle className="form-custom" onSubmit={handleSubmit}>
			<Row gutter={16}>
				<Col xs={24} md={24}>
					<Form.Item label="Nội dung câu hỏi" labelAlign="left">
						{getFieldDecorator(
							'content',
							{},
						)(<CkeditorUpdateContent key="content" content={info && info.content} onChange={onChangeValueContent} />)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Trạng thái" labelAlign="left" {...formItemLayout}>
						{getFieldDecorator('type', {
							initialValue: info && info.type,
							rules: [
								{
									required: true,
									message: 'Xin hãy chọn trạng thái câu hỏi',
								},
							],
						})(
							<Radio.Group onChange={onChangeType}>
								<Radio key={1} value={1}>
									Công khai
								</Radio>
								<Radio key={0} value={0}>
									Riêng tư
								</Radio>
							</Radio.Group>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Môn học liên quan" labelAlign="left" {...formItemLayout}>
						{getFieldDecorator('tag', {
							initialValue: info.tag && info.tag._id,
						})(
							<Select onChange={value => onChangeSelect(value, 'tag')} loading={loadingSubjectsForQuestion} showSearch>
								{subjects &&
									subjects.map(ele => (
										<Select.Option key={ele._id} value={ele._id}>
											#{ele.tag}&ensp;-&ensp; {ele.name}
										</Select.Option>
									))}
							</Select>,
						)}
					</Form.Item>
				</Col>
				<Col xs={24} md={24}>
					<Form.Item label="Độ khó" labelAlign="left" {...formItemLayout}>
						{getFieldDecorator('level', {
							initialValue: info && info.level,
							rules: [
								{
									required: true,
									message: 'Xin hãy chọn độ khó câu hỏi',
								},
							],
						})(
							<Select placeholder="-- Mức độ --" onChange={value => onChangeSelect(value, 'level')}>
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
											<Radio.Group onChange={onChangeAnswer} value={valueAnswer || (info && info.answer)}>
												<Radio value="A">A</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorUpdateContent content={info && info.answerA} onChange={onChangeValueAnswerA} />
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
											<Radio.Group onChange={onChangeAnswer} value={valueAnswer || (info && info.answer)}>
												<Radio value="B">B</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorUpdateContent content={info && info.answerB} onChange={onChangeValueAnswerB} />
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
											<Radio.Group onChange={onChangeAnswer} value={valueAnswer || (info && info.answer)}>
												<Radio value="C">C</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorUpdateContent content={info && info.answerC} onChange={onChangeValueAnswerC} />
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
											<Radio.Group onChange={onChangeAnswer} value={valueAnswer || (info && info.answer)}>
												<Radio value="D">D</Radio>
											</Radio.Group>
										</span>
									</Col>
									<Col xs={24} md={21}>
										<span className="content-answer">
											<CkeditorUpdateContent content={info && info.answerD} onChange={onChangeValueAnswerD} />
										</span>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Col>
				<Col xs={24} md={24} className="mt-10">
					<span style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
						<Button
							icon="plus"
							className="btn-submit"
							htmlType="submit"
							loading={loadingUpdate}
							disable={!_.isEmpty(formValue)}
						>
							Cập nhật
						</Button>
						<Button type="danger" className="btn-cancel ml-5" onClick={() => handleRemoveQuestion()}>
							Xóa
						</Button>
						<Button className="btn-cancel ml-5" onClick={() => history.goBack()}>
							Quay về
						</Button>
					</span>
				</Col>
			</Row>
		</FormEditQuestionStyle>
	);
}

FormEditQuestion.propTypes = {
	form: PropTypes.objectOf(PropTypes.any).isRequired,
	loadingUpdate: PropTypes.bool.isRequired,
	questionID: PropTypes.string.isRequired,
	loadingSubjectsForQuestion: PropTypes.bool.isRequired,
	updateQuestionReq: PropTypes.func.isRequired,
	handleRemoveQuestion: PropTypes.func.isRequired,
	subjects: PropTypes.instanceOf(Array).isRequired,
	info: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Form.create({ name: 'edit-question' })(FormEditQuestion);
