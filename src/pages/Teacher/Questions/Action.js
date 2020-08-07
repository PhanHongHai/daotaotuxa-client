import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getSubjectsForQuestionTeacherRequest,
	getSubjectsForQuestionTeacherSuccess,
	getSubjectsForQuestionTeacherFailure,
} = createAsyncAction('getSubjectsForQuestionTeacher', 'GET_SUBJECT_FOR_QUESTION_TEACHER');

const {
	getAndSearchQuestionTeacherRequest,
	getAndSearchQuestionTeacherSuccess,
	getAndSearchQuestionTeacherFailure,
} = createAsyncAction('getAndSearchQuestionTeacher', 'GET_AND_SEARCH_QUESTION_TEACHER');
const {
	getDetailQuestionTeacherRequest,
	getDetailQuestionTeacherSuccess,
	getDetailQuestionTeacherFailure,
} = createAsyncAction('getDetailQuestionTeacher', 'GET_DETAIL_QUESTION_TEACHER');
const { createQuestionTeacherRequest, createQuestionTeacherSuccess, createQuestionTeacherFailure } = createAsyncAction(
	'createQuestionTeacher',
	'CREATE_QUESTION_TEACHER',
);
const { updateQuestionTeacherRequest, updateQuestionTeacherSuccess, updateQuestionTeacherFailure } = createAsyncAction(
	'updateQuestionTeacher',
	'UPDATE_QUESTION_TEACHER',
);

const { removeQuestionTeacherRequest, removeQuestionTeacherSuccess, removeQuestionTeacherFailure } = createAsyncAction(
	'removeQuestionTeacher',
	'REMOVE_QUESTION_TEACHER',
);
const {
	removeDetailQuestionTeacherRequest,
	removeDetailQuestionTeacherSuccess,
	removeDetailQuestionTeacherFailure,
} = createAsyncAction('removeDetailQuestionTeacher', 'REMOVE_DETAIL_QUESTION_TEACHER');

const Actions = {
	getSubjectsForQuestionTeacherRequest,
	getSubjectsForQuestionTeacherSuccess,
	getSubjectsForQuestionTeacherFailure,

	getAndSearchQuestionTeacherRequest,
	getAndSearchQuestionTeacherSuccess,
	getAndSearchQuestionTeacherFailure,

	getDetailQuestionTeacherRequest,
	getDetailQuestionTeacherSuccess,
	getDetailQuestionTeacherFailure,

	createQuestionTeacherRequest,
	createQuestionTeacherSuccess,
	createQuestionTeacherFailure,

	updateQuestionTeacherRequest,
	updateQuestionTeacherSuccess,
	updateQuestionTeacherFailure,



	removeQuestionTeacherRequest,
	removeQuestionTeacherSuccess,
	removeQuestionTeacherFailure,

	removeDetailQuestionTeacherRequest,
	removeDetailQuestionTeacherSuccess,
	removeDetailQuestionTeacherFailure,
};
export default Actions;
