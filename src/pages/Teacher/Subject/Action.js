import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	removeFileDocTeacherPageRequest,
	removeFileDocTeacherPageSuccess,
	removeFileDocTeacherPageFailure,
} = createAsyncAction('removeFileDocTeacherPage', 'REMOVE_FILE_DOC_TEACHER_PAGE');
const {
	getSubjectsTeacherPageRequest,
	getSubjectsTeacherPageSuccess,
	getSubjectsTeacherPageFailure,
} = createAsyncAction('getSubjectsTeacherPage', 'GET_SUBJECTS_TEACHER_PAGE');

const {
	getDetailSubjectTeacherPageRequest,
	getDetailSubjectTeacherPageSuccess,
	getDetailSubjectTeacherPageFailure,
} = createAsyncAction('getDetailSubjectTeacherPage', 'GET_DETAIL_SUBJECT_TEACHER_PAGE');
const {
	getDocumentsTeacherPageRequest,
	getDocumentsTeacherPageSuccess,
	getDocumentsTeacherPageFailure,
} = createAsyncAction('getDocumentsTeacherPage', 'GET_DOCUMENTS_TEACHER_PAGE');
const {
	getDetailDocumentTeacherPageRequest,
	getDetailDocumentTeacherPageSuccess,
	getDetailDocumentTeacherPageFailure,
} = createAsyncAction('getDetailDocumentTeacherPage', 'GET_DETAIL_DOCUMENT_TEACHER_PAGE');

const {
	createDocumentTeacherPageRequest,
	createDocumentTeacherPageSuccess,
	createDocumentTeacherPageFailure,
} = createAsyncAction('createDocumentTeacherPage', 'CREATE_DOCUMENT_TEACHER_PAGE');

const {
	updateDocumentTeacherPageRequest,
	updateDocumentTeacherPageSuccess,
	updateDocumentTeacherPageFailure,
} = createAsyncAction('updateDocumentTeacherPage', 'UPDATE_DOCUMENT_TEACHER_PAGE');

const {
	deleteDocumentTeacherPageRequest,
	deleteDocumentTeacherPageSuccess,
	deleteDocumentTeacherPageFailure,
} = createAsyncAction('deleteDocumentTeacherPage', 'DELETE_DOCUMENT_TEACHER_PAGE');

const {
	createSubjectTeacherPageRequest,
	createSubjectTeacherPageSuccess,
	createSubjectTeacherPageFailure,
} = createAsyncAction('createSubjectTeacherPage', 'CREATE_SUBJECT_TEACHER_PAGE');

const {
	updateSubjectTeacherPageRequest,
	updateSubjectTeacherPageSuccess,
	updateSubjectTeacherPageFailure,
} = createAsyncAction('updateSubjectTeacherPage', 'UPDATE_SUBJECT_TEACHER_PAGE');

const {
	deleteSubjectTeacherPageRequest,
	deleteSubjectTeacherPageSuccess,
	deleteSubjectTeacherPageFailure,
} = createAsyncAction('deleteSubjectTeacherPage', 'DELETE_SUBJECT_TEACHER_PAGE');

const {
	deleteDetailSubjectTeacherPageRequest,
	deleteDetailSubjectTeacherPageSuccess,
	deleteDetailSubjectTeacherPageFailure,
} = createAsyncAction('deleteDetailSubjectTeacherPage', 'DELETE_DETAIL_SUBJECT_TEACHER_PAGE');

const Actions = {
	removeFileDocTeacherPageRequest,
	removeFileDocTeacherPageSuccess,
	removeFileDocTeacherPageFailure,

	getSubjectsTeacherPageRequest,
	getSubjectsTeacherPageSuccess,
  getSubjectsTeacherPageFailure,
  
  getDetailSubjectTeacherPageRequest,
	getDetailSubjectTeacherPageSuccess,
  getDetailSubjectTeacherPageFailure,
  
	getDocumentsTeacherPageRequest,
	getDocumentsTeacherPageSuccess,
  getDocumentsTeacherPageFailure,
  
	getDetailDocumentTeacherPageRequest,
	getDetailDocumentTeacherPageSuccess,
  getDetailDocumentTeacherPageFailure,
  
	createDocumentTeacherPageRequest,
	createDocumentTeacherPageSuccess,
  createDocumentTeacherPageFailure,
  
  updateDocumentTeacherPageRequest,
	updateDocumentTeacherPageSuccess,
	updateDocumentTeacherPageFailure,

	deleteDocumentTeacherPageRequest,
	deleteDocumentTeacherPageSuccess,
  deleteDocumentTeacherPageFailure,
  
	createSubjectTeacherPageRequest,
	createSubjectTeacherPageSuccess,
	createSubjectTeacherPageFailure,

	updateSubjectTeacherPageRequest,
	updateSubjectTeacherPageSuccess,
  updateSubjectTeacherPageFailure,
  
	deleteSubjectTeacherPageRequest,
	deleteSubjectTeacherPageSuccess,
  deleteSubjectTeacherPageFailure,
  
  deleteDetailSubjectTeacherPageRequest,
	deleteDetailSubjectTeacherPageSuccess,
	deleteDetailSubjectTeacherPageFailure,


};

export default Actions;
