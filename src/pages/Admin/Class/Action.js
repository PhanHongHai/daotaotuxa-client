import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getTotalsClassAllTimeRequest, getTotalsClassAllTimeSuccess, getTotalsClassAllTimeFailure } = createAsyncAction(
	'getTotalsClassAllTime',
	'GET_TOTALS_CLASS_ALL_TIME',
);

const {
	getTotalsClassByGroupDateRequest,
	getTotalsClassByGroupDateSuccess,
	getTotalsClassByGroupDateFailure,
} = createAsyncAction('getTotalsClassByGroupDate', 'GET_TOTALS_CLASS_BY_GROUP_DATE');

const {
	getReportClassByTrainingTypeRequest,
	getReportClassByTrainingTypeSuccess,
	getReportClassByTrainingTypeFailure,
} = createAsyncAction('getReportClassByTrainingType', 'GET_REPORT_CLASS_BY_TRAINING_TYPE');

const {
	getReportClassByTrainingSectorRequest,
	getReportClassByTrainingSectorSuccess,
	getReportClassByTrainingSectorFailure,
} = createAsyncAction('getReportClassByTrainingSector', 'GET_REPORT_CLASS_BY_TRAINING_SECTOR');

const {
	getReportTotalStudentByTrainingTypeRequest,
	getReportTotalStudentByTrainingTypeSuccess,
	getReportTotalStudentByTrainingTypeFailure,
} = createAsyncAction('getReportTotalStudentByTrainingType', 'GET_REPORT_TOTAL_STUDENT_BY_TRAINING_TYPE');

const {
	getReportTotalStudentByTrainingSectorRequest,
	getReportTotalStudentByTrainingSectorSuccess,
	getReportTotalStudentByTrainingSectorFailure,
} = createAsyncAction('getReportTotalStudentByTrainingSector', 'GET_REPORT_TOTAL_STUDENT_BY_TRAINING_SECTOR');

const {
	getReportTotalClassByYearRequest,
	getReportTotalClassByYearSuccess,
	getReportTotalClassByYearFailure,
} = createAsyncAction('getReportTotalClassByYear', 'GET_REPORT_TOTAL_CLASS_BY_YEAR');

const { getClassesRequest, getClassesSuccess, getClassesFailure } = createAsyncAction('getClasses', 'GET_CLASSES');

const { getSectorsForClassRequest, getSectorsForClassSuccess, getSectorsForClassFailure } = createAsyncAction(
	'getSectorsForClass',
	'GET_SECTORS_FOR_CLASS',
);

const { getTeachersRequest, getTeachersSuccess, getTeachersFailure } = createAsyncAction('getTeachers', 'GET_TEACHERS');

const {
	getInfoTeacherByClassIDRequest,
	getInfoTeacherByClassIDSuccess,
	getInfoTeacherByClassIDFailure,
} = createAsyncAction('getInfoTeacherByClassID', 'GET_INFO_TEACHER_BY_CLASS_ID');

const { getStudentsForClassRequest, getStudentsForClassSuccess, getStudentsForClassFailure } = createAsyncAction(
	'getStudentsForClass',
	'GET_STUDENTS_FOR_CLASS',
);

const { searchTeacherForClassRequest, searchTeacherForClassSuccess, searchTeacherForClassFailure } = createAsyncAction(
	'searchTeacherForClass',
	'SEARCH_TEACHER_FOR_CLASS',
);

const { filterClassRequest, filterClassSuccess, filterClassFailure } = createAsyncAction(
	'filterClass',
	'FILTER_CLASSES',
);

const { getDetailClassRequest, getDetailClassSuccess, getDetailClassFailure } = createAsyncAction(
	'getDetailClass',
	'GET_DETAIL_CLASS',
);

const { getStudentOfClassRequest, getStudentOfClassSuccess, getStudentOfClassFailure } = createAsyncAction(
	'getStudentOfClass',
	'GET_STUDENT_OF_CLASS',
);

const { addStudentToClassRequest, addStudentToClassSuccess, addStudentToClassFailure } = createAsyncAction(
	'addStudentToClass',
	'ADD_STUDENT_TO_CLASS',
);

const { addTeacherToClassRequest, addTeacherToClassSuccess, addTeacherToClassFailure } = createAsyncAction(
	'addTeacherToClass',
	'ADD_TEACHER_TO_CLASS',
);
const { removeStudentToClassRequest, removeStudentToClassSuccess, removeStudentToClassFailure } = createAsyncAction(
	'removeStudentToClass',
	'REMOVE_STUDENT_TO_CLASS',
);

const {
	addStudentToDetailClassRequest,
	addStudentToDetailClassSuccess,
	addStudentToDetailClassFailure,
} = createAsyncAction('addStudentToDetailClass', 'ADD_STUDENT_TO_DETAIL_CLASS');
const {
	removeStudentToDetailClassRequest,
	removeStudentToDetailClassSuccess,
	removeStudentToDetailClassFailure,
} = createAsyncAction('removeStudentToDetailClass', 'REMOVE_STUDENT_TO_DETAIL_CLASS');

const { searchClassRequest, searchClassSuccess, searchClassFailure } = createAsyncAction('searchClass', 'SEARCH_CLASS');

const { createClassRequest, createClassSuccess, createClassFailure } = createAsyncAction('createClass', 'CREATE_CLASS');

const { updateClassRequest, updateClassSuccess, updateClassFailure } = createAsyncAction('updateClass', 'UPDATE_CLASS');

const { updateDetailClassRequest, updateDetailClassSuccess, updateDetailClassFailure } = createAsyncAction(
	'updateDetailClass',
	'UPDATE_DETAIL_CLASS',
);

const { deleteClassRequest, deleteClassSuccess, deleteClassFailure } = createAsyncAction('deleteClass', 'DELETE_CLASS');

const Actions = {
	getClassesRequest,
	getClassesSuccess,
	getClassesFailure,

	getInfoTeacherByClassIDRequest,
	getInfoTeacherByClassIDSuccess,
	getInfoTeacherByClassIDFailure,

	getStudentOfClassRequest,
	getStudentOfClassSuccess,
	getStudentOfClassFailure,

	getSectorsForClassRequest,
	getSectorsForClassSuccess,
	getSectorsForClassFailure,

	getTeachersRequest,
	getTeachersSuccess,
	getTeachersFailure,

	searchTeacherForClassRequest,
	searchTeacherForClassSuccess,
	searchTeacherForClassFailure,

	getStudentsForClassRequest,
	getStudentsForClassSuccess,
	getStudentsForClassFailure,

	getDetailClassRequest,
	getDetailClassSuccess,
	getDetailClassFailure,

	filterClassRequest,
	filterClassSuccess,
	filterClassFailure,

	searchClassRequest,
	searchClassSuccess,
	searchClassFailure,

	createClassRequest,
	createClassSuccess,
	createClassFailure,

	updateClassRequest,
	updateClassSuccess,
	updateClassFailure,

	updateDetailClassRequest,
	updateDetailClassSuccess,
	updateDetailClassFailure,

	deleteClassRequest,
	deleteClassSuccess,
	deleteClassFailure,

	addStudentToClassRequest,
	addStudentToClassSuccess,
	addStudentToClassFailure,

	removeStudentToClassRequest,
	removeStudentToClassSuccess,
	removeStudentToClassFailure,

	addStudentToDetailClassRequest,
	addStudentToDetailClassSuccess,
	addStudentToDetailClassFailure,

	addTeacherToClassRequest,
	addTeacherToClassSuccess,
	addTeacherToClassFailure,

	removeStudentToDetailClassRequest,
	removeStudentToDetailClassSuccess,
	removeStudentToDetailClassFailure,

	getTotalsClassAllTimeRequest,
	getTotalsClassAllTimeSuccess,
	getTotalsClassAllTimeFailure,

	getTotalsClassByGroupDateRequest,
	getTotalsClassByGroupDateSuccess,
	getTotalsClassByGroupDateFailure,

	getReportClassByTrainingTypeRequest,
	getReportClassByTrainingTypeSuccess,
	getReportClassByTrainingTypeFailure,

	getReportClassByTrainingSectorRequest,
	getReportClassByTrainingSectorSuccess,
	getReportClassByTrainingSectorFailure,

	getReportTotalStudentByTrainingTypeRequest,
	getReportTotalStudentByTrainingTypeSuccess,
	getReportTotalStudentByTrainingTypeFailure,

	getReportTotalStudentByTrainingSectorRequest,
	getReportTotalStudentByTrainingSectorSuccess,
	getReportTotalStudentByTrainingSectorFailure,

	getReportTotalClassByYearRequest,
	getReportTotalClassByYearSuccess,
	getReportTotalClassByYearFailure,
};
export default Actions;
