import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Modal, Steps, Button, Row, Col, Tag, List, Select, Form, Divider, Result, Radio, message } from 'antd';
import { useHistory } from 'react-router-dom';

import StepSubject from './StepSubject';
import StepTest from './StepTest';

import { ResuleQuizStyle } from '../styled';
import ResultIcon from '../../../../assets/images/result-1.png';

const { Step } = Steps;
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

function ModalQuickTest(props) {
	const {
		visible,
		setVisible,
		subjectList,
		loading,
		loadingGetProgressByStudent,
		loadingGetQuestions,
		progressOfStudent,
		sectorID,
		classID,
		questionsData,
		getSubjectsReq,
		getQuestionsReq,
	} = props;
	const [current, setCurrent] = useState(0);
	const [subjectData, setSubjectData] = useState({});
	const [visibleStepCustom, setVisibleStepCustom] = useState(false);
	const [visibleStepTest, setVisibleStepTest] = useState(false);
	const [level, setLevel] = useState(1);
	const [numberQuestion, setNumberQuestion] = useState(25);
	const [timeDoTest, setTimeDoTest] = useState(45);
	const [arrayQuestion, setArrayQuestion] = useState([]);
	const [currentChoice, setCurrentChoice] = useState({});
	const [isNext, setIsNext] = React.useState(false);

	const history = useHistory();

	const loadingGetQuestionsForTest = loadingGetQuestions === 'FETCHING';

	const next = () => {
		const currentStep = current + 1;
		setCurrent(currentStep);
	};

	const prev = () => {
		const currentStep = current - 1;
		setCurrent(currentStep);
		if (currentStep === 0) {
			setVisibleStepCustom(false);
			setSubjectData({});
		}
	};
	const onClose = () => {
		setCurrent(0);
		setSubjectData({});
		setVisibleStepCustom(false);
		setLevel(1);
		setNumberQuestion(25);
		setTimeDoTest(45);
	};
	const renderContentTest = levelValue => {
		switch (levelValue) {
			case 1:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 80,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 20,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 0,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 0,
						color: 'red',
					},
				];
			case 2:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 50,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 50,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 0,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 0,
						color: 'red',
					},
				];
			case 3:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 10,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 20,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 60,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 10,
						color: 'red',
					},
				];
			default:
				return [
					{
						text: 'Câu Hỏi Dễ',
						value: 0,
						color: 'green',
					},
					{
						text: 'Câu Hỏi Trung Bình',
						value: 0,
						color: 'geekblue',
					},
					{
						text: 'Câu Hỏi Khó',
						value: 40,
						color: 'orange',
					},
					{
						text: 'Câu Hỏi Rất khó',
						value: 60,
						color: 'red',
					},
				];
		}
	};
	const renderLevelText = levelValue => {
		switch (levelValue) {
			case 1:
				return 'Dễ';
			case 2:
				return 'Trung Bình';
			case 3:
				return 'Khó';
			default:
				return 'Rất Khó';
		}
	};
	const renderDataChart = levelValue => {
		switch (levelValue) {
			case 1:
				return [80, 20, 0, 0];
			case 2:
				return [50, 50, 0, 0];
			case 3:
				return [10, 20, 60, 10];
			default:
				return [0, 0, 40, 60];
		}
	};
	const handleGetQuestions = levelValue => {
		let optionNumberQuestion = {};
		switch (levelValue) {
			case 1:
				optionNumberQuestion = {
					level1: Math.round((80 * numberQuestion) / 100),
					level2: Math.round((20 * numberQuestion) / 100),
					level3: Math.round((0 * numberQuestion) / 100),
					level4: Math.round((0 * numberQuestion) / 100),
				};
				break;
			case 2:
				optionNumberQuestion = {
					level1: Math.round((50 * numberQuestion) / 100),
					level2: Math.round((50 * numberQuestion) / 100),
					level3: Math.round((0 * numberQuestion) / 100),
					level4: Math.round((0 * numberQuestion) / 100),
				};
				break;
			case 3:
				optionNumberQuestion = {
					level1: Math.round((10 * numberQuestion) / 100),
					level2: Math.round((20 * numberQuestion) / 100),
					level3: Math.round((60 * numberQuestion) / 100),
					level4: Math.round((10 * numberQuestion) / 100),
				};
				break;
			default:
				optionNumberQuestion = {
					level1: Math.round((0 * numberQuestion) / 100),
					level2: Math.round((0 * numberQuestion) / 100),
					level3: Math.round((40 * numberQuestion) / 100),
					level4: Math.round((60 * numberQuestion) / 100),
				};
				break;
		}
		getQuestionsReq({
			req: {
				...optionNumberQuestion,
				subjectID: subjectData.subjectID && subjectData.subjectID._id,
			},
			cb: res => {
				if (res && res.length > 0) {
					const currentStep = current + 1;
					setCurrent(currentStep);
					const arrRender = res.map((ele, index) => {
						return {
							title: `${index + 1}`,
							content: (
								<div className="question-item" key={ele._id}>
									<Divider />
									<div className="box-question">
										<div className="question-title">
											<Row type="flex" justify="space-around" align="middle">
												<Col span={2}>
													<span className="question-name">{index + 1}</span>
												</Col>
												<Col span={22}>
													<span className="text" dangerouslySetInnerHTML={{ __html: ele.content }} />
												</Col>
											</Row>
										</div>
										<div className="question-content">
											<Row>
												<Col xs={24} md={24}>
													<span>
														<Radio.Group
															onChange={e => {
																setCurrentChoice({
																	questionID: ele._id,
																	answer: e.target.value,
																});
																setIsNext(true);
															}}
															className="radio-custom"
															key={ele._id}
														>
															<Row>
																<Col xs={24} md={24} className="mt-10 mb-10">
																	<Radio value="A">
																		A.&ensp;
																		<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerA }} />
																	</Radio>
																</Col>
																<Col xs={24} md={24} className="mt-10 mb-10">
																	<Radio value="B">
																		B.&ensp;
																		<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerB }} />
																	</Radio>
																</Col>
																<Col xs={24} md={24} className="mt-10 mb-10">
																	<Radio value="C">
																		C.&ensp;
																		<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerC }} />
																	</Radio>
																</Col>
																<Col xs={24} md={24} className="mt-10 mb-10">
																	<Radio value="D">
																		D.&ensp;
																		<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerD }} />
																	</Radio>
																</Col>
															</Row>
														</Radio.Group>
													</span>
												</Col>
											</Row>
										</div>
									</div>
								</div>
							),
						};
					});
					setArrayQuestion(arrRender);
				} else message.warn('Số lượng câu hỏi không đủ!');
			},
		});
	};
	const steps = [
		{
			title: 'Môn Học',
			content: (
				<StepSubject
					subjectList={subjectList}
					loading={loading}
					loadingGetProgressByStudent={loadingGetProgressByStudent}
					progressOfStudent={progressOfStudent}
					sectorID={sectorID}
					classID={classID}
					getReq={getSubjectsReq}
					setVisibleStepCustom={setVisibleStepCustom}
					setSubjectData={setSubjectData}
					next={next}
				/>
			),
		},
		{
			title: 'Tùy Chọn',
			content: (
				<div>
					<Form className="form-custom" {...formItemLayout}>
						<Form.Item label="Mức độ đề thi" labelAlign="left">
							<Select
								defaultValue={level}
								onChange={value => {
									setLevel(value);
								}}
								placeholder="-- Mức độ --"
							>
								<Select.Option value={1}>Dễ</Select.Option>
								<Select.Option value={2}>Trung bình</Select.Option>
								<Select.Option value={3}>Khó</Select.Option>
								<Select.Option value={4}>Rất Khó</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Số lượng câu hỏi" labelAlign="left">
							<Select
								defaultValue={numberQuestion}
								onChange={value => setNumberQuestion(value)}
								placeholder="-- Số câu hỏi --"
							>
								<Select.Option value={25}>25 câu</Select.Option>
								<Select.Option value={40}>40 câu</Select.Option>
								<Select.Option value={60}>60 câu</Select.Option>
								<Select.Option value={120}>120 câu</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item label="Thời gian làm bài" labelAlign="left">
							<Select defaultValue={timeDoTest} onChange={value => setTimeDoTest(value)} placeholder="-- Thời gian --">
								<Select.Option value={45}>45 phút</Select.Option>
								<Select.Option value={60}>60 phút</Select.Option>
								<Select.Option value={90}>90 phút</Select.Option>
								<Select.Option value={120}>120 phút</Select.Option>
							</Select>
						</Form.Item>
					</Form>
				</div>
			),
		},
		{
			title: 'Xác nhận',
			content: (
				<div>
					<Row gutter={16}>
						<Col xs={24} md={12}>
							<h3>Thông tin bài thi</h3>
							<Row>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Mã Môn Học :&ensp; <Tag>{subjectData.subjectID && subjectData.subjectID.tag}</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Môn Học : &ensp;<Tag>{subjectData.subjectID && subjectData.subjectID.name}</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Mức độ đề thi : &ensp;<Tag>{renderLevelText(level)}</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Thời gian làm bài : &ensp;<Tag>{timeDoTest} phút</Tag>
									</h4>
								</Col>
								<Col xs={24} md={24} className="mt-15">
									<h4>
										Số lượng câu hỏi : &ensp;<Tag>{numberQuestion} câu</Tag>
									</h4>
								</Col>
							</Row>
						</Col>
						<Col xs={24} md={12}>
							<div className="mb-10 " style={{ height: '210px' }}>
								<h3>Thông tin câu hỏi</h3>
								<Pie
									data={{
										labels: ['Dễ', 'Trung bình', 'Khó', 'Rất khó'],
										datasets: [
											{
												data: renderDataChart(level),
												backgroundColor: ['#52c41a', '#2f54eb', '#fa8c16', '#f5222d'],
												hoverBackgroundColor: ['#b7eb8f', '#adc6ff', '#ffd591', '#ffa39e'],
											},
										],
									}}
									legend={{
										display: true,
										position: 'left',
										fullWidth: true,
									}}
								/>
							</div>
							<List
								size="small"
								bordered
								dataSource={renderContentTest(level)}
								renderItem={item => (
									<List.Item>
										<Tag color={item.color}>{item.text} </Tag>&ensp; : &ensp;{item.value}%
									</List.Item>
								)}
							/>
						</Col>
					</Row>
				</div>
			),
		},
		{
			title: 'Thi',
			content: (
				<StepTest
					setVisibleStepTest={setVisibleStepTest}
					data={questionsData}
					arrayQuestion={arrayQuestion}
					loadingGetQuestion={loadingGetQuestions}
					currentChoice={currentChoice}
					setCurrentChoice={setCurrentChoice}
					setIsNext={setIsNext}
					isNext={isNext}
					onClose={onClose}
				/>
			),
		},
		{
			title: 'Kết Quả',
			content: (
				<Result
					icon={<img width="150" src={ResultIcon} alt="ket qua" />}
					extra={
						<ResuleQuizStyle>
							<div>
								<h3>
									Mã môn học :&ensp;{' '}
									<Tag style={{ fontSize: 14 }}>#{subjectData.subjectID && subjectData.subjectID.tag}</Tag>
								</h3>
								<h3>
									Tên môn học :&ensp;
									<Tag style={{ fontSize: 14 }}>#{subjectData.subjectID && subjectData.subjectID.name}</Tag>
								</h3>
							</div>
							<Divider />
							<h2>Kết quả thi</h2>
							<div className="result">
								<ul>
									<li>
										<span></span>
										Tổng số câu hỏi
									</li>
									<li>
										<span></span>
										Số câu trả lời đúng
									</li>
									<li>
										<span></span>
										Điểm đạt được
									</li>
								</ul>
							</div>
							<Divider />
							<Button icon="rollback" onClick={() => history.push('/student/dashboard')} className="btn-back">
								Quay về trang chủ
							</Button>
						</ResuleQuizStyle>
					}
				/>
			),
		},
	];
	return (
		<Modal
			title="Thi thử"
			footer={null}
			className="phh-modal"
			width="850px"
			visible={visible}
			onCancel={() => setVisible(false)}
		>
			<Steps className="step-quick-test" current={current}>
				{steps.map(item => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>
			<div className="steps-content mt-20">{steps[current].content}</div>
			<div className="steps-action mt-15" style={{ display: 'flex', justifyContent: 'flex-end' }}>
				{current > 0 && current !== steps.length - 2 && (
					<Button className="btn-cancel" style={{ marginLeft: 8 }} onClick={() => prev()}>
						Quay về
					</Button>
				)}
				{current === 1 && visibleStepCustom ? (
					<Button className="btn-cancel ml-5" onClick={() => next()}>
						Tiếp theo
					</Button>
				) : (
					''
				)}
				{current === steps.length - 2 && visibleStepTest ? (
					<Button className="btn-cancel ml-5" onClick={() => next()}>
						Tiếp theo
					</Button>
				) : (
					''
				)}
				{current === steps.length - 3 && (
					<Button
						className="btn-cancel ml-5"
						loading={loadingGetQuestionsForTest}
						onClick={() => handleGetQuestions(level)}
					>
						Bắt đầu
					</Button>
				)}
				{current === steps.length - 1 && (
					<Button className="btn-cancel ml-5" onClick={onClose}>
						Đóng
					</Button>
				)}
			</div>
		</Modal>
	);
}

ModalQuickTest.propTypes = {
	sectorID: PropTypes.string.isRequired,
	classID: PropTypes.string.isRequired,
	visible: PropTypes.bool.isRequired,
	setVisible: PropTypes.func.isRequired,
	getSubjectsReq: PropTypes.func.isRequired,
	getQuestionsReq: PropTypes.func.isRequired,
	subjectList: PropTypes.objectOf(PropTypes.any).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingGetQuestions: PropTypes.bool.isRequired,
	loadingGetProgressByStudent: PropTypes.bool.isRequired,
	progressOfStudent: PropTypes.objectOf(PropTypes.any).isRequired,
	questionsData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ModalQuickTest;
