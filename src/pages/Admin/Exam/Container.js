import { connect } from 'react-redux';

import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getExamsStatus: state.examPage.getExamsStatus,
	removeExamStatus: state.examPage.removeExamStatus,
	authPasswordStatus: state.examPage.authPasswordStatus,
	createExamAutoStatus: state.examPage.createExamAutoStatus,
	getSubjectsExamStatus: state.examPage.getSubjectsExamStatus,
	getTotalQuestionStatus: state.examPage.getTotalQuestionStatus,
	exams: state.examPage.exams,
	totalQuestion: state.examPage.totalQuestion,
	subjects: state.examPage.subjects,
});

const mapDispatchToProps = {
	getExamsReq: Actions.getExamsRequest,
	getSubjectsReq: Actions.getSubjectsForExamRequest,
	removeExamReq: Actions.removeExamRequest,
	authAccountReq: Actions.authPasswordExamRequest,
	createExamAutoReq: Actions.createExamAutoRequest,
	getTotalQuestionReq: Actions.getTotalQuestionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
