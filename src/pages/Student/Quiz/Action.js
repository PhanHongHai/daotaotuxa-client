import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getScheduleDetailRequest, getScheduleDetailSuccess, getScheduleDetailFailure } = createAsyncAction(
	'getScheduleDetail',
	'GET_SCHEDULE_DETAIL',
);

const { getExamDetailByQuizRequest, getExamDetailByQuizSuccess, getExamDetailByQuizFailure } = createAsyncAction(
	'getExamDetailByQuiz',
	'GET_EXAM_DETAIL_BY_QUIZ',
);

const { submitTaskRequest, submitTaskSuccess, submitTaskFailure } = createAsyncAction('submitTask', 'SUBMIT_TASK');

const Actions = {
	getScheduleDetailRequest,
	getScheduleDetailSuccess,
	getScheduleDetailFailure,

	getExamDetailByQuizRequest,
	getExamDetailByQuizSuccess,
	getExamDetailByQuizFailure,

	submitTaskRequest,
	submitTaskSuccess,
	submitTaskFailure,
};
export default Actions;