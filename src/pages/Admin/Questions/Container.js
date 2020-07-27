import { connect } from 'react-redux';

import QuestionAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	getAndSearchQuestionStatus: state.questionPage.getAndSearchQuestionStatus,
	removeQuestionStatus: state.questionPage.removeQuestionStatus,
	questions: state.questionPage.questions,
	subjects: state.questionPage.subjects,
	getSubjectsForQuestionStatus: state.questionPage.getSubjectsForQuestionStatus,
});

const mapDispatchToProps = {
	getAndSearchQuestionReq: QuestionAction.getAndSearchQuestionRequest,
	removeQuestionReq: QuestionAction.removeQuestionRequest,
	getSubjectsReq: QuestionAction.getSubjectsForQuestionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
