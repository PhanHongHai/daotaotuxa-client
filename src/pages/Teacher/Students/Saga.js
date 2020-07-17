import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import AccountApi from '../../../apis/Account';
import ProfileApi from '../../../apis/Profile';
import SubjectProgressApi from '../../../apis/SubjectProgress';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetInfoStudent(action) {
	try {
		const { studentID } = action.payload;
		const res = yield call(AccountApi.getDetailAccount, studentID);
		if (!res.errors) {
			yield put(Action.getInfoStudentByTeacherSuccess(res));
		} else {
			yield put(Action.getInfoStudentByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getInfoStudentByTeacherFailure());
		message.error('Lấy thông tin học viên không thành công ! Xin thử lại');
	}
}

function* handleGetProfileStudent(action) {
	try {
		const { studentID } = action.payload;
		const res = yield call(ProfileApi.getProfileStudentByID, studentID);
		if (!res.errors) {
			yield put(Action.getProfileStudentByTeacherSuccess(res));
		} else {
			yield put(Action.getProfileStudentByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getProfileStudentByTeacherFailure());
		message.error('Lấy thông tin hồ sơ học viên không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectProgressOfStudent(action) {
	try {
		const { studentID } = action.payload;
		const res = yield call(SubjectProgressApi.getSubjectProgressAllByStudentID, studentID);
		if (!res.errors) {
			yield put(Action.getSubjectProgressStudentByTeacherSuccess(res));
		} else {
			yield put(Action.getSubjectProgressStudentByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getSubjectProgressStudentByTeacherFailure());
		message.error('Lấy thông tin tiến độ học tập của học viên không thành công ! Xin thử lại');
	}
}

const getInfoStudentSaga = {
	on: Action.getInfoStudentByTeacherRequest,
	worker: handleGetInfoStudent,
};

const getProfileStudentSaga = {
	on: Action.getProfileStudentByTeacherRequest,
	worker: handleGetProfileStudent,
};

const getSubjectProgressStudentSaga = {
	on: Action.getSubjectProgressStudentByTeacherRequest,
	worker: handleGetSubjectProgressOfStudent,
};

export default createSagas([getInfoStudentSaga, getProfileStudentSaga, getSubjectProgressStudentSaga]);
