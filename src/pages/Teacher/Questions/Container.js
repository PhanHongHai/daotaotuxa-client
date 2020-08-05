import { connect } from 'react-redux';

import QuestionAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	getAndSearchQuestionStatus: state.questionPageTeacher.getAndSearchQuestionStatus,
	removeQuestionStatus: state.questionPageTeacher.removeQuestionStatus,
	getSubjectsForQuestionStatus: state.questionPageTeacher.getSubjectsForQuestionStatus,
	questions: state.questionPageTeacher.questions,
	subjects: state.questionPageTeacher.subjects,
});

const mapDispatchToProps = {
	getAndSearchQuestionReq: QuestionAction.getAndSearchQuestionTeacherRequest,
	getSubjectsReq: QuestionAction.getSubjectsForQuestionTeacherRequest,
	removeQuestionReq: QuestionAction.removeQuestionTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
