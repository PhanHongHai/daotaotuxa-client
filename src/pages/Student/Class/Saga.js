import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import Action from './Action';
import ClassApi from '../../../apis/Class';
import SubjectApi from '../../../apis/Subject';
import DocumentApi from '../../../apis/Document';
import ScheduleApi from '../../../apis/Schedule';
import SubjectProgressApi from '../../../apis/SubjectProgress';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetDetailOfClassByStudentID() {
	try {
		const res = yield call(ClassApi.getInfoClassByAccount);
		if (!res.errors) {
			yield put(Action.getDetailOfClassByStudentIDSuccess(res));
		} else {
			yield put(Action.getDetailOfClassByStudentIDFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailOfClassByStudentIDFailure());
		message.error('Lấy thông tin lớp học không thành công ! Xin thử lại');
	}
}

function* handleGetStudentsOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ClassApi.getAndSearchStudentOfClass, req);
		if (!res.errors) {
			yield put(Action.getStudentsOfClassByStudentSuccess(res));
		} else {
			yield put(Action.getStudentsOfClassByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getStudentsOfClassByStudentFailure());
		message.error('Lấy danh sách học viên không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectsOfClass(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SubjectApi.getSubjectsOfClass, req);
		if (!res.errors) {
			yield put(Action.getSubjectsOfClassByStudentSuccess(res));
		} else {
			yield put(Action.getSubjectsOfClassByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getSubjectsOfClassByStudentFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectsOther(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SubjectApi.getOtherSubjectsOfClass, req);
		if (!res.errors) {
			yield put(Action.getSubjectsOtherByStudentSuccess(res));
		} else {
			yield put(Action.getSubjectsOtherByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getSubjectsOtherByStudentFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetInfoSubject(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(SubjectApi.getInfoSubject, ID);
		if (!res.errors) {
			yield put(Action.getInfoSubjectByIDSuccess(res));
		} else {
			yield put(Action.getInfoSubjectByIDFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getInfoSubjectByIDFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetDocumentByType(action) {
	try {
		const { req } = action.payload;
		const res = yield call(DocumentApi.getDocuments, req);
		if (!res.errors) {
			yield put(Action.getDocumentsByTypeSuccess(res));
		} else {
			yield put(Action.getDocumentsByTypeFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDocumentsByTypeFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetDetailDocument(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(DocumentApi.getDetailDocument, ID);
		if (!res.errors) {
			yield put(Action.getDetailDocumentByStudentSuccess(res));
		} else {
			yield put(Action.getDetailDocumentByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailDocumentByStudentFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}

function* handleGetSubjectProgressByStudent() {
	try {
		const res = yield call(SubjectProgressApi.getSubjectProgressByStudent);
		if (!res.errors) {
			yield put(Action.getProgressByStudentSuccess(res));
		} else {
			yield put(Action.getProgressByStudentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getProgressByStudentFailure());
		message.error('Lấy thông tin tiến độ học tập không thành công ! Xin thử lại');
	}
}

function* handleGetDetailSubjectProgress(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SubjectProgressApi.getDetailSubjectProgress, req);
		if (!res.errors) {
			yield put(Action.getDetailSubjectProgressSuccess(res));
		} else {
			yield put(Action.getDetailSubjectProgressFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getDetailSubjectProgressFailure());
		message.error('Lấy thông tin tiến độ môn học không thành công ! Xin thử lại');
	}
}
function* handleCreateSubjectProgress(action) {
	try {
		const { req, subjectID, cb } = action.payload;
		const res = yield call(SubjectProgressApi.createProgress, req);
		if (!res.errors) {
			yield put(Action.createSubjectProgressSuccess());
			yield put(Action.getDetailSubjectProgressRequest({ req: { subjectID } }));
			if (cb && typeof cb === 'function')
				yield cb({ isProcessed: res.isProcessed, msg: 'Cập nhật môn học thành công' });
		} else {
			yield put(Action.createSubjectProgressFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.createSubjectProgressFailure());
		message.error('Cập nhật tiến độ môn học không thành công ! Xin thử lại');
	}
}
function* handleGetScheduleOfClassByID(action) {
	try {
		const { req } = action.payload;
		const res = yield call(ScheduleApi.getScheduleByClassID, req);
		if (!res.errors) {
			yield put(Action.getScheduleOfClassByIDSuccess(res));
		} else {
			yield put(Action.getScheduleOfClassByIDFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(Action.getScheduleOfClassByIDFailure());
		message.error('Lấy danh sách lịch thi không thành công ! Xin thử lại');
	}
}

const getDetailOfClassByStudentIDSaga = {
	on: Action.getDetailOfClassByStudentIDRequest,
	worker: handleGetDetailOfClassByStudentID,
};

const getStudentsOfClassSaga = {
	on: Action.getStudentsOfClassByStudentRequest,
	worker: handleGetStudentsOfClass,
};

const getSubjectsOfClassSaga = {
	on: Action.getSubjectsOfClassByStudentRequest,
	worker: handleGetSubjectsOfClass,
};

const getInfoSubjectByIDSaga = {
	on: Action.getInfoSubjectByIDRequest,
	worker: handleGetInfoSubject,
};

const getSubjectsOtherSaga = {
	on: Action.getSubjectsOtherByStudentRequest,
	worker: handleGetSubjectsOther,
};

const getDocumentByTypeSaga = {
	on: Action.getDocumentsByTypeRequest,
	worker: handleGetDocumentByType,
};

const getDetailDocumentSaga = {
	on: Action.getDetailDocumentByStudentRequest,
	worker: handleGetDetailDocument,
};

const getDetailSubjectProgressSaga = {
	on: Action.getDetailSubjectProgressRequest,
	worker: handleGetDetailSubjectProgress,
};

const getProgressByStudentSaga = {
	on: Action.getProgressByStudentRequest,
	worker: handleGetSubjectProgressByStudent,
};
const createSubjectProgressSaga = {
	on: Action.createSubjectProgressRequest,
	worker: handleCreateSubjectProgress,
};
const getScheduleOfClassByIDSaga = {
	on: Action.getScheduleOfClassByIDRequest,
	worker: handleGetScheduleOfClassByID,
};

export default createSagas([
	getDetailOfClassByStudentIDSaga,
	getStudentsOfClassSaga,
	getSubjectsOfClassSaga,
	getInfoSubjectByIDSaga,
	getSubjectsOtherSaga,
	getDocumentByTypeSaga,
	getDetailDocumentSaga,
	getDetailSubjectProgressSaga,
	createSubjectProgressSaga,
	getProgressByStudentSaga,
	getScheduleOfClassByIDSaga,
]);
