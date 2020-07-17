import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import ExamAction from './Action';
import QuestionAPI from '../../../apis/Question';
import ExamAPI from '../../../apis/Exam';
import AccountAPI from '../../../apis/Account';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetQuestionsForExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getAndSearchQuestion, req);
		if (!res.errors) {
			yield put(ExamAction.getQuestionsForExamTeacherSuccess(res));
		} else {
			yield put(ExamAction.getQuestionsForExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getQuestionsForExamTeacherFailure());
		message.error('Lấy danh sách câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleGetQuestionsForUpdateExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getQuestionsForUpdateExam, req);
		if (!res.errors) {
			yield put(ExamAction.getQuestionsForUpdateExamTeacherSuccess(res));
		} else {
			yield put(ExamAction.getQuestionsForUpdateExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getQuestionsForUpdateExamTeacherFailure());
		message.error('Lấy danh sách câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleGetTotalQuestion(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getTotalQuestion, req);
		if (!res.errors) {
			yield put(ExamAction.getTotalQuestionTeacherSuccess(res));
		} else {
			yield put(ExamAction.getTotalQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getTotalQuestionTeacherFailure());
		message.error('Lấy số lượng câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleGetAndSearchExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ExamAPI.getExams, req);
		if (!res.errors) {
			yield put(ExamAction.getExamsTeacherSuccess(res));
		} else {
			yield put(ExamAction.getExamsTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getExamsTeacherFailure());
		message.error('Lấy danh sách đề thi không thành công ! Xin thử lại');
	}
}

function* handleGetDetailExam(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ExamAPI.getDetailExam, ID);
		if (!res.errors) {
			yield put(ExamAction.getDetailExamTeacherSuccess(res));
		} else {
			yield put(ExamAction.getDetailExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getDetailExamTeacherFailure());
		message.error('Lấy thông tin đề thi không thành công ! Xin thử lại');
	}
}

function* handleCreateExam(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(ExamAPI.createExam, req);
		if (!res.errors) {
			yield put(ExamAction.createExamTeacherSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới đề thi thành công' });
		} else {
			yield put(ExamAction.createExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.createExamTeacherFailure());
		message.error('Thêm mới đề thi không thành công ! Xin thử lại');
	}
}

function* handleCreateExamAuto(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(ExamAPI.createExamAuto, req);
		if (!res.errors) {
			yield put(ExamAction.createExamAutoTeacherSuccess());
			yield put(ExamAction.getExamsTeacherRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới đề thi thành công' });
		} else {
			yield put(ExamAction.createExamAutoTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.createExamAutoTeacherFailure());
		message.error('Thêm mới đề thi không thành công ! Xin thử lại');
	}
}
function* handleUpdateExam(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ExamAPI.updateExam, { req, ID });
		if (!res.errors) {
			yield put(ExamAction.updateExamTeacherSuccess());
			yield put(ExamAction.getDetailExamTeacherRequest({ID}));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật đề thi thành công' });
		} else {
			yield put(ExamAction.updateExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.updateExamTeacherFailure());
		message.error('Cập nhật đề thi không thành công ! Xin thử lại');
	}
}
function* handleRemoveExam(action) {
	try {
		const { ID, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(ExamAPI.removeExam, ID);
		if (!res.errors) {
			yield put(ExamAction.removeExamTeacherSuccess());
			yield put(ExamAction.getExamsTeacherRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa đề thi thành công' });
		} else {
			yield put(ExamAction.removeExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.removeExamTeacherFailure());
		message.error('Xóa đề thi không thành công ! Xin thử lại');
	}
}
function* handleRemoveDetailExam(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(ExamAPI.removeExam, ID);
		if (!res.errors) {
			yield put(ExamAction.removeDetailExamTeacherSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa đề thi thành công' });
		} else {
			yield put(ExamAction.removeDetailExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.removeDetailExamTeacherFailure());
		message.error('Xóa đề thi không thành công ! Xin thử lại');
	}
}
function* handleAuthPassword(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountAPI.authAccount, req);
		if (!res.errors) {
			yield put(ExamAction.authPasswordExamTeacherSuccess());
			if (cb && typeof cb === 'function') yield cb({ isAuthed: res });
		} else {
			yield put(ExamAction.authPasswordExamTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.authPasswordExamTeacherFailure());
		message.error('Xác thực tài khoản không thành công ! Xin thử lại');
	}
}

const getAndSearchQuestionSaga = {
	on: ExamAction.getQuestionsForExamTeacherRequest,
	worker: handleGetQuestionsForExam,
};
const getQuestionsForUpdateExamSaga = {
	on: ExamAction.getQuestionsForUpdateExamTeacherRequest,
	worker: handleGetQuestionsForUpdateExam,
};
const getExamsSaga = {
	on: ExamAction.getExamsTeacherRequest,
	worker: handleGetAndSearchExam,
};
const getDetailExamSaga = {
	on: ExamAction.getDetailExamTeacherRequest,
	worker: handleGetDetailExam,
};
const createExamSaga = {
	on: ExamAction.createExamTeacherRequest,
	worker: handleCreateExam,
};
const createExamAutoSaga = {
	on: ExamAction.createExamAutoTeacherRequest,
	worker: handleCreateExamAuto,
};
const updateExamSaga = {
	on: ExamAction.updateExamTeacherRequest,
	worker: handleUpdateExam,
};
const removeExamSaga = {
	on: ExamAction.removeExamTeacherRequest,
	worker: handleRemoveExam,
};
const removeDetailExamSaga = {
	on: ExamAction.removeDetailExamTeacherRequest,
	worker: handleRemoveDetailExam,
};

const authAccountExamSaga = {
	on: ExamAction.authPasswordExamTeacherRequest,
	worker: handleAuthPassword,
};
const getTotalQuestionSaga = {
	on: ExamAction.getTotalQuestionTeacherRequest,
	worker: handleGetTotalQuestion,
};

export default createSagas([
	getAndSearchQuestionSaga,
	getQuestionsForUpdateExamSaga,
	getExamsSaga,
	getDetailExamSaga,
	createExamSaga,
	createExamAutoSaga,
	updateExamSaga,
	removeExamSaga,
	removeDetailExamSaga,
	authAccountExamSaga,
	getTotalQuestionSaga,
]);
