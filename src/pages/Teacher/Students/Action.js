import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getInfoStudentByTeacherRequest,
	getInfoStudentByTeacherSuccess,
	getInfoStudentByTeacherFailure,
} = createAsyncAction('getInfoStudentByTeacher', 'GET_INFO_STUDENT_BY_TEACHER');

const {
	getProfileStudentByTeacherRequest,
	getProfileStudentByTeacherSuccess,
	getProfileStudentByTeacherFailure,
} = createAsyncAction('getProfileStudentByTeacher', 'GET_PROFILE_STUDENT_BY_TEACHER');

const {
	getSubjectProgressStudentByTeacherRequest,
	getSubjectProgressStudentByTeacherSuccess,
	getSubjectProgressStudentByTeacherFailure,
} = createAsyncAction('getSubjectProgressStudentByTeacher', 'GET_SUBJECT_PROGRESS_STUDENT_BY_TEACHER');

const Actions = {
	getInfoStudentByTeacherRequest,
	getInfoStudentByTeacherSuccess,
  getInfoStudentByTeacherFailure,
  
  getProfileStudentByTeacherRequest,
	getProfileStudentByTeacherSuccess,
	getProfileStudentByTeacherFailure,

	getSubjectProgressStudentByTeacherRequest,
	getSubjectProgressStudentByTeacherSuccess,
	getSubjectProgressStudentByTeacherFailure,
};

export default Actions;
