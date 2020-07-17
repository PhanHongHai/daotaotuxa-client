import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getSectorForScheduleRequest, getSectorForScheduleSuccess, getSectorForScheduleFailure } = createAsyncAction(
	'getSectorForSchedule',
	'GET_SECTOR_FOR_SCHEDULE',
);

const {
	getSubjectsBySectorForScheduleRequest,
	getSubjectsBySectorForScheduleSuccess,
	getSubjectsBySectorForScheduleFailure,
} = createAsyncAction('getSubjectsBySectorForSchedule', 'GET_SUBJECTS_BY_SECTOR_FOR_SCHEDULE');

const { getExamForScheduleRequest, getExamForScheduleSuccess, getExamForScheduleFailure } = createAsyncAction(
	'getExamForSchedule',
	'GET_EXAM_FOR_SCHEDULE',
);
const {
	getDetailExamForScheduleRequest,
	getDetailExamForScheduleSuccess,
	getDetailExamForScheduleFailure,
} = createAsyncAction('getDetailExamForSchedule', 'GET_DETAIL_EXAM_FOR_SCHEDULE');

const { getClassesForScheduleRequest, getClassesForScheduleSuccess, getClassesForScheduleFailure } = createAsyncAction(
	'getClassesForSchedule',
	'GET_CLASSES_FOR_SCHEDULE',
);

const { authPasswordScheduleRequest, authPasswordScheduleSuccess, authPasswordScheduleFailure } = createAsyncAction(
	'authPasswordSchedule',
	'AUTH_PASSWORD_SCHEDULE',
);

const {
	getSubjectBySectorForScheduleRequest,
	getSubjectBySectorForScheduleSuccess,
	getSubjectBySectorForScheduleFailure,
} = createAsyncAction('getSubjectBySectorForSchedule', 'GET_SUBJECT_BY_SECTOR_FOR_SCHEDULE');

const { getSchedulesRequest, getSchedulesSuccess, getSchedulesFailure } = createAsyncAction(
	'getSchedules',
	'GET_SCHEDULES',
);

const { getDetailScheduleRequest, getDetailScheduleSuccess, getDetailScheduleFailure } = createAsyncAction(
	'getDetailSchedule',
	'GET_DETAIL_SCHEDULE',
);

const { createScheduleRequest, createScheduleSuccess, createScheduleFailure } = createAsyncAction(
	'createSchedule',
	'CREATE_SCHEDULE',
);
const { updateScheduleRequest, updateScheduleSuccess, updateScheduleFailure } = createAsyncAction(
	'updateSchedule',
	'UPDATE_SCHEDULE',
);
const { removeScheduleRequest, removeScheduleSuccess, removeScheduleFailure } = createAsyncAction(
	'removeSchedule',
	'REMOVE_SCHEDULE',
);

const { removeDetailScheduleRequest, removeDetailScheduleSuccess, removeDetailScheduleFailure } = createAsyncAction(
	'removeDetailSchedule',
	'REMOVE_DETAIL_SCHEDULE',
);

const Actions = {
	getSectorForScheduleRequest,
	getSectorForScheduleSuccess,
	getSectorForScheduleFailure,

	getExamForScheduleRequest,
	getExamForScheduleSuccess,
	getExamForScheduleFailure,

	getDetailExamForScheduleRequest,
	getDetailExamForScheduleSuccess,
	getDetailExamForScheduleFailure,

	getClassesForScheduleRequest,
	getClassesForScheduleSuccess,
	getClassesForScheduleFailure,

	getSubjectsBySectorForScheduleRequest,
	getSubjectsBySectorForScheduleSuccess,
	getSubjectsBySectorForScheduleFailure,

	getSubjectBySectorForScheduleRequest,
	getSubjectBySectorForScheduleSuccess,
	getSubjectBySectorForScheduleFailure,

	authPasswordScheduleRequest,
	authPasswordScheduleSuccess,
	authPasswordScheduleFailure,

	getSchedulesRequest,
	getSchedulesSuccess,
	getSchedulesFailure,

	getDetailScheduleRequest,
	getDetailScheduleSuccess,
	getDetailScheduleFailure,

	createScheduleRequest,
	createScheduleSuccess,
	createScheduleFailure,

	updateScheduleRequest,
	updateScheduleSuccess,
	updateScheduleFailure,

	removeScheduleRequest,
	removeScheduleSuccess,
	removeScheduleFailure,

	removeDetailScheduleRequest,
	removeDetailScheduleSuccess,
	removeDetailScheduleFailure,
};

export default Actions;
