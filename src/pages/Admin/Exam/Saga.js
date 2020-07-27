import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import ExamAction from './Action';
import QuestionAPI from '../../../apis/Question';
import ExamAPI from '../../../apis/Exam';
import SubjectAPI from '../../../apis/Subject';
import AccountAPI from '../../../apis/Account';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetQuestionsForExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getAndSearchQuestion, req);
		if (!res.errors) {
			yield put(ExamAction.getQuestionsForExamSuccess(res));
		} else {
			yield put(ExamAction.getQuestionsForExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getQuestionsForExamFailure());
		message.error('Lấy danh sách câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleGetSubjectsForExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SubjectAPI.getAll, req);
		if (!res.errors) {
			yield put(ExamAction.getSubjectsForExamSuccess(res));
		} else {
			yield put(ExamAction.getSubjectsForExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getSubjectsForExamFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetQuestionsForUpdateExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getQuestionsForUpdateExam, req);
		if (!res.errors) {
			yield put(ExamAction.getQuestionsForUpdateExamSuccess(res));
		} else {
			yield put(ExamAction.getQuestionsForUpdateExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getQuestionsForUpdateExamFailure());
		message.error('Lấy danh sách câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleGetTotalQuestion(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getTotalQuestion, req);
		if (!res.errors) {
			yield put(ExamAction.getTotalQuestionSuccess(res));
		} else {
			yield put(ExamAction.getTotalQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getTotalQuestionFailure());
		message.error('Lấy số lượng câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleGetAndSearchExam(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ExamAPI.getExams, req);
		if (!res.errors) {
			yield put(ExamAction.getExamsSuccess(res));
		} else {
			yield put(ExamAction.getExamsFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getExamsFailure());
		message.error('Lấy danh sách đề thi không thành công ! Xin thử lại');
	}
}

function* handleGetDetailExam(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ExamAPI.getDetailExam, ID);
		if (!res.errors) {
			yield put(ExamAction.getDetailExamSuccess(res));
		} else {
			yield put(ExamAction.getDetailExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.getDetailExamFailure());
		message.error('Lấy thông tin đề thi không thành công ! Xin thử lại');
	}
}

function* handleCreateExam(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(ExamAPI.createExam, req);
		if (!res.errors) {
			yield put(ExamAction.createExamSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới đề thi thành công' });
		} else {
			yield put(ExamAction.createExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.createExamFailure());
		message.error('Thêm mới đề thi không thành công ! Xin thử lại');
	}
}

function* handleCreateExamAuto(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(ExamAPI.createExamAuto, req);
		if (!res.errors) {
			yield put(ExamAction.createExamAutoSuccess());
			yield put(ExamAction.getExamsRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới đề thi thành công' });
		} else {
			yield put(ExamAction.createExamAutoFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.createExamAutoFailure());
		message.error('Thêm mới đề thi không thành công ! Xin thử lại');
	}
}
function* handleUpdateExam(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ExamAPI.updateExam, { req, ID });
		if (!res.errors) {
			yield put(ExamAction.updateExamSuccess());
			yield put(ExamAction.getDetailExamRequest({ID}));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật đề thi thành công' });
		} else {
			yield put(ExamAction.updateExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.updateExamFailure());
		message.error('Cập nhật đề thi không thành công ! Xin thử lại');
	}
}
function* handleRemoveExam(action) {
	try {
		const { ID, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(ExamAPI.removeExam, ID);
		if (!res.errors) {
			yield put(ExamAction.removeExamSuccess());
			yield put(ExamAction.getExamsRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa đề thi thành công' });
		} else {
			yield put(ExamAction.removeExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.removeExamFailure());
		message.error('Xóa đề thi không thành công ! Xin thử lại');
	}
}
function* handleRemoveDetailExam(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(ExamAPI.removeExam, ID);
		if (!res.errors) {
			yield put(ExamAction.removeDetailExamSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa đề thi thành công' });
		} else {
			yield put(ExamAction.removeDetailExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.removeDetailExamFailure());
		message.error('Xóa đề thi không thành công ! Xin thử lại');
	}
}
function* handleAuthPassword(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountAPI.authAccount, req);
		if (!res.errors) {
			yield put(ExamAction.authPasswordExamSuccess());
			if (cb && typeof cb === 'function') yield cb({ isAuthed: res });
		} else {
			yield put(ExamAction.authPasswordExamFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(ExamAction.authPasswordExamFailure());
		message.error('Xác thực tài khoản không thành công ! Xin thử lại');
	}
}

const getAndSearchQuestionSaga = {
	on: ExamAction.getQuestionsForExamRequest,
	worker: handleGetQuestionsForExam,
};
const getQuestionsForUpdateExamSaga = {
	on: ExamAction.getQuestionsForUpdateExamRequest,
	worker: handleGetQuestionsForUpdateExam,
};
const getExamsSaga = {
	on: ExamAction.getExamsRequest,
	worker: handleGetAndSearchExam,
};
const getDetailExamSaga = {
	on: ExamAction.getDetailExamRequest,
	worker: handleGetDetailExam,
};
const createExamSaga = {
	on: ExamAction.createExamRequest,
	worker: handleCreateExam,
};
const createExamAutoSaga = {
	on: ExamAction.createExamAutoRequest,
	worker: handleCreateExamAuto,
};
const updateExamSaga = {
	on: ExamAction.updateExamRequest,
	worker: handleUpdateExam,
};
const removeExamSaga = {
	on: ExamAction.removeExamRequest,
	worker: handleRemoveExam,
};
const removeDetailExamSaga = {
	on: ExamAction.removeDetailExamRequest,
	worker: handleRemoveDetailExam,
};

const authAccountExamSaga = {
	on: ExamAction.authPasswordExamRequest,
	worker: handleAuthPassword,
};
const getTotalQuestionSaga = {
	on: ExamAction.getTotalQuestionRequest,
	worker: handleGetTotalQuestion,
};

const getSubjectsForExamSaga = {
	on: ExamAction.getSubjectsForExamRequest,
	worker: handleGetSubjectsForExam,
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
	getSubjectsForExamSaga
]);
