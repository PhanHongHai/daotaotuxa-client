import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import ScheduleApi from '../../../apis/Schedule';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetScheduleOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ScheduleApi.getScheduleByClassID, req);
		if (!res.errors) {
			yield put(Action.getScheduleOfClassByClassIDSuccess(res));
		} else {
			yield put(Action.getScheduleOfClassByClassIDFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getScheduleOfClassByClassIDFailure());
		message.error('Lấy thông tin lịch thi không thành công ! Xin thử lại');
	}
}
const getScheduleOfClassSaga = {
	on: Action.createSubjectProgressRequest,
	worker: handleGetScheduleOfClass,
};

export default createSagas([getScheduleOfClassSaga]);
