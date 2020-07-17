import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getInfoClassByTeacherRequest, getInfoClassByTeacherSuccess, getInfoClassByTeacherFailure } = createAsyncAction(
	'getInfoClassByTeacher',
	'GET_INFO_CLASS_BY_TEACHER',
);

const Actions = {
	getInfoClassByTeacherRequest,
	getInfoClassByTeacherSuccess,
  getInfoClassByTeacherFailure,
  
  
};

export default Actions;
