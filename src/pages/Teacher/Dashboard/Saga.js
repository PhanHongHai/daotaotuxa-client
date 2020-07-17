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

const getDetailClassSaga = {
	on: Action.getInfoClassByTeacherRequest,
	worker: handleGetInfoClass,
};
export default createSagas([getDetailClassSaga]);
