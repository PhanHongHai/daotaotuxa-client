import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Row, Col, Spin, Button, Steps } from 'antd';

import RandomArray from '../../../../utils/randomSort';
import { FrameQuestionStyle } from '../styled';
import LoadingCustom from '../../../../components/LoadingCustom';

const { Step } = Steps;

function FrameQuestion(props) {
	const { data, loading } = props;
	const [current, setCurrent] = React.useState(0);
	const [arrayQuestion, setArrayQuestion] = React.useState([]);
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
										<h1 className="question-name">
											Câu {index + 1} : &ensp;
											<span className="text" dangerouslySetInnerHTML={{ __html: ele.content }} />
										</h1>
									</Col>
									<Col xs={24} md={24}>
										<span>
											<Radio.Group className="radio-custom" key={ele._id}>
												<Row>
													<Col xs={24} md={24} className="mt-10 mb-10">
														<Radio value="A">
															<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerA }} />
														</Radio>
													</Col>
													<Col xs={24} md={24} className="mt-10 mb-10">
														<Radio value="B">
															<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerB }} />
														</Radio>
													</Col>
													<Col xs={24} md={24} className="mt-10 mb-10">
														<Radio value="C">
															<span className="text" dangerouslySetInnerHTML={{ __html: ele.answerC }} />
														</Radio>
													</Col>
													<Col xs={24} md={24} className="mt-10 mb-10">
														<Radio value="D">
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
		setCurrent(currentTemp);
	};

	return (
		<div>
			<div className="quiz-title">
				<h1>Tiêu đề thi</h1>
			</div>
			<FrameQuestionStyle>
				<Spin spinning={loading} indicator={<LoadingCustom margin={10} />}>
					{/* <Steps progressDot  current={current}>
						{arrayQuestion.map(item => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps> */}
					<div className="steps-content">{arrayQuestion.length > 0 && arrayQuestion[current].content}</div>
					<div className="steps-action">
						{current < arrayQuestion.length - 1 && (
							<Button type="primary" onClick={next}>
								Tiếp theo
							</Button>
						)}
						{current === arrayQuestion.length - 1 && <Button type="primary">Nộp bài</Button>}
					</div>
				</Spin>
			</FrameQuestionStyle>
		</div>
	);
}

FrameQuestion.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
	loading: PropTypes.bool.isRequired,
};

export default FrameQuestion;
