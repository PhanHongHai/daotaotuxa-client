import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getSubjectsForQuestionRequest,
	getSubjectsForQuestionSuccess,
	getSubjectsForQuestionFailure,
} = createAsyncAction('getSubjectsForQuestion', 'GET_SUBJECT_FOR_QUESTION');

const { getAndSearchQuestionRequest, getAndSearchQuestionSuccess, getAndSearchQuestionFailure } = createAsyncAction(
	'getAndSearchQuestion',
	'GET_AND_SEARCH_QUESTION',
);
const { getDetailQuestionRequest, getDetailQuestionSuccess, getDetailQuestionFailure } = createAsyncAction(
	'getDetailQuestion',
	'GET_DETAIL_QUESTION',
);
const { createQuestionRequest, createQuestionSuccess, createQuestionFailure } = createAsyncAction(
	'createQuestion',
	'CREATE_QUESTION',
);
const { updateQuestionRequest, updateQuestionSuccess, updateQuestionFailure } = createAsyncAction(
	'updateQuestion',
	'UPDATE_QUESTION',
);
const { removeQuestionRequest, removeQuestionSuccess, removeQuestionFailure } = createAsyncAction(
	'removeQuestion',
	'REMOVE_QUESTION',
);
const { removeDetailQuestionRequest, removeDetailQuestionSuccess, removeDetailQuestionFailure } = createAsyncAction(
	'removeDetailQuestion',
	'REMOVE_DETAIL_QUESTION',
);

const Actions = {
	getSubjectsForQuestionRequest,
	getSubjectsForQuestionSuccess,
	getSubjectsForQuestionFailure,

	getAndSearchQuestionRequest,
	getAndSearchQuestionSuccess,
	getAndSearchQuestionFailure,

	getDetailQuestionRequest,
	getDetailQuestionSuccess,
	getDetailQuestionFailure,

	createQuestionRequest,
	createQuestionSuccess,
	createQuestionFailure,

	updateQuestionRequest,
	updateQuestionSuccess,
	updateQuestionFailure,

	removeQuestionRequest,
	removeQuestionSuccess,
	removeQuestionFailure,

	removeDetailQuestionRequest,
	removeDetailQuestionSuccess,
	removeDetailQuestionFailure,
};
export default Actions;
