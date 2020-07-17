import React from 'react';
import PropTypes from 'prop-types';
import {Typography,} from 'antd';

import {ExamViewStyle} from '../styled';

function DetailExam(props) {
	const {
		detailExam,
		isShowAnswer
	} = props;


	const renderQuestion = examData => {
		return examData.map((item, index) => {
			return (
				<div className="exam-item">
					<h3>
						{index + 1}.&ensp;
						<span className="text" dangerouslySetInnerHTML={{ __html: item.content }} />
					</h3>
					<ul>
						<li className={isShowAnswer && item.answer === 'A' ? 'answer' : null}>
							<p className="symbol">A</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerA }} />
						</li>
						<li className={isShowAnswer && item.answer === 'B' ? 'answer' : null}>
							<p className="symbol">B</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerB }} />
						</li>
						<li className={isShowAnswer && item.answer === 'C' ? 'answer' : null}>
							<p className="symbol">C</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerC }} />
						</li>
						<li className={isShowAnswer && item.answer === 'D' ? 'answer' : null}>
							<p className="symbol">D</p>.&ensp;
							<span className="text" dangerouslySetInnerHTML={{ __html: item.answerD }} />
						</li>
					</ul>
				</div>
			);
		});
	};
	return (
		<ExamViewStyle>
			<div className="exam-header">
				<Typography.Title
					level={3}
					style={{ textAlign: 'center', textTransform: 'capitalize', textDecoration: 'underline' }}
				>
					{detailExam && detailExam.title}
				</Typography.Title>
			</div>
			{detailExam.questions && detailExam.questions.length > 0 ? renderQuestion(detailExam.questions) : ''}
		</ExamViewStyle>
	);
}

DetailExam.propTypes = {
	isShowAnswer: PropTypes.bool.isRequired,
	detailExam: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DetailExam;
