import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Row, Col } from 'antd';

import { FrameQuestionStyle } from '../styled';

function FrameQuestion(props) {
	const { data } = props;
	const renderQuestion = quetions => {
		if (quetions && quetions.length > 0) {
			return quetions.map((ele, index) => (
				<div className="question-item" key={ele._id}>
					<Row>
						<Col xs={24} md={24}>
							<h3 className="question-name">
								Câu {index} : &ensp;{ele.name}
							</h3>
						</Col>
						<Col xs={24} md={24}>
							<span>
								<Radio.Group className="radio-custom" key={ele._id}>
									<Row>
										{ele.quetion.map(item => (
											<Col key={item._id} span={24} className="mt-10 mb-10">
												<Radio key={item._id} value={item._id}>
													{item.title}.&ensp;{item.content}
												</Radio>
											</Col>
										))}
									</Row>
								</Radio.Group>
							</span>
						</Col>
					</Row>
				</div>
			));
		}
		return 0;
	};
	return (
		<div>
			<div className="quiz-title">
				<h1>Tiêu đề thi</h1>
			</div>
			<FrameQuestionStyle>{renderQuestion(data)}</FrameQuestionStyle>
		</div>
	);
}

FrameQuestion.propTypes = {
	data: PropTypes.instanceOf(Array).isRequired,
};

export default FrameQuestion;
