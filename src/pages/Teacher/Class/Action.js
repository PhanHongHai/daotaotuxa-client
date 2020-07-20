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

	createSubjectByTeacherRequest,
	createSubjectByTeacherSuccess,
	createSubjectByTeacherFailure,

	updateClassByTeacherRequest,
	updateClassByTeacherSuccess,
	updateClassByTeacherFailure,
};

export default Actions;
