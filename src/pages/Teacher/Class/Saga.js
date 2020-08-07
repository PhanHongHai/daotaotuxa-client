import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import ClassApi from '../../../apis/Class';
import TrainingSectorApi from '../../../apis/TrainingSector';
import SubjectApi from '../../../apis/Subject';
import ExamApi from '../../../apis/Exam';
import ScheduleApi from '../../../apis/Schedule';
import LogsScheduleApi from '../../../apis/LogPoint';
import PointApi from '../../../apis/Point';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetDetailClass() {
	try {
		const res = yield call(ClassApi.getInfoClassByAccount);
		if (!res.errors) {
			yield put(Action.getDetailClassByTeacherSuccess(res));
		} else {
			yield put(Action.getDetailClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailClassByTeacherFailure());
		message.error('Lấy thông tin lớp không thành công ! Xin thử lại');
	}
}
function* handleGetStudentOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassApi.getAndSearchStudentOfClassByTeacher, req);
		if (!res.errors) {
			yield put(Action.getStudentOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getStudentOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getStudentOfClassByTeacherFailure());
		message.error('Lấy thông tin học viên của lớp không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(TrainingSectorApi.getSubjectOfSectorGroupFile, req);
		if (!res.errors) {
			yield put(Action.getSubjectOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getSubjectOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getSubjectOfClassByTeacherFailure());
		message.error('Lấy thông tin môn học của lớp không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectAllOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(TrainingSectorApi.getSubjectAllOfSector, req);
		if (!res.errors) {
			yield put(Action.getSubjectAllOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getSubjectAllOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getSubjectAllOfClassByTeacherFailure());
		message.error('Lấy thông tin môn học của lớp không thành công ! Xin thử lại');
	}
}

function* handleGetSchedulesClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ScheduleApi.getScheduleByClassID, req);
		if (!res.errors) {
			yield put(Action.getScheduleOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getScheduleOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getScheduleOfClassByTeacherFailure());
		message.error('Lấy thông tin lịch thi của lớp không thành công ! Xin thử lại');
	}
}

function* handleGetLogSchedulesClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(LogsScheduleApi.getLogPoinByTeacher, req);
		if (!res.errors) {
			yield put(Action.getLogsScheduleOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getLogsScheduleOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getLogsScheduleOfClassByTeacherFailure());
		message.error('Lấy thông tin kết quả lịch thi của lớp không thành công ! Xin thử lại');
	}
}

function* handleCreateSubjectOfClass(action) {
	try {
		const { req, pageCurrent, keyword, sectorID, cb } = action.payload;
		const res = yield call(SubjectApi.createSubject, req);
		if (!res.errors) {
			yield put(Action.createSubjectByTeacherSuccess());
			yield put(Action.getSubjectOfClassByTeacherSuccess({ req: { ...pageCurrent, keyword, sectorID } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới môn học thành công' });
		} else {
			yield put(Action.createSubjectByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.createSubjectByTeacherFailure());
		message.error('Tạo môn học không thành công ! Xin thử lại');
	}
}

function* handleUpdateClass(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ClassApi.updateClass, { req, ID });
		if (!res.errors) {
			yield put(Action.updateClassByTeacherSuccess());
			yield put(Action.getDetailClassByTeacherRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Cập nhật trạng thái lớp học thành công' });
		} else {
			yield put(Action.updateClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.updateClassByTeacherFailure());
		message.error('Cập nhật trạng thái lớp học không thành công ! Xin thử lại');
	}
}

function* handleGetDetailExam(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ExamApi.getDetailExam, ID);
		if (!res.errors) {
			yield put(Action.getDetailExamByTeacherSuccess(res));
		} else {
			yield put(Action.getDetailExamByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailExamByTeacherFailure());
		message.error('Lấy thông tin đề thi của lớp học không thành công ! Xin thử lại');
	}
}

function* handleGetPointSubjectOfStudent(action) {
	try {
		const { req } = action.payload;
		const res = yield call(PointApi.getPoinSubjectOfStudent, req);
		if (!res.errors) {
			yield put(Action.getPointSubjectStudentOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getPointSubjectStudentOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getPointSubjectStudentOfClassByTeacherFailure());
		message.error('Lấy thông tin điểm môn học của lớp học không thành công ! Xin thử lại');
	}
}

function* handleGetPointAllOfStudent(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ExamApi.getDetailExam, req);
		if (!res.errors) {
			yield put(Action.getPointsStudentOfClassByTeacherSuccess(res));
		} else {
			yield put(Action.getPointsStudentOfClassByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getPointsStudentOfClassByTeacherFailure());
		message.error('Lấy thông tin điểm môn học của lớp học không thành công ! Xin thử lại');
	}
}

function* handleExportLogSchedule(action) {
	try {
		const { scheduleID } = action.payload;
		const res = yield call(ClassApi.updateClass, scheduleID);
		if (!res.errors) {
			yield put(Action.exportLogScheduleByTeacherSuccess());
		} else {
			yield put(Action.exportLogScheduleByTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.exportLogScheduleByTeacherFailure());
		message.error('Xuất excel kết quả thi của lớp học không thành công ! Xin thử lại');
	}
}

const getDetailClassSaga = {
	on: Action.getDetailClassByTeacherRequest,
	worker: handleGetDetailClass,
};

const getStudentOfClassSaga = {
	on: Action.getStudentOfClassByTeacherRequest,
	worker: handleGetStudentOfClass,
};
const getSubjectOfClassSaga = {
	on: Action.getSubjectOfClassByTeacherRequest,
	worker: handleGetSubjectOfClass,
};
const getSubjectAllOfClassSaga = {
	on: Action.getSubjectAllOfClassByTeacherRequest,
	worker: handleGetSubjectAllOfClass,
};
const getScheduleOfClassSaga = {
	on: Action.getScheduleOfClassByTeacherRequest,
	worker: handleGetSchedulesClass,
};
const createSubjectOfClassSaga = {
	on: Action.createSubjectByTeacherRequest,
	worker: handleCreateSubjectOfClass,
};

const updateClasByTeacherSaga = {
	on: Action.updateClassByTeacherRequest,
	worker: handleUpdateClass,
};

const exportLogScheduleSaga = {
	on: Action.exportLogScheduleByTeacherRequest,
	worker: handleExportLogSchedule,
};

const getLogScheduleSaga = {
	on: Action.getLogsScheduleOfClassByTeacherRequest,
	worker: handleGetLogSchedulesClass,
};

const getDetailExamSaga = {
	on: Action.getDetailExamByTeacherRequest,
	worker: handleGetDetailExam,
};

const getPointSubjectOfStudentSaga = {
	on: Action.getPointSubjectStudentOfClassByTeacherRequest,
	worker: handleGetPointSubjectOfStudent,
};

const getPointsOfStudentSaga = {
	on: Action.getPointsStudentOfClassByTeacherRequest,
	worker: handleGetPointAllOfStudent,
};

export default createSagas([
	getDetailClassSaga,
	getStudentOfClassSaga,
	getSubjectOfClassSaga,
	createSubjectOfClassSaga,
	updateClasByTeacherSaga,
	getScheduleOfClassSaga,
	exportLogScheduleSaga,
	getLogScheduleSaga,
	getDetailExamSaga,
	getSubjectAllOfClassSaga,
	getPointSubjectOfStudentSaga,
	getPointsOfStudentSaga
]);
