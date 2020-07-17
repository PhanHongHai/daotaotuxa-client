import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getSubjectsStatus: STATUS.DEFAULT,
	getDocumentStatus: STATUS.DEFAULT,
	getDetailSubjectStatus: STATUS.DEFAULT,
	getDetailDocumentStatus: STATUS.DEFAULT,
	createSubjectStatus: STATUS.DEFAULT,
	createDocumentStatus: STATUS.DEFAULT,
	updateSubjectStatus: STATUS.DEFAULT,
	updateDocumentStatus: STATUS.DEFAULT,
	deleteSubjectStatus: STATUS.DEFAULT,
	deleteDocumentStatus: STATUS.DEFAULT,
	deleteFileDoc: STATUS.DEFAULT,
	subjects: {
		data: [],
		pagination: {},
	},
	documents: {
		data: [],
		pagination: {},
	},
	detailSubject: {},
	detailDocument: {},
};

const reducer = [
	// active when call action get list subject
	{
		on: Action.getSubjectsTeacherPageRequest,
		reducer: state => ({
			...state,
			getSubjectsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsTeacherPageSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsStatus: STATUS.SUCCESS,
			subjects: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubjectsTeacherPageFailure,
		reducer: state => ({
			...state,
			getSubjectsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list document
	{
		on: Action.getDocumentsTeacherPageRequest,
		reducer: state => ({
			...state,
			getDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDocumentsTeacherPageSuccess,
		reducer: (state, action) => ({
			...state,
			getDocumentStatus: STATUS.SUCCESS,
			documents: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getDocumentsTeacherPageFailure,
		reducer: state => ({
			...state,
			getDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail subject
	{
		on: Action.getDetailSubjectTeacherPageRequest,
		reducer: state => ({
			...state,
			getDetailSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailSubjectTeacherPageSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailSubjectStatus: STATUS.SUCCESS,
			detailSubject: action.payload,
		}),
	},
	{
		on: Action.getDetailSubjectTeacherPageFailure,
		reducer: state => ({
			...state,
			getDetailSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail document
	{
		on: Action.getDetailDocumentTeacherPageRequest,
		reducer: state => ({
			...state,
			getDetailDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailDocumentTeacherPageSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailDocumentStatus: STATUS.SUCCESS,
			detailDocument: action.payload,
		}),
	},
	{
		on: Action.getDetailDocumentTeacherPageFailure,
		reducer: state => ({
			...state,
			getDetailDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create subject
	{
		on: Action.createSubjectTeacherPageRequest,
		reducer: state => ({
			...state,
			createSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createSubjectTeacherPageSuccess,
		reducer: state => ({
			...state,
			createSubjectStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createSubjectTeacherPageFailure,
		reducer: state => ({
			...state,
			createSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create document
	{
		on: Action.createDocumentTeacherPageRequest,
		reducer: state => ({
			...state,
			createDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createDocumentTeacherPageSuccess,
		reducer: state => ({
			...state,
			createDocumentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createDocumentTeacherPageFailure,
		reducer: state => ({
			...state,
			createDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update subject
	{
		on: Action.updateSubjectTeacherPageRequest,
		reducer: state => ({
			...state,
			updateSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateSubjectTeacherPageSuccess,
		reducer: state => ({
			...state,
			updateSubjectStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateSubjectTeacherPageFailure,
		reducer: state => ({
			...state,
			updateSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update document
	{
		on: Action.updateDocumentTeacherPageRequest,
		reducer: state => ({
			...state,
			updateDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateDocumentTeacherPageSuccess,
		reducer: state => ({
			...state,
			updateDocumentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateDocumentTeacherPageFailure,
		reducer: state => ({
			...state,
			updateDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete subject
	{
		on: Action.deleteSubjectTeacherPageRequest,
		reducer: state => ({
			...state,
			deleteSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteSubjectTeacherPageSuccess,
		reducer: state => ({
			...state,
			deleteSubjectStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteSubjectTeacherPageFailure,
		reducer: state => ({
			...state,
			deleteSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete document
	{
		on: Action.deleteDocumentTeacherPageRequest,
		reducer: state => ({
			...state,
			deleteDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteDocumentTeacherPageSuccess,
		reducer: state => ({
			...state,
			deleteDocumentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteDocumentTeacherPageFailure,
		reducer: state => ({
			...state,
			deleteDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete file doc upload
	{
		on: Action.removeFileDocTeacherPageRequest,
		reducer: state => ({
			...state,
			deleteFileDocStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeFileDocTeacherPageSuccess,
		reducer: state => ({
			...state,
			deleteFileDocStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeFileDocTeacherPageFailure,
		reducer: state => ({
			...state,
			deleteFileDocStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('subjectOfTeacherPage', reducer, initialState);
