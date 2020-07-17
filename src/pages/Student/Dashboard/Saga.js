import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import ClassApi from '../../../apis/Class';
import TimeKeepingApi from '../../../apis/TimeKeeping';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetInfoClass() {
	try {
		const res = yield call(ClassApi.getInfoClassByAccount);
		if (!res.errors) {
			yield put(Action.getDetailOfClassByStudentSuccess(res));
		} else {
			yield put(Action.getDetailOfClassByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailOfClassByStudentFailure());
		message.error('Lấy thông tin lớp không thành công ! Xin thử lại');
	}
}

function* handleGetTimeKeeping() {
	try {
		const res = yield call(TimeKeepingApi.getTimeKeepingByStudent);
		if (!res.errors) {
			yield put(Action.getTimeKeepingOfStudentSuccess(res));
		} else {
			yield put(Action.getTimeKeepingOfStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getTimeKeepingOfStudentFailure());
		message.error('Lấy thông tin thời gian chuyên cần không thành công ! Xin thử lại');
	}
}
function* handleAttendance(action) {
	try {
		const { req } = action.payload;
		const res = yield call(TimeKeepingApi.attendance, req);
		if (!res.errors) {
			yield put(Action.attendanceByStudentSuccess());
			yield put(Action.getTimeKeepingOfStudentRequest());
		} else {
			yield put(Action.attendanceByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.attendanceByStudentFailure());
		message.error('Điểm danh không thành công ! Xin thử lại');
	}
}

const getDetailClassSaga = {
	on: Action.getDetailOfClassByStudentRequest,
	worker: handleGetInfoClass,
};

const getTimeKeepingSaga = {
	on: Action.getTimeKeepingOfStudentRequest,
	worker: handleGetTimeKeeping,
};
const attendanceSaga = {
	on: Action.attendanceByStudentRequest,
	worker: handleAttendance,
};

export default createSagas([getDetailClassSaga, getTimeKeepingSaga, attendanceSaga]);
