import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getDetailOfClassByStudentRequest,
	getDetailOfClassByStudentSuccess,
	getDetailOfClassByStudentFailure,
} = createAsyncAction('getDetailOfClassByStudent', 'GET_DETAIL_OF_CLASS_BY_STUDENT');

const {
	getTimeKeepingOfStudentRequest,
	getTimeKeepingOfStudentSuccess,
	getTimeKeepingOfStudentFailure,
} = createAsyncAction('getTimeKeepingOfStudent', 'GET_TIME_KEEPING_OF_STUDENT');

const {
	attendanceByStudentRequest,
	attendanceByStudentSuccess,
	attendanceByStudentFailure,
} = createAsyncAction('attendanceByStudent', 'ATTENDANCE_BY_STUDENT');

const Actions = {
	getDetailOfClassByStudentRequest,
	getDetailOfClassByStudentSuccess,
	getDetailOfClassByStudentFailure,

	getTimeKeepingOfStudentRequest,
	getTimeKeepingOfStudentSuccess,
	getTimeKeepingOfStudentFailure,

	attendanceByStudentRequest,
	attendanceByStudentSuccess,
	attendanceByStudentFailure,
};

export default Actions;
