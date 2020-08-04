import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Row, Col, Spin, Button, Divider, Modal } from 'antd';
import _ from 'lodash';

import RandomArray from '../../../../utils/randomSort';
import { FrameQuestionStyle } from '../styled';
import LoadingCustom from '../../../../components/LoadingCustom';

function FrameQuestion(props) {
	const {
		data,
		loading,
		loadingSubmitTask,
		submitTaskReq,
		setDataChoice,
		dataChoice,
		scheduleID,
		examID,
		subjectID,
		setIsShowResult,
	} = props;
	const [current, setCurrent] = React.useState(0);
	const [arrayQuestion, setArrayQuestion] = React.useState([]);

	const [currentChoice, setCurrentChoice] = React.useState({});
	const [isNext, setIsNext] = React.useState(false);
	React.useEffect(() => {
		const convertArrQuestion = arrValue => {
			if (arrValue && arrValue.length > 0) {
				const arrResult = RandomArray(arrValue);
				const arrRender = arrResult.map((ele, index) => {
					return {
						title: `${index + 1}`,
						content: (
							<div className="question-item" key={ele._id}>
								<Row>
									<Col xs={24} md={24}>
										<h1 className="question-name">Câu {index + 1}&ensp;</h1>
									</Col>
									<Divider />
									<Col xs={24} md={24}>
										<h2 style={{ textAlign: 'justify', color: 'black' }}>
											<span className="text" dangerouslySetInnerHTML={{ __html: ele.content }} />
										</h2>
									</Col>
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
						),
					};
				});
				setArrayQuestion(arrRender);
			}
		};
		convertArrQuestion(data);
	}, [setArrayQuestion, data]);

	const next = () => {
		const currentTemp = current + 1;
		const arrDataTemp = [...dataChoice];
		if (currentChoice && !_.isEmpty(currentChoice)) arrDataTemp.push(currentChoice);
		setDataChoice(arrDataTemp);
		setCurrentChoice({});
		setCurrent(currentTemp);
		setIsNext(false);
	};
	const openSubmit = () => {
		Modal.confirm({
			title: 'Xác nhận nộp bài ?',
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
			content: (
				<div className="choice">
					<span style={{ color: 'black', fontSize: '16px', fontWeight: '500' }}>
						Số câu hoàn thành : <span style={{ color: 'green' }}>{dataChoice ? dataChoice.length : 0}</span>/
						<span style={{ color: 'red' }}>{data ? data.length : 0} </span>
					</span>
				</div>
			),
			onOk() {
				submitTaskReq();
			},
			onCancel() {},
		});
	};
	const openSubmitFinal = () => {
		const arrDataTemp = [...dataChoice];
		if (currentChoice && !_.isEmpty(currentChoice)) arrDataTemp.push(currentChoice);
		setDataChoice(arrDataTemp);
		setCurrentChoice({});
		Modal.confirm({
			title: 'Xác nhận nộp bài ?',
			okText: 'Xác nhận',
			className: 'model-confirm',
			cancelText: 'Hủy',
			// content: (
			// 	<div className="choice">
			// 		<span style={{ color: 'black', fontSize: '16px', fontWeight: '500' }}>
			// 			Số câu hoàn thành : <span style={{ color: 'green' }}>{dataChoice ? dataChoice.length : 0}</span>/
			// 			<span style={{ color: 'red' }}>{data ? data.length : 0} </span>
			// 		</span>
			// 	</div>
			// ),
			onOk() {
				submitTaskReq();
			},
			onCancel() {},
		});
	};
	return (
		<div>
			<div className="quiz-title">
				<h1>Nội dung</h1>
			</div>
			<FrameQuestionStyle>
				<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
					{/* <Steps progressDot  current={current}>
						{arrayQuestion.map(item => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps> */}
					<div className="steps-content">{arrayQuestion.length > 0 && arrayQuestion[current].content}</div>
					<div>
						<div className="steps-action">
							<div className="choice">
								<span>Tiến độ</span>
								<span>
									<h2>{dataChoice ? dataChoice.length : 0} </h2>
									<h1>/</h1>
									<h2>{data ? data.length : 0} </h2>
								</span>
							</div>
							{current < arrayQuestion.length - 1 && (
								<div className="group-btn">
									<Button className="btn-submit" loading={loadingSubmitTask} onClick={openSubmit}>
										Nộp bài
									</Button>
									{isNext ? (
										<Button className="btn-next" onClick={next}>
											Tiếp theo
										</Button>
									) : (
										''
									)}
								</div>
							)}
							{current === arrayQuestion.length - 1 && (
								<div className="group-btn">
									<Button className="btn-submit" loading={loadingSubmitTask} onClick={openSubmitFinal}>
										Nộp bài
									</Button>
								</div>
							)}
						</div>
					</div>
				</Spin>
			</FrameQuestionStyle>
		</div>
	);
}

FrameQuestion.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	dataChoice: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
	loadingSubmitTask: PropTypes.bool.isRequired,
	submitTaskReq: PropTypes.func.isRequired,
	setDataChoice: PropTypes.func.isRequired,
	setIsShowResult: PropTypes.func.isRequired,
	scheduleID: PropTypes.string.isRequired,
	examID: PropTypes.string.isRequired,
	subjectID: PropTypes.string.isRequired,
};

export default FrameQuestion;
