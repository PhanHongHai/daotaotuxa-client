import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExamAction from '../Action';
import BreadCrumb from '../../../../components/BreadCrumb';
import FormCreateExam from '../Component/FormCreateExam';

const breadcrumb = [
	{
		icon: 'home',
		path: '/admin/dashboard',
		text: '',
	},
	{
		icon: 'reconciliation',
		path: '/admin/quan-ly-de-thi',
		text: 'Quản lý đề thi',
	},
];
function CreateExamComponent(props) {
	const {
		createExamStatus,
		createExamReq,
		questions,
		getQuestionsForExamStatus,
		getQuestionsReq,
		getSubjectsExamStatus,
		subjects,
		getSubjectsReq,
	} = props;

	useEffect(() => {
		// getQuestionsReq({
		// 	req: {
		// 		limit: 10,
		// 		page: 1,
		// 		keyword: '',
		// 		level: 0,
		// 		type: 2,
		// 	},
		// });
		getSubjectsReq({});
	}, [getSubjectsReq]);

	const loadingCreateExam = createExamStatus === 'FETCHING';
	const loadingGetSubjects = getSubjectsExamStatus === 'FETCHING';
	const loadingGetQuestions = getQuestionsForExamStatus === 'FETCHING';

	return (
		<div>
			<div className="phh-page-header">
				<Row>
					<Col xs={24} sm={24} md={24}>
						<BreadCrumb breadcrumb={breadcrumb} icon="none" visible={false} pageCurrentText="Tạo đề thi thủ công" />
					</Col>
				</Row>
			</div>
			<div className="pd-1">
				<Row>
					<Col span={24}>
						<Card className="phh-card">
							<FormCreateExam
								loadingCreate={loadingCreateExam}
								loadingGetQuestions={loadingGetQuestions}
								createExamReq={createExamReq}
								questions={questions}
								getQuestionsReq={getQuestionsReq}
								subjects={subjects}
								loadingGetSubjects={loadingGetSubjects}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
}

CreateExamComponent.propTypes = {
	createExamStatus: PropTypes.string.isRequired,
	getQuestionsForExamStatus: PropTypes.string.isRequired,
	getSubjectsExamStatus: PropTypes.string.isRequired,
	questions: PropTypes.objectOf(PropTypes.any).isRequired,
	subjects: PropTypes.objectOf(PropTypes.any).isRequired,
	createExamReq: PropTypes.func.isRequired,
	getQuestionsReq: PropTypes.func.isRequired,
	getSubjectsReq: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	createExamStatus: state.examPage.createExamStatus,
	getQuestionsStatus: state.examPage.getQuestionsForExamStatus,
	getSubjectsExamStatus: state.examPage.getSubjectsExamStatus,
	questions: state.examPage.questions,
	subjects: state.examPage.subjects,
});

const mapDispatchToProps = {
	createExamReq: ExamAction.createExamRequest,
	getSubjectsReq: ExamAction.getSubjectsForExamRequest,
	getQuestionsReq: ExamAction.getQuestionsForExamRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExamComponent);
