import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import ScheduleAction from './Action';
import ScheduleAPI from '../../../apis/Schedule';
import SectorAPI from '../../../apis/TrainingSector';
import SubjectAPi from '../../../apis/Subject';
import ClassAPI from '../../../apis/Class';
import ExamAPI from '../../../apis/Exam';
import AccountAPI from '../../../apis/Account';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetSectorsForSchedule() {
	try {
		const res = yield call(SectorAPI.getAll);
		if (!res.errors) {
			yield put(ScheduleAction.getSectorForScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getSectorForScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getSectorForScheduleFailure());
		message.error('Lấy danh sách ngành đào tạo không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectsAllForSchedule(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SubjectAPi.getSubjectAllBySector, req);
		if (!res.errors) {
			yield put(ScheduleAction.getSubjectsBySectorForScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getSubjectsBySectorForScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getSubjectsBySectorForScheduleFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectsForSchedule(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SectorAPI.getSubjectOfSector, req);
		if (!res.errors) {
			yield put(ScheduleAction.getSubjectBySectorForScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getSubjectBySectorForScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getSubjectBySectorForScheduleFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}
function* handleGetExamForSchedule(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ExamAPI.getExams, req);
		if (!res.errors) {
			yield put(ScheduleAction.getExamForScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getExamForScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getExamForScheduleFailure());
		message.error('Lấy danh sách đề thi không thành công ! Xin thử lại');
	}
}
function* handleGetDetailExamForSchedule(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ExamAPI.getDetailExam, ID);
		if (!res.errors) {
			yield put(ScheduleAction.getDetailExamForScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getDetailExamForScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getDetailExamForScheduleFailure());
		message.error('Lấy thông tin đề thi không thành công ! Xin thử lại');
	}
}

function* handleGetClassesForSchedule(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassAPI.getAndSearchClassByTrainingSector, req);
		if (!res.errors) {
			yield put(ScheduleAction.getClassesForScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getClassesForScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getClassesForScheduleFailure());
		message.error('Lấy danh sách lớp không thành công ! Xin thử lại');
	}
}

function* handleAuthPassword(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountAPI.authAccount, req);
		if (!res.errors) {
			yield put(ScheduleAction.authPasswordScheduleSuccess());
			if (cb && typeof cb === 'function') yield cb({ isAuthed: res });
		} else {
			yield put(ScheduleAction.authPasswordScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.authPasswordScheduleFailure());
		message.error('Xác thực tài khoản không thành công ! Xin thử lại');
	}
}

function* handleGetSchedules(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ScheduleAPI.getSchedules, req);
		if (!res.errors) {
			yield put(ScheduleAction.getSchedulesSuccess(res));
		} else {
			yield put(ScheduleAction.getSchedulesFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getSchedulesFailure());
		message.error('Lấy danh sách lịch thi không thành công ! Xin thử lại');
	}
}

function* handleGetDetailSchedule(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ScheduleAPI.getDetailSchedule, ID);
		if (!res.errors) {
			yield put(ScheduleAction.getDetailScheduleSuccess(res));
		} else {
			yield put(ScheduleAction.getDetailScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.getDetailScheduleFailure());
		message.error('Lấy thông tin chi tiết lịch thi không thành công ! Xin thử lại');
	}
}

function* handleCreateSchedule(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(ScheduleAPI.createSchedule, req);
		if (!res.errors) {
			yield put(ScheduleAction.createScheduleSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: res, msg: 'Thêm mới lịch thi thành công' });
		} else {
			yield put(ScheduleAction.createScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.createScheduleFailure());
		message.error('Thêm lịch thi không thành công ! Xin thử lại');
	}
}

function* handleUpdateSchedule(action) {
	try {
		const { req, scheduleID, cb } = action.payload;
		const res = yield call(ScheduleAPI.updateSchedule, { req, ID: scheduleID });
		if (!res.errors) {
			yield put(ScheduleAction.updateScheduleSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: res, msg: 'Cập nhật lịch thi thành công' });
			yield put(ScheduleAction.getDetailScheduleRequest({ ID: scheduleID }));
		} else {
			yield put(ScheduleAction.updateScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.updateScheduleFailure());
		message.error('Cập nhật lịch thi không thành công ! Xin thử lại');
	}
}

function* handleRemoveSchedule(action) {
	try {
		const { scheduleID, cb, pageCurrent, keyword, datePick } = action.payload;
		const res = yield call(ScheduleAPI.deleteSchedule, scheduleID);
		if (!res.errors) {
			yield put(ScheduleAction.removeScheduleSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRemoved: res, msg: 'Xóa lịch thi thành công' });
			yield put(ScheduleAction.getSchedulesRequest({ req: { ...pageCurrent, ...datePick, keyword } }));
		} else {
			yield put(ScheduleAction.removeScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.removeScheduleFailure());
		message.error('Xóa lịch thi không thành công ! Xin thử lại');
	}
}

function* handleRemoveDetailSchedule(action) {
	try {
		const { scheduleID, cb } = action.payload;
		const res = yield call(ScheduleAPI.deleteSchedule, scheduleID);
		if (!res.errors) {
			yield put(ScheduleAction.removeDetailScheduleSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRemoved: res, msg: 'Xóa lịch thi thành công' });
		} else {
			yield put(ScheduleAction.removeDetailScheduleFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ScheduleAction.removeDetailScheduleFailure());
		message.error('Xóa lịch thi không thành công ! Xin thử lại');
	}
}

const getSectorsForScheduleSaga = {
	on: ScheduleAction.getSectorForScheduleRequest,
	worker: handleGetSectorsForSchedule,
};
const getSubjectsAllBySectorForScheduleSaga = {
	on: ScheduleAction.getSubjectsBySectorForScheduleRequest,
	worker: handleGetSubjectsAllForSchedule,
};
const getSubjectBySectorForScheduleSaga = {
	on: ScheduleAction.getSubjectBySectorForScheduleRequest,
	worker: handleGetSubjectsForSchedule,
};
const getExamForScheduleSaga = {
	on: ScheduleAction.getExamForScheduleRequest,
	worker: handleGetExamForSchedule,
};
const getDetailExamForScheduleSaga = {
	on: ScheduleAction.getDetailExamForScheduleRequest,
	worker: handleGetDetailExamForSchedule,
};
const getClassesForScheduleSaga = {
	on: ScheduleAction.getClassesForScheduleRequest,
	worker: handleGetClassesForSchedule,
};

const authForScheduleSaga = {
	on: ScheduleAction.authPasswordScheduleRequest,
	worker: handleAuthPassword,
};

const getSchedulesSaga = {
	on: ScheduleAction.getSchedulesRequest,
	worker: handleGetSchedules,
};

const getDetailScheduleSaga = {
	on: ScheduleAction.getDetailScheduleRequest,
	worker: handleGetDetailSchedule,
};

const createScheduleSaga = {
	on: ScheduleAction.createScheduleRequest,
	worker: handleCreateSchedule,
};
const updateScheduleSaga = {
	on: ScheduleAction.updateScheduleRequest,
	worker: handleUpdateSchedule,
};
const removeScheduleSaga = {
	on: ScheduleAction.removeScheduleRequest,
	worker: handleRemoveSchedule,
};
const removeDetailScheduleSaga = {
	on: ScheduleAction.removeDetailScheduleRequest,
	worker: handleRemoveDetailSchedule,
};

export default createSagas([
	getSectorsForScheduleSaga,
	getSubjectBySectorForScheduleSaga,
	getSubjectsAllBySectorForScheduleSaga,
	getExamForScheduleSaga,
	getClassesForScheduleSaga,
	getDetailExamForScheduleSaga,
	authForScheduleSaga,
	getSchedulesSaga,
	getDetailScheduleSaga,
	createScheduleSaga,
	updateScheduleSaga,
	removeScheduleSaga,
	removeDetailScheduleSaga,
]);
