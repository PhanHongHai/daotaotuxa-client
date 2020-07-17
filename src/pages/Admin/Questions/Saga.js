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
			yield put(QuestionAction.getSubjectsForQuestionSuccess(res));
		} else {
			yield put(QuestionAction.getSubjectsForQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.getSubjectsForQuestionFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}
function* handleGetAndSearchQuestion(action) {
	try {
		const { req } = action.payload;
		const res = yield call(QuestionAPI.getAndSearchQuestion, req);
		if (!res.errors) {
			yield put(QuestionAction.getAndSearchQuestionSuccess(res));
		} else {
			yield put(QuestionAction.getAndSearchQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.getAndSearchQuestionFailure());
		message.error('Lấy danh sách câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleGetDetailQuestion(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(QuestionAPI.getDetailQuestion, ID);
		if (!res.errors) {
			yield put(QuestionAction.getDetailQuestionSuccess(res));
		} else {
			yield put(QuestionAction.getDetailQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.getDetailQuestionFailure());
		message.error('Lấy thông tin câu hỏi không thành công ! Xin thử lại');
	}
}

function* handleCreateQuestion(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(QuestionAPI.createQuestion, req);
		if (!res.errors) {
			yield put(QuestionAction.createQuestionSuccess());
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới câu hỏi thành công' });
		} else {
			yield put(QuestionAction.createQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.createQuestionFailure());
		message.error('Thêm mới câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleUpdateQuestion(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(QuestionAPI.updateQuestion, { req, ID });
		if (!res.errors) {
			yield put(QuestionAction.updateQuestionSuccess());
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật câu hỏi thành công' });
		} else {
			yield put(QuestionAction.updateQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.updateQuestionFailure());
		message.error('Cập nhật câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleRemoveQuestion(action) {
	try {
		const { ID, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(QuestionAPI.removeQuestion, ID);
		if (!res.errors) {
			yield put(QuestionAction.removeQuestionSuccess());
			yield put(QuestionAction.getAndSearchQuestionRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa câu hỏi thành công' });
		} else {
			yield put(QuestionAction.removeQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.removeQuestionFailure());
		message.error('Xóa câu hỏi không thành công ! Xin thử lại');
	}
}
function* handleRemoveDetailQuestion(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(QuestionAPI.removeQuestion, ID);
		if (!res.errors) {
			yield put(QuestionAction.removeDetailQuestionSuccess());
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa câu hỏi thành công' });
		} else {
			yield put(QuestionAction.removeDetailQuestionFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(QuestionAction.removeDetailQuestionFailure());
		message.error('Xóa câu hỏi không thành công ! Xin thử lại');
	}
}

const getSubjectsForQuestionSaga = {
	on: QuestionAction.getSubjectsForQuestionRequest,
	worker: handleGetSubjectsForQuestion,
};

const getAndSearchQuestionSaga = {
	on: QuestionAction.getAndSearchQuestionRequest,
	worker: handleGetAndSearchQuestion,
};

const getDetailQuestionSaga = {
	on: QuestionAction.getDetailQuestionRequest,
	worker: handleGetDetailQuestion,
};
const getCreateQuestionSaga = {
	on: QuestionAction.createQuestionRequest,
	worker: handleCreateQuestion,
};
const getUpdateQuestionSaga = {
	on: QuestionAction.updateQuestionRequest,
	worker: handleUpdateQuestion,
};
const getRemoveQuestionSaga = {
	on: QuestionAction.removeQuestionRequest,
	worker: handleRemoveQuestion,
};
const getRemoveDetailQuestionSaga = {
	on: QuestionAction.removeDetailQuestionRequest,
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
