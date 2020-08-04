import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getDetailOfClassByStudentIDRequest,
	getDetailOfClassByStudentIDSuccess,
	getDetailOfClassByStudentIDFailure,
} = createAsyncAction('getDetailOfClassByStudentID', 'GET_DETAIL_OF_CLASS_BY_STUDENT');

const {
	getStudentsOfClassByStudentRequest,
	getStudentsOfClassByStudentSuccess,
	getStudentsOfClassByStudentFailure,
} = createAsyncAction('getStudentsOfClassByStudent', 'GET_STUDENTS_OF_CLASS_BY_STUDENT');

const {
	getSubjectsOfClassByStudentRequest,
	getSubjectsOfClassByStudentSuccess,
	getSubjectsOfClassByStudentFailure,
} = createAsyncAction('getSubjectsOfClassByStudent', 'GET_SUBJECT_OF_CLASS_BY_STUDENT');

const {
	getSubjectsOtherByStudentRequest,
	getSubjectsOtherByStudentSuccess,
	getSubjectsOtherByStudentFailure,
} = createAsyncAction('getSubjectsOtherByStudent', 'GET_SUBJECTS_OTHER_BY_STUDENT');

const { getInfoSubjectByIDRequest, getInfoSubjectByIDSuccess, getInfoSubjectByIDFailure } = createAsyncAction(
	'getInfoSubjectByID',
	'GET_INFO_SUBJECT_BY_ID',
);

const { getDocumentsByTypeRequest, getDocumentsByTypeSuccess, getDocumentsByTypeFailure } = createAsyncAction(
	'getDocumentsByType',
	'GET_DOCUMENTS_BY_TYPE',
);

const { getProgressByStudentRequest, getProgressByStudentSuccess, getProgressByStudentFailure } = createAsyncAction(
	'getProgressByStudent',
	'GET_PROGRESS_BY_STUDENT',
);

const { getPointsByStudentRequest, getPointsByStudentSuccess, getPointsByStudentFailure } = createAsyncAction(
	'getPointsByStudent',
	'GET_POINTS_BY_STUDENT',
);

const {
	getDetailSubjectProgressRequest,
	getDetailSubjectProgressSuccess,
	getDetailSubjectProgressFailure,
} = createAsyncAction('getDetailSubjectProgress', 'GET_DETAIL_SUBJECT_PRGRESS');

const { createSubjectProgressRequest, createSubjectProgressSuccess, createSubjectProgressFailure } = createAsyncAction(
	'createSubjectProgress',
	'CREATE_SUBJECT_PROGRESS',
);

const {
	getDetailDocumentByStudentRequest,
	getDetailDocumentByStudentSuccess,
	getDetailDocumentByStudentFailure,
} = createAsyncAction('getDetailDocumentByStudent', 'GET_DETAIL_DOCUMENT_BY_STUDENT');

const {
	getScheduleOfClassByIDRequest,
	getScheduleOfClassByIDSuccess,
	getScheduleOfClassByIDFailure,
} = createAsyncAction('getScheduleOfClassByID', 'GET_SCHEDULE_OF_CLASS_BY_ID');

const Actions = {
	getDetailOfClassByStudentIDRequest,
	getDetailOfClassByStudentIDSuccess,
	getDetailOfClassByStudentIDFailure,

	getStudentsOfClassByStudentRequest,
	getStudentsOfClassByStudentSuccess,
	getStudentsOfClassByStudentFailure,

	getSubjectsOtherByStudentRequest,
	getSubjectsOtherByStudentSuccess,
	getSubjectsOtherByStudentFailure,

	getSubjectsOfClassByStudentRequest,
	getSubjectsOfClassByStudentSuccess,
	getSubjectsOfClassByStudentFailure,

	getInfoSubjectByIDRequest,
	getInfoSubjectByIDSuccess,
	getInfoSubjectByIDFailure,

	getDocumentsByTypeRequest,
	getDocumentsByTypeSuccess,
	getDocumentsByTypeFailure,

	getDetailDocumentByStudentRequest,
	getDetailDocumentByStudentSuccess,
	getDetailDocumentByStudentFailure,

	getDetailSubjectProgressRequest,
	getDetailSubjectProgressSuccess,
	getDetailSubjectProgressFailure,

	getProgressByStudentRequest,
	getProgressByStudentSuccess,
	getProgressByStudentFailure,

	getPointsByStudentRequest,
	getPointsByStudentSuccess,
	getPointsByStudentFailure,

	createSubjectProgressRequest,
	createSubjectProgressSuccess,
	createSubjectProgressFailure,

	getScheduleOfClassByIDRequest,
	getScheduleOfClassByIDSuccess,
	getScheduleOfClassByIDFailure,
};

export default Actions;
