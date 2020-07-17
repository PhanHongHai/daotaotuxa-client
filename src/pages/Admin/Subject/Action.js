import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { removeFileDocRequest, removeFileDocSuccess, removeFileDocFailure } = createAsyncAction(
	'removeFileDoc',
	'REMOVE_FILE_DOC',
);
const { getSubjectsRequest, getSubjectsSuccess, getSubjectsFailure } = createAsyncAction('getSubjects', 'GET_SUBJECTS');

const { getDetailSubjectRequest, getDetailSubjectSuccess, getDetailSubjectFailure } = createAsyncAction(
	'getDetailSubject',
	'GET_DETAIL_SUBJECT',
);
const { getDocumentsRequest, getDocumentsSuccess, getDocumentsFailure } = createAsyncAction(
	'getDocuments',
	'GET_DOCUMENTS',
);
const { getDetailDocumentRequest, getDetailDocumentSuccess, getDetailDocumentFailure } = createAsyncAction(
	'getDetailDocument',
	'GET_DETAIL_DOCUMENT',
);

const { createDocumentRequest, createDocumentSuccess, createDocumentFailure } = createAsyncAction(
	'createDocument',
	'CREATE_DOCUMENT',
);

const { updateDocumentRequest, updateDocumentSuccess, updateDocumentFailure } = createAsyncAction(
	'updateDocument',
	'UPDATE_DOCUMENT',
);

const { deleteDocumentRequest, deleteDocumentSuccess, deleteDocumentFailure } = createAsyncAction(
	'deleteDocument',
	'DELETE_DOCUMENT',
);

const { createSubjectRequest, createSubjectSuccess, createSubjectFailure } = createAsyncAction(
	'createSubject',
	'CREATE_SUBJECT',
);

const { updateSubjectRequest, updateSubjectSuccess, updateSubjectFailure } = createAsyncAction(
	'updateSubject',
	'UPDATE_SUBJECT',
);

const { deleteSubjectRequest, deleteSubjectSuccess, deleteSubjectFailure } = createAsyncAction(
	'deleteSubject',
	'DELETE_SUBJECT',
);

const { deleteDetailSubjectRequest, deleteDetailSubjectSuccess, deleteDetailSubjectFailure } = createAsyncAction(
	'deleteDetailSubject',
	'DELETE_DETAIL_SUBJECT',
);

const Actions = {
	removeFileDocRequest,
	removeFileDocSuccess,
	removeFileDocFailure,

	getSubjectsRequest,
	getSubjectsSuccess,
	getSubjectsFailure,

	getDetailSubjectRequest,
	getDetailSubjectSuccess,
	getDetailSubjectFailure,

	getDocumentsRequest,
	getDocumentsSuccess,
	getDocumentsFailure,

	getDetailDocumentRequest,
	getDetailDocumentSuccess,
	getDetailDocumentFailure,

	createDocumentRequest,
	createDocumentSuccess,
	createDocumentFailure,

	updateDocumentRequest,
	updateDocumentSuccess,
	updateDocumentFailure,

	deleteDocumentRequest,
	deleteDocumentSuccess,
	deleteDocumentFailure,

	createSubjectRequest,
	createSubjectSuccess,
	createSubjectFailure,

	updateSubjectRequest,
	updateSubjectSuccess,
	updateSubjectFailure,

	deleteSubjectRequest,
	deleteSubjectSuccess,
	deleteSubjectFailure,

	deleteDetailSubjectRequest,
	deleteDetailSubjectSuccess,
	deleteDetailSubjectFailure,
};

export default Actions;
