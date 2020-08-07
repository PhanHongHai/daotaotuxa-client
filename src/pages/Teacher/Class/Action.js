import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getDetailClassByTeacherRequest,
	getDetailClassByTeacherSuccess,
	getDetailClassByTeacherFailure,
} = createAsyncAction('getDetailClassByTeacher', 'GET_DETAIL_CLASS_BY_TEACHER');

const {
	getStudentOfClassByTeacherRequest,
	getStudentOfClassByTeacherSuccess,
	getStudentOfClassByTeacherFailure,
} = createAsyncAction('getStudentOfClassByTeacher', 'GET_STUDENT_OF_CLASS_BY_TEACHER');

const {
	getDetailExamByTeacherRequest,
	getDetailExamByTeacherSuccess,
	getDetailExamByTeacherFailure,
} = createAsyncAction('getDetailExamByTeacher', 'GET_DETAIL_EXAM_TEACHER');

const {
	getScheduleOfClassByTeacherRequest,
	getScheduleOfClassByTeacherSuccess,
	getScheduleOfClassByTeacherFailure,
} = createAsyncAction('getScheduleOfClassByTeacher', 'GET_SCHEDULE_OF_CLASS_BY_TEACHER');

const {
	getLogsScheduleOfClassByTeacherRequest,
	getLogsScheduleOfClassByTeacherSuccess,
	getLogsScheduleOfClassByTeacherFailure,
} = createAsyncAction('getLogsScheduleOfClassByTeacher', 'GET_LOGS_SCHEDULE_OF_CLASS_BY_TEACHER');

const {
	getPointsStudentOfClassByTeacherRequest,
	getPointsStudentOfClassByTeacherSuccess,
	getPointsStudentOfClassByTeacherFailure,
} = createAsyncAction('getPointsStudentOfClassByTeacher', 'GET_POINTS_STUDENT_OF_CLASS_BY_TEACHER');

const {
	getPointSubjectStudentOfClassByTeacherRequest,
	getPointSubjectStudentOfClassByTeacherSuccess,
	getPointSubjectStudentOfClassByTeacherFailure,
} = createAsyncAction('getPointSubjectStudentOfClassByTeacher', 'GET_POINT_SUBJECT_STUDENT_OF_CLASS_BY_TEACHER');

const {
	getSubjectAllOfClassByTeacherRequest,
	getSubjectAllOfClassByTeacherSuccess,
	getSubjectAllOfClassByTeacherFailure,
} = createAsyncAction('getSubjectAllOfClassByTeacher', 'GET_SUBJECT_ALL_OF_CLASS_BY_TEACHER');

const {
	getSubjectOfClassByTeacherRequest,
	getSubjectOfClassByTeacherSuccess,
	getSubjectOfClassByTeacherFailure,
} = createAsyncAction('getSubjectOfClassByTeacher', 'GET_SUBJECT_OF_CLASS_BY_TEACHER');

const {
	createSubjectByTeacherRequest,
	createSubjectByTeacherSuccess,
	createSubjectByTeacherFailure,
} = createAsyncAction('createSubjectByTeacher', 'CREATE_SUBJECT_BY_TEACHER');

const { updateClassByTeacherRequest, updateClassByTeacherSuccess, updateClassByTeacherFailure } = createAsyncAction(
	'updateClassByTeacher',
	'UPDATE_CLASS_BY_TEACHER',
);

const {
	exportLogScheduleByTeacherRequest,
	exportLogScheduleByTeacherSuccess,
	exportLogScheduleByTeacherFailure,
} = createAsyncAction('exportLogScheduleByTeacher', 'EXPORT_LOG_SCHEDULE_BY_TEACHER');

const Actions = {
	getDetailClassByTeacherRequest,
	getDetailClassByTeacherSuccess,
	getDetailClassByTeacherFailure,

	getStudentOfClassByTeacherRequest,
	getStudentOfClassByTeacherSuccess,
	getStudentOfClassByTeacherFailure,

	getSubjectOfClassByTeacherRequest,
	getSubjectOfClassByTeacherSuccess,
	getSubjectOfClassByTeacherFailure,

	getSubjectAllOfClassByTeacherRequest,
	getSubjectAllOfClassByTeacherSuccess,
	getSubjectAllOfClassByTeacherFailure,

	getDetailExamByTeacherRequest,
	getDetailExamByTeacherSuccess,
	getDetailExamByTeacherFailure,

	getScheduleOfClassByTeacherRequest,
	getScheduleOfClassByTeacherSuccess,
	getScheduleOfClassByTeacherFailure,

	getLogsScheduleOfClassByTeacherRequest,
	getLogsScheduleOfClassByTeacherSuccess,
	getLogsScheduleOfClassByTeacherFailure,

	getPointsStudentOfClassByTeacherRequest,
	getPointsStudentOfClassByTeacherSuccess,
	getPointsStudentOfClassByTeacherFailure,

	getPointSubjectStudentOfClassByTeacherRequest,
	getPointSubjectStudentOfClassByTeacherSuccess,
	getPointSubjectStudentOfClassByTeacherFailure,

	createSubjectByTeacherRequest,
	createSubjectByTeacherSuccess,
	createSubjectByTeacherFailure,

	updateClassByTeacherRequest,
	updateClassByTeacherSuccess,
	updateClassByTeacherFailure,

	exportLogScheduleByTeacherRequest,
	exportLogScheduleByTeacherSuccess,
	exportLogScheduleByTeacherFailure,
};

export default Actions;
