import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import ClassApi from '../../../apis/Class';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetInfoClass() {
	try {
		const res = yield call(ClassApi.getInfoClassByAccount);
		if (!res.errors) {
			yield put(Action.getInfoClassByTeacherSuccess(res));
		} else {
			yield put(Action.getInfoClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getInfoClassByTeacherFailure());
		message.error('Lấy thông tin lớp không thành công ! Xin thử lại');
	}
}
function* handleUpdateStatusClass(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ClassApi.updateClass, { req, ID });
		if (!res.errors) {
			yield put(Action.updateStatusClassByTeacherSuccess(res));
			yield put(Action.getInfoClassByTeacherRequest, { ID });
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật trạng thái lớp thành công' });
		} else {
			yield put(Action.updateStatusClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.updateStatusClassByTeacherFailure());
		message.error('Cập nhật trạng thái lớp không thành công ! Xin thử lại');
	}
}

const getDetailClassSaga = {
	on: Action.getInfoClassByTeacherRequest,
	worker: handleGetInfoClass,
};
const updateStatusClassSaga = {
	on: Action.updateStatusClassByTeacherRequest,
	worker: handleUpdateStatusClass,
};
export default createSagas([getDetailClassSaga, updateStatusClassSaga]);
