import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getQuestionsForExamTeacherRequest,
	getQuestionsForExamTeacherSuccess,
	getQuestionsForExamTeacherFailure,
} = createAsyncAction('getQuestionsForExamTeacher', 'GET_QUESTIONS_FOR_EXAM_TEACHER');
const {
	getQuestionsForUpdateExamTeacherRequest,
	getQuestionsForUpdateExamTeacherSuccess,
	getQuestionsForUpdateExamTeacherFailure,
} = createAsyncAction('getQuestionsForUpdateExamTeacher', 'GET_QUESTIONS_FOR_UPDATE_EXAM_TEACHER');

const { getExamsTeacherRequest, getExamsTeacherSuccess, getExamsTeacherFailure } = createAsyncAction(
	'getExamsTeacher',
	'GET_EXAMS_TEACHER',
);
const {
	getTotalQuestionTeacherRequest,
	getTotalQuestionTeacherSuccess,
	getTotalQuestionTeacherFailure,
} = createAsyncAction('getTotalQuestionTeacher', 'GET_TOTAL_QUESTION_TEACHER');

const {
	authPasswordExamTeacherRequest,
	authPasswordExamTeacherSuccess,
	authPasswordExamTeacherFailure,
} = createAsyncAction('authPasswordExamTeacher', 'AUTH_PASSWORD_EXAM_TEACHER');

const { getDetailExamTeacherRequest, getDetailExamTeacherSuccess, getDetailExamTeacherFailure } = createAsyncAction(
	'getDetailExamTeacher',
	'GET_DETAIL_EXAM_TEACHER',
);

const { createExamTeacherRequest, createExamTeacherSuccess, createExamTeacherFailure } = createAsyncAction(
	'createExamTeacher',
	'CREATE_EXAM_TEACHER',
);

const { createExamAutoTeacherRequest, createExamAutoTeacherSuccess, createExamAutoTeacherFailure } = createAsyncAction(
	'createExamAutoTeacher',
	'CREATE_EXAM_AUTO_TEACHER',
);

const { updateExamTeacherRequest, updateExamTeacherSuccess, updateExamTeacherFailure } = createAsyncAction(
	'updateExamTeacher',
	'UPDATE_EXAM_TEACHER',
);

const { removeExamTeacherRequest, removeExamTeacherSuccess, removeExamTeacherFailure } = createAsyncAction(
	'removeExamTeacher',
	'REMOVE_EXAM_TEACHER',
);

const {
	removeDetailExamTeacherRequest,
	removeDetailExamTeacherSuccess,
	removeDetailExamTeacherFailure,
} = createAsyncAction('removeDetailExamTeacher', 'REMOVE_DETAIL_EXAM_TEACHER');

const Actions = {
	getQuestionsForUpdateExamTeacherRequest,
	getQuestionsForUpdateExamTeacherSuccess,
	getQuestionsForUpdateExamTeacherFailure,

	getQuestionsForExamTeacherRequest,
	getQuestionsForExamTeacherSuccess,
	getQuestionsForExamTeacherFailure,

	getTotalQuestionTeacherRequest,
	getTotalQuestionTeacherSuccess,
	getTotalQuestionTeacherFailure,

	getExamsTeacherRequest,
	getExamsTeacherSuccess,
	getExamsTeacherFailure,

	getDetailExamTeacherRequest,
	getDetailExamTeacherSuccess,
	getDetailExamTeacherFailure,

	authPasswordExamTeacherRequest,
	authPasswordExamTeacherSuccess,
	authPasswordExamTeacherFailure,

	createExamTeacherRequest,
	createExamTeacherSuccess,
	createExamTeacherFailure,

	createExamAutoTeacherRequest,
	createExamAutoTeacherSuccess,
	createExamAutoTeacherFailure,

	updateExamTeacherRequest,
	updateExamTeacherSuccess,
	updateExamTeacherFailure,

	removeExamTeacherRequest,
	removeExamTeacherSuccess,
	removeExamTeacherFailure,

	removeDetailExamTeacherRequest,
	removeDetailExamTeacherSuccess,
	removeDetailExamTeacherFailure,
};
export default Actions;
