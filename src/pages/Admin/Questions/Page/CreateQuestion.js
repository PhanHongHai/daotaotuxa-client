import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';

import QuestionAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormCreateQuestion from '../Component/FormCreateQuestion';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'question',
		path: '/admin/ngan-hang-cau-hoi',
		text: 'Ngân hàng câu hỏi',
	},
];
function CreateQuestion(props) {
	const {
		createQuestionStatus,
		createQuestionReq,
		getSubjectsForQuestionStatus,
		getSubjectsForQuestionReq,
		subjects,
	} = props;

	useEffect(() => {
		getSubjectsForQuestionReq({});
	}, [getSubjectsForQuestionReq]);

	const loadingCreateQuestion = createQuestionStatus === 'FETCHING';
	const loadingSubjectsForQuestion = getSubjectsForQuestionStatus === 'FETCHING';

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Tạo mới câu hỏi" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card className="phh-card">
							<FormCreateQuestion
								loadingCreate={loadingCreateQuestion}
								loadingSubjectsForQuestion={loadingSubjectsForQuestion}
								createQuestionReq={createQuestionReq}
								subjects={subjects}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}
CreateQuestion.propTypes = {
	createQuestionStatus: PropTypes.string.isRequired,
	getSubjectsForQuestionStatus: PropTypes.string.isRequired,
	createQuestionReq: PropTypes.func.isRequired,
	getSubjectsForQuestionReq: PropTypes.func.isRequired,
	subjects: PropTypes.instanceOf(Array).isRequired,
};

const mapStateToProps = state => ({
	createQuestionStatus: state.questionPage.createQuestionStatus,
	getSubjectsForQuestionStatus: state.questionPage.getSubjectsForQuestion,
	subjects: state.questionPage.subjects,
});

const mapDispatchToProps = {
	createQuestionReq: QuestionAction.createQuestionRequest,
	getSubjectsForQuestionReq: QuestionAction.getSubjectsForQuestionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
