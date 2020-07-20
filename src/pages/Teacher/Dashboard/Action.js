import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getInfoClassByTeacherRequest, getInfoClassByTeacherSuccess, getInfoClassByTeacherFailure } = createAsyncAction(
	'getInfoClassByTeacher',
	'GET_INFO_CLASS_BY_TEACHER',
);

const {
	updateStatusClassByTeacherRequest,
	updateStatusClassByTeacherSuccess,
	updateStatusClassByTeacherFailure,
} = createAsyncAction('updateStatusClassByTeacher', 'UPDATE_STATUS_CLASS_BY_TEACHER');

const Actions = {
	getInfoClassByTeacherRequest,
	getInfoClassByTeacherSuccess,
	getInfoClassByTeacherFailure,

	updateStatusClassByTeacherRequest,
	updateStatusClassByTeacherSuccess,
	updateStatusClassByTeacherFailure,
};

export default Actions;
