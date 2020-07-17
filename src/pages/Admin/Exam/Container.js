import { connect } from 'react-redux';

import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getExamsStatus: state.examPage.getExamsStatus,
	removeExamStatus: state.examPage.removeExamStatus,
	authPasswordStatus: state.examPage.authPasswordStatus,
	createExamAutoStatus: state.examPage.createExamAutoStatus,
	getTotalQuestionStatus: state.examPage.getTotalQuestionStatus,
	exams: state.examPage.exams,
	totalQuestion: state.examPage.totalQuestion,
});

const mapDispatchToProps = {
	getExamsReq: Actions.getExamsRequest,
	removeExamReq: Actions.removeExamRequest,
	authAccountReq: Actions.authPasswordExamRequest,
	createExamAutoReq: Actions.createExamAutoRequest,
	getTotalQuestionReq: Actions.getTotalQuestionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
