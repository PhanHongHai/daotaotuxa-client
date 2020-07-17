import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import SubjectAction from './Action';
import SubjectAPI from '../../../apis/Subject';
import DocumentAPI from '../../../apis/Document';
import { removeFile } from '../../../apis/apiUpload';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeGetDetailSubject(action) {
	try {
		const { subjectID } = action.payload;
		const res = yield call(SubjectAPI.getDetailSubject, subjectID);
		if (!res.errors) {
			yield put(SubjectAction.getDetailSubjectTeacherPageSuccess(res));
		} else {
			yield put(SubjectAction.getDetailSubjectTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getDetailSubjectTeacherPageFailure());
		message.error('Lấy chi tiết môn học không thành công ! Xin thử lại');
	}
}
function* hanldeGetDocuments(action) {
	try {
		const { req } = action.payload;
		const res = yield call(DocumentAPI.getDocuments, req);
		if (!res.errors) {
			yield put(SubjectAction.getDocumentsTeacherPageSuccess(res));
		} else {
			yield put(SubjectAction.getDocumentsTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getDocumentsTeacherPageFailure());
		message.error('Lấy danh sách nội dung môn học không thành công ! Xin thử lại');
	}
}
function* hanldeGetDetailDocument(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(DocumentAPI.getDetailDocument, ID);
		if (!res.errors) {
			yield put(SubjectAction.getDetailDocumentTeacherPageSuccess(res));
		} else {
			yield put(SubjectAction.getDetailDocumentTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getDetailDocumentTeacherPageFailure());
		message.error('Lấy chi tiết nội dung môn học không thành công ! Xin thử lại');
	}
}
function* hanldeCreateSubject(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(SubjectAPI.createSubject, req);
		if (!res.errors) {
			yield put(SubjectAction.createSubjectTeacherPageSuccess(res));
			yield put(SubjectAction.getSubjectsTeacherPageRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới môn học thành công' });
		} else {
			yield put(SubjectAction.createSubjectTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.createSubjectTeacherPageFailure());
		message.error('Thêm môn học không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateSubject(action) {
	try {
		const { ID, req, cb } = action.payload;
		const res = yield call(SubjectAPI.updateSubject, { req, ID });
		if (!res.errors) {
			yield put(SubjectAction.updateSubjectTeacherPageSuccess());
			yield put(SubjectAction.getDetailSubjectTeacherPageRequest({ subjectID: ID }));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật môn học thành công' });
		} else {
			yield put(SubjectAction.updateSubjectTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.updateSubjectTeacherPageFailure());
		message.error('Cập nhật môn học không thành công ! Xin thử lại');
	}
}
function* hanldeCreateDocument(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(DocumentAPI.createDocument, req);
		if (!res.errors) {
			yield put(SubjectAction.createDocumentTeacherPageSuccess(res));
			yield put(
				SubjectAction.getDocumentsTeacherPageRequest({
					req: { ...pageCurrent, subjectID: req.subjectID, keyword, type: req.type },
				}),
			);
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới nội dung thành công' });
		} else {
			yield put(SubjectAction.createDocumentTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.createDocumentTeacherPageFailure());
		message.error('Thêm mới nội dung không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateDocument(action) {
	try {
		const { ID, req, cb, keyword, pageCurrent, type } = action.payload;
		const res = yield call(DocumentAPI.updateDocument, { req, ID });
		if (!res.errors) {
			yield put(SubjectAction.updateDocumentTeacherPageSuccess());
			yield put(SubjectAction.getDetailDocumentTeacherPageRequest({ ID: req.documentID }));
			yield put(
				SubjectAction.getDocumentsTeacherPageRequest({ req: { ...pageCurrent, keyword, type, subjectID: ID } }),
			);
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật nội dung thành công' });
		} else {
			yield put(SubjectAction.updateDocumentTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.updateDocumentTeacherPageFailure());
		message.error('Cập nhật nội dung không thành công ! Xin thử lại');
	}
}

function* hanldeDeleteSubject(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(SubjectAPI.deleteSubject, ID);
		if (!res.errors) {
			yield put(SubjectAction.deleteSubjectTeacherPageSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRedirect: true, msg: 'Xóa môn học thành công' });
		} else {
			yield put(SubjectAction.deleteSubjectTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.deleteSubjectTeacherPageFailure());
		message.error('Xóa môn học không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteDocument(action) {
	try {
		const { ID, pageCurrent, keyword, type, cb } = action.payload;
		const res = yield call(DocumentAPI.deleteDocument, ID);
		if (!res.errors) {
			yield put(SubjectAction.deleteDocumentTeacherPageSuccess());
			yield put(SubjectAction.getDocumentsTeacherPageRequest({ req: { ...pageCurrent, keyword, type } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Xóa nội dung thành công' });
		} else {
			yield put(SubjectAction.deleteDocumentTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.deleteDocumentTeacherPageFailure());
		message.error('Xóa nội dung không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteDetailSubject(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(SubjectAPI.deleteSubject, ID);
		if (!res.errors) {
			yield put(SubjectAction.deleteSubjectTeacherPageSuccess(res));
			yield put(SubjectAction.getSubjectsTeacherPageRequest({ req: { limit: 10, page: 1, keyword: '' } }));
			if (cb && typeof cb === 'function') yield cb({ isRedirect: true, msg: 'Xóa môn học thành công' });
		} else {
			yield put(SubjectAction.deleteSubjectTeacherPageFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.deleteSubjectTeacherPageFailure());
		message.error('Xóa môn học không thành công ! Xin thử lại');
	}
}

function* hanldeRemoveFile(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(removeFile, req);
		if (!res.errors) {
			yield put(SubjectAction.removeFileDocTeacherPageSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRemoved: res.isRemoved });
		} else {
			yield put(SubjectAction.removeFileDocTeacherPageFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SubjectAction.removeFileDocTeacherPageFailure());
		message.error('Xóa tệp vừa tải lên không thành công ! Xin thử lại');
	}
}

const getDocumentsSaga = {
	on: SubjectAction.getDocumentsTeacherPageRequest,
	worker: hanldeGetDocuments,
};

const getDetailSubjectSaga = {
	on: SubjectAction.getDetailSubjectTeacherPageRequest,
	worker: hanldeGetDetailSubject,
};

const getDetailDocumentSaga = {
	on: SubjectAction.getDetailDocumentTeacherPageRequest,
	worker: hanldeGetDetailDocument,
};

const createSubjectSaga = {
	on: SubjectAction.createSubjectTeacherPageRequest,
	worker: hanldeCreateSubject,
};

const createDocumentSaga = {
	on: SubjectAction.createDocumentTeacherPageRequest,
	worker: hanldeCreateDocument,
};

const updateSubjectSaga = {
	on: SubjectAction.updateSubjectTeacherPageRequest,
	worker: hanldeUpdateSubject,
};
const updateDocumentSaga = {
	on: SubjectAction.updateDocumentTeacherPageRequest,
	worker: hanldeUpdateDocument,
};

const deleteDocumentSaga = {
	on: SubjectAction.deleteDocumentTeacherPageRequest,
	worker: hanldeDeleteDocument,
};
const deleteSubjectSaga = {
	on: SubjectAction.deleteSubjectTeacherPageRequest,
	worker: hanldeDeleteSubject,
};

const deleteDetailSubjectSaga = {
	on: SubjectAction.deleteDetailSubjectTeacherPageRequest,
	worker: hanldeDeleteDetailSubject,
};

const deleteFileDocSaga = {
	on: SubjectAction.removeFileDocTeacherPageRequest,
	worker: hanldeRemoveFile,
};

export default createSagas([
	getDetailSubjectSaga,
	getDocumentsSaga,
	getDetailDocumentSaga,
	createDocumentSaga,
	createSubjectSaga,
	updateDocumentSaga,
	updateSubjectSaga,
	deleteSubjectSaga,
	deleteDetailSubjectSaga,
	deleteDocumentSaga,
	deleteFileDocSaga,
]);
