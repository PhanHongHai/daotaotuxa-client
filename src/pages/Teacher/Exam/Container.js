import { connect } from 'react-redux';

import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getExamsStatus: state.examPageTeacher.getExamsStatus,
	removeExamStatus: state.examPageTeacher.removeExamStatus,
	authPasswordStatus: state.examPageTeacher.authPasswordStatus,
	createExamAutoStatus: state.examPageTeacher.createExamAutoStatus,
	getTotalQuestionStatus: state.examPageTeacher.getTotalQuestionStatus,
	exams: state.examPageTeacher.exams,
	totalQuestion: state.examPageTeacher.totalQuestion,
});

const mapDispatchToProps = {
	getExamsReq: Actions.getExamsTeacherRequest,
	removeExamReq: Actions.removeExamTeacherRequest,
	authAccountReq: Actions.authPasswordExamTeacherRequest,
	createExamAutoReq: Actions.createExamAutoTeacherRequest,
	getTotalQuestionReq: Actions.getTotalQuestionTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
