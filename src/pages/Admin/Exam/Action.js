import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getQuestionsForExamRequest, getQuestionsForExamSuccess, getQuestionsForExamFailure } = createAsyncAction(
	'getQuestionsForExam',
	'GET_QUESTIONS_FOR_EXAM',
);
const {
	getQuestionsForUpdateExamRequest,
	getQuestionsForUpdateExamSuccess,
	getQuestionsForUpdateExamFailure,
} = createAsyncAction('getQuestionsForUpdateExam', 'GET_QUESTIONS_FOR_UPDATE_EXAM');
const { getSubjectsForExamRequest, getSubjectsForExamSuccess, getSubjectsForExamFailure } = createAsyncAction(
	'getSubjectsForExam',
	'GET_SUBJECTS_FOR_EXAM',
);

const { getExamsRequest, getExamsSuccess, getExamsFailure } = createAsyncAction('getExams', 'GET_EXAMS');

const { getTotalQuestionRequest, getTotalQuestionSuccess, getTotalQuestionFailure } = createAsyncAction(
	'getTotalQuestion',
	'GET_TOTAL_QUESTION',
);

const { authPasswordExamRequest, authPasswordExamSuccess, authPasswordExamFailure } = createAsyncAction(
	'authPasswordExam',
	'AUTH_PASSWORD_EXAM',
);

const { getDetailExamRequest, getDetailExamSuccess, getDetailExamFailure } = createAsyncAction(
	'getDetailExam',
	'GET_DETAIL_EXAM',
);

const { createExamRequest, createExamSuccess, createExamFailure } = createAsyncAction('createExam', 'CREATE_EXAM');

const { createExamAutoRequest, createExamAutoSuccess, createExamAutoFailure } = createAsyncAction(
	'createExamAuto',
	'CREATE_EXAM_AUTO',
);

const { updateExamRequest, updateExamSuccess, updateExamFailure } = createAsyncAction('updateExam', 'UPDATE_EXAM');

const { removeExamRequest, removeExamSuccess, removeExamFailure } = createAsyncAction('removeExam', 'REMOVE_EXAM');

const { removeDetailExamRequest, removeDetailExamSuccess, removeDetailExamFailure } = createAsyncAction(
	'removeDetailExam',
	'REMOVE_DETAIL_EXAM',
);

const Actions = {
	getQuestionsForUpdateExamRequest,
	getQuestionsForUpdateExamSuccess,
	getQuestionsForUpdateExamFailure,

	getQuestionsForExamRequest,
	getQuestionsForExamSuccess,
	getQuestionsForExamFailure,

	getTotalQuestionRequest,
	getTotalQuestionSuccess,
	getTotalQuestionFailure,

	getExamsRequest,
	getExamsSuccess,
	getExamsFailure,

	getSubjectsForExamRequest,
	getSubjectsForExamSuccess,
	getSubjectsForExamFailure,

	getDetailExamRequest,
	getDetailExamSuccess,
	getDetailExamFailure,

	authPasswordExamRequest,
	authPasswordExamSuccess,
	authPasswordExamFailure,

	createExamRequest,
	createExamSuccess,
	createExamFailure,

	createExamAutoRequest,
	createExamAutoSuccess,
	createExamAutoFailure,

	updateExamRequest,
	updateExamSuccess,
	updateExamFailure,

	removeExamRequest,
	removeExamSuccess,
	removeExamFailure,

	removeDetailExamRequest,
	removeDetailExamSuccess,
	removeDetailExamFailure,
};
export default Actions;
