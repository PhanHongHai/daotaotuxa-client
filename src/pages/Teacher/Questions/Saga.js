import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import QuestionAction from './Action';
import QuestionAPI from '../../../apis/Question';
import SubjectAPI from '../../../apis/Subject';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetSubjectsForQuestion() {
	try {
		const res = yield call(SubjectAPI.getAll);
		if (!res.errors) {
			yield put(QuestionAction.getSubjectsForQuestionTeacherSuccess(res));
		} else {
			yield put(QuestionAction.getSubjectsForQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.getSubjectsForQuestionTeacherFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}
function* handleGetAndSearchQuestion(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getAndSearchQuestion, req);
		if (!res.errors) {
			yield put(QuestionAction.getAndSearchQuestionTeacherSuccess(res));
		} else {
			yield put(QuestionAction.getAndSearchQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.getAndSearchQuestionTeacherFailure());
		message.error('Lấy danh sách câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleGetDetailQuestion(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(QuestionAPI.getDetailQuestion, ID);
		if (!res.errors) {
			yield put(QuestionAction.getDetailQuestionTeacherSuccess(res));
		} else {
			yield put(QuestionAction.getDetailQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.getDetailQuestionTeacherFailure());
		message.error('Lấy thông tin câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleCreateQuestion(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(QuestionAPI.createQuestion, req);
		if (!res.errors) {
			yield put(QuestionAction.createQuestionTeacherSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới câu hỏi thành công' });
		} else {
			yield put(QuestionAction.createQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.createQuestionTeacherFailure());
		message.error('Thêm mới câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleUpdateQuestion(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(QuestionAPI.updateQuestion, { req, ID });
		if (!res.errors) {
			yield put(QuestionAction.updateQuestionTeacherSuccess());
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật câu hỏi thành công' });
		} else {
			yield put(QuestionAction.updateQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.updateQuestionTeacherFailure());
		message.error('Cập nhật câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleRemoveQuestion(action) {
	try {
		const { ID, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(QuestionAPI.removeQuestion, ID);
		if (!res.errors) {
			yield put(QuestionAction.removeQuestionTeacherSuccess());
			yield put(QuestionAction.getAndSearchQuestionTeacherRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa câu hỏi thành công' });
		} else {
			yield put(QuestionAction.removeQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.removeQuestionTeacherFailure());
		message.error('Xóa câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleRemoveDetailQuestion(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(QuestionAPI.removeQuestion, ID);
		if (!res.errors) {
			yield put(QuestionAction.removeDetailQuestionTeacherSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa câu hỏi thành công' });
		} else {
			yield put(QuestionAction.removeDetailQuestionTeacherFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.removeDetailQuestionTeacherFailure());
		message.error('Xóa câu hỏi không thành công ! Xin thử lại');
	}
}

const getSubjectsForQuestionSaga = {
	on: QuestionAction.getSubjectsForQuestionTeacherRequest,
	worker: handleGetSubjectsForQuestion,
};

const getAndSearchQuestionSaga = {
	on: QuestionAction.getAndSearchQuestionTeacherRequest,
	worker: handleGetAndSearchQuestion,
};

const getDetailQuestionSaga = {
	on: QuestionAction.getDetailQuestionTeacherRequest,
	worker: handleGetDetailQuestion,
};
const getCreateQuestionSaga = {
	on: QuestionAction.createQuestionTeacherRequest,
	worker: handleCreateQuestion,
};
const getUpdateQuestionSaga = {
	on: QuestionAction.updateQuestionTeacherRequest,
	worker: handleUpdateQuestion,
};
const getRemoveQuestionSaga = {
	on: QuestionAction.removeQuestionTeacherRequest,
	worker: handleRemoveQuestion,
};
const getRemoveDetailQuestionSaga = {
	on: QuestionAction.removeDetailQuestionTeacherRequest,
	worker: handleRemoveDetailQuestion,
};

export default createSagas([
	getSubjectsForQuestionSaga,
	getAndSearchQuestionSaga,
	getDetailQuestionSaga,
	getCreateQuestionSaga,
	getUpdateQuestionSaga,
	getRemoveQuestionSaga,
	getRemoveDetailQuestionSaga
]);
