import { connect } from 'react-redux';

import QuestionAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	getAndSearchQuestionStatus: state.questionPage.getAndSearchQuestionStatus,
	removeQuestionStatus: state.questionPage.removeQuestionStatus,
	questions: state.questionPage.questions,
});

const mapDispatchToProps = {
	getAndSearchQuestionReq: QuestionAction.getAndSearchQuestionRequest,
	removeQuestionReq: QuestionAction.removeQuestionRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
