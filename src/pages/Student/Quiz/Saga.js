import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import ScheduleApi from '../../../apis/Schedule';
import ExamApi from '../../../apis/Exam';
import PointApi from '../../../apis/Point';
import LogPointApi from '../../../apis/LogPoint';
import ScheduleAction from './Action';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleCheckStudentWasDoneTest(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(LogPointApi.checkStudentWasDoneSchedule, ID);
		if (!res.errors) {
			yield put(ScheduleAction.checkExistPointInSCheduleSuccess(res));
			if (cb && typeof cb === 'function') yield cb(res);
		} else {
			yield put(ScheduleAction.checkExistPointInSCheduleFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(ScheduleAction.checkExistPointInSCheduleFailure());
		message.error('Kiểm tra thông tin học viên và lịch thi không thành công ! Xin thử lại');
	}
}

function* handleGetScheduleDetail(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ScheduleApi.getDetailSchedule, ID);
		if (!res.errors) {
			yield put(ScheduleAction.getScheduleDetailSuccess(res));
		} else {
			yield put(ScheduleAction.getScheduleDetailFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(ScheduleAction.getScheduleDetailFailure());
		message.error('Lấy thông tin chi tiết lịch thi không thành công ! Xin thử lại');
	}
}
function* handleSubmitTask(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(PointApi.submitTask, req);
		if (!res.errors) {
			yield put(ScheduleAction.submitTaskSuccess(res));
			if (cb && typeof cb === 'function') yield cb({ isSubmited: true, msg: 'Gửi bài thi thành công' });
		} else {
			yield put(ScheduleAction.submitTaskFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(ScheduleAction.submitTaskFailure());
		message.error('Gửi bài làm không thành công ! Xin thử lại');
	}
}
function* handleGetExamDetail(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ExamApi.getDetailExam, ID);
		if (!res.errors) {
			yield put(ScheduleAction.getExamDetailByQuizSuccess(res));
		} else {
			yield put(ScheduleAction.getExamDetailByQuizFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(ScheduleAction.getExamDetailByQuizFailure());
		message.error('Lấy thông tin đề thi không thành công ! Xin thử lại');
	}
}

const getScheduleDetailSaga = {
	on: ScheduleAction.getScheduleDetailRequest,
	worker: handleGetScheduleDetail,
};
const getExamDetailSaga = {
	on: ScheduleAction.getExamDetailByQuizRequest,
	worker: handleGetExamDetail,
};

const submitTaskSaga = {
	on: ScheduleAction.submitTaskRequest,
	worker: handleSubmitTask,
};

const checkStudentWasDoneScheduleSaga = {
	on: ScheduleAction.checkExistPointInSCheduleRequest,
	worker: handleCheckStudentWasDoneTest,
};

export default createSagas([getScheduleDetailSaga, getExamDetailSaga, submitTaskSaga, checkStudentWasDoneScheduleSaga]);
