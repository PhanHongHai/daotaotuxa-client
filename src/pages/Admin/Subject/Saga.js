import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import SubjectAction from './Action';
import SubjectAPI from '../../../apis/Subject';
import DocumentAPI from '../../../apis/Document';
import { removeFile } from '../../../apis/apiUpload';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeGetSubjects(action) {
	try {
		const { req } = action.payload;
		const res = yield call(SubjectAPI.getSubjectsGroupFile, req);
		if (!res.errors) {
			yield put(SubjectAction.getSubjectsSuccess(res));
		} else {
			yield put(SubjectAction.getSubjectsFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getSubjectsFailure());
		message.error('Lấy danh sách môn học không thành công ! Xin thử lại');
	}
}
function* hanldeGetDetailSubject(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(SubjectAPI.getDetailSubject, ID);
		if (!res.errors) {
			yield put(SubjectAction.getDetailSubjectSuccess(res));
		} else {
			yield put(SubjectAction.getDetailSubjectFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getDetailSubjectFailure());
		message.error('Lấy chi tiết môn học không thành công ! Xin thử lại');
	}
}
function* hanldeGetDocuments(action) {
	try {
		const { req } = action.payload;
		const res = yield call(DocumentAPI.getDocuments, req);
		if (!res.errors) {
			yield put(SubjectAction.getDocumentsSuccess(res));
		} else {
			yield put(SubjectAction.getDocumentsFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getDocumentsFailure());
		message.error('Lấy danh sách nội dung môn học không thành công ! Xin thử lại');
	}
}
function* hanldeGetDetailDocument(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(DocumentAPI.getDetailDocument, ID);
		if (!res.errors) {
			yield put(SubjectAction.getDetailDocumentSuccess(res));
		} else {
			yield put(SubjectAction.getDetailDocumentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.getDetailDocumentFailure());
		message.error('Lấy chi tiết nội dung môn học không thành công ! Xin thử lại');
	}
}
function* hanldeCreateSubject(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(SubjectAPI.createSubject, req);
		if (!res.errors) {
			yield put(SubjectAction.createSubjectSuccess());
			yield put(SubjectAction.getSubjectsRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới môn học thành công' });
		} else {
			yield put(SubjectAction.createSubjectFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.createSubjectFailure());
		message.error('Thêm môn học không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateSubject(action) {
	try {
		const { ID, req, cb } = action.payload;
		const res = yield call(SubjectAPI.updateSubject, { req, ID });
		if (!res.errors) {
			yield put(SubjectAction.updateSubjectSuccess());
			yield put(SubjectAction.getDetailSubjectRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật môn học thành công' });
		} else {
			yield put(SubjectAction.updateSubjectFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.updateSubjectFailure());
		message.error('Cập nhật môn học không thành công ! Xin thử lại');
	}
}
function* hanldeCreateDocument(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(DocumentAPI.createDocument, req);
		if (!res.errors) {
			yield put(SubjectAction.createDocumentSuccess(res));
			yield put(
				SubjectAction.getDocumentsRequest({
					req: { ...pageCurrent, subjectID: req.subjectID, keyword, type: req.type },
				}),
			);
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm mới nội dung thành công' });
		} else {
			yield put(SubjectAction.createDocumentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.createDocumentFailure());
		message.error('Thêm mới nội dung không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateDocument(action) {
	try {
		const { ID, req, cb } = action.payload;
		const res = yield call(DocumentAPI.updateDocument, { req, ID });
		if (!res.errors) {
			yield put(SubjectAction.updateDocumentSuccess());
			yield put(SubjectAction.getDetailDocumentRequest({ ID: req.documentID }));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật nội dung thành công' });
		} else {
			yield put(SubjectAction.updateDocumentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.updateDocumentFailure());
		message.error('Cập nhật nội dung không thành công ! Xin thử lại');
	}
}

function* hanldeDeleteSubject(action) {
	try {
		const { ID, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(SubjectAPI.deleteSubject, ID);
		if (!res.errors) {
			yield put(SubjectAction.deleteSubjectSuccess());
			yield put(SubjectAction.getSubjectsRequest({ req: { ...pageCurrent, keyword } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Xóa môn học thành công' });
		} else {
			yield put(SubjectAction.deleteSubjectFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.deleteSubjectFailure());
		message.error('Xóa môn học không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteDocument(action) {
	try {
		const { ID, pageCurrent, keyword, type, cb } = action.payload;
		const res = yield call(DocumentAPI.deleteDocument, ID);
		if (!res.errors) {
			yield put(SubjectAction.deleteDocumentSuccess());
			yield put(SubjectAction.getDocumentsRequest({ req: { ...pageCurrent, keyword, type } }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Xóa nội dung thành công' });
		} else {
			yield put(SubjectAction.deleteDocumentFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.deleteDocumentFailure());
		message.error('Xóa nội dung không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteDetailSubject(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(SubjectAPI.deleteSubject, ID);
		if (!res.errors) {
			yield put(SubjectAction.deleteSubjectSuccess(res));
			yield put(SubjectAction.getSubjectsRequest({ req: { limit: 10, page: 1, keyword: '' } }));
			if (cb && typeof cb === 'function') yield cb({ isRedirect: true, msg: 'Xóa môn học thành công' });
		} else {
			yield put(SubjectAction.deleteSubjectFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SubjectAction.deleteSubjectFailure());
		message.error('Xóa môn học không thành công ! Xin thử lại');
	}
}

function* hanldeRemoveFile(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(removeFile, req);
		if (!res.errors) {
			yield put(SubjectAction.removeFileDocSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRemoved: res.isRemoved });
		} else {
			yield put(SubjectAction.removeFileDocFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SubjectAction.removeFileDocFailure());
		message.error('Xóa tệp vừa tải lên không thành công ! Xin thử lại');
	}
}

const getSubjectsSaga = {
	on: SubjectAction.getSubjectsRequest,
	worker: hanldeGetSubjects,
};

const getDocumentsSaga = {
	on: SubjectAction.getDocumentsRequest,
	worker: hanldeGetDocuments,
};

const getDetailSubjectSaga = {
	on: SubjectAction.getDetailSubjectRequest,
	worker: hanldeGetDetailSubject,
};

const getDetailDocumentSaga = {
	on: SubjectAction.getDetailDocumentRequest,
	worker: hanldeGetDetailDocument,
};

const createSubjectSaga = {
	on: SubjectAction.createSubjectRequest,
	worker: hanldeCreateSubject,
};

const createDocumentSaga = {
	on: SubjectAction.createDocumentRequest,
	worker: hanldeCreateDocument,
};

const updateSubjectSaga = {
	on: SubjectAction.updateSubjectRequest,
	worker: hanldeUpdateSubject,
};
const updateDocumentSaga = {
	on: SubjectAction.updateDocumentRequest,
	worker: hanldeUpdateDocument,
};

const deleteDocumentSaga = {
	on: SubjectAction.deleteDocumentRequest,
	worker: hanldeDeleteDocument,
};
const deleteSubjectSaga = {
	on: SubjectAction.deleteSubjectRequest,
	worker: hanldeDeleteSubject,
};

const deleteDetailSubjectSaga = {
	on: SubjectAction.deleteDetailSubjectRequest,
	worker: hanldeDeleteDetailSubject,
};

const deleteFileDocSaga = {
	on: SubjectAction.removeFileDocRequest,
	worker: hanldeRemoveFile,
};

export default createSagas([
	getSubjectsSaga,
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
