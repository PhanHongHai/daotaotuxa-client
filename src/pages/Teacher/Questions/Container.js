import { connect } from 'react-redux';

import QuestionAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	getAndSearchQuestionStatus: state.questionPageTeacher.getAndSearchQuestionStatus,
	removeQuestionStatus: state.questionPageTeacher.removeQuestionStatus,
	questions: state.questionPageTeacher.questions,
});

const mapDispatchToProps = {
	getAndSearchQuestionReq: QuestionAction.getAndSearchQuestionTeacherRequest,
	removeQuestionReq: QuestionAction.removeQuestionTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
