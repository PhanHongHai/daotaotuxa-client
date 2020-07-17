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
		on: Action.getSubjectsRequest,
		reducer: state => ({
			...state,
			getSubjectsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsSuccess,
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
		on: Action.getSubjectsFailure,
		reducer: state => ({
			...state,
			getSubjectsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list document
	{
		on: Action.getDocumentsRequest,
		reducer: state => ({
			...state,
			getDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDocumentsSuccess,
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
		on: Action.getDocumentsFailure,
		reducer: state => ({
			...state,
			getDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail subject
	{
		on: Action.getDetailSubjectRequest,
		reducer: state => ({
			...state,
			getDetailSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailSubjectSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailSubjectStatus: STATUS.SUCCESS,
			detailSubject: action.payload,
		}),
	},
	{
		on: Action.getDetailSubjectFailure,
		reducer: state => ({
			...state,
			getDetailSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail document
	{
		on: Action.getDetailDocumentRequest,
		reducer: state => ({
			...state,
			getDetailDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailDocumentSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailDocumentStatus: STATUS.SUCCESS,
			detailDocument: action.payload,
		}),
	},
	{
		on: Action.getDetailDocumentFailure,
		reducer: state => ({
			...state,
			getDetailDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create subject
	{
		on: Action.createSubjectRequest,
		reducer: state => ({
			...state,
			createSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createSubjectSuccess,
		reducer: state => ({
			...state,
			createSubjectStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createSubjectFailure,
		reducer: state => ({
			...state,
			createSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create document
	{
		on: Action.createDocumentRequest,
		reducer: state => ({
			...state,
			createDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createDocumentSuccess,
		reducer: state => ({
			...state,
			createDocumentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createDocumentFailure,
		reducer: state => ({
			...state,
			createDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update subject
	{
		on: Action.updateSubjectRequest,
		reducer: state => ({
			...state,
			updateSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateSubjectSuccess,
		reducer: state => ({
			...state,
			updateSubjectStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateSubjectFailure,
		reducer: state => ({
			...state,
			updateSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update document
	{
		on: Action.updateDocumentRequest,
		reducer: state => ({
			...state,
			updateDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateDocumentSuccess,
		reducer: state => ({
			...state,
			updateDocumentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateDocumentFailure,
		reducer: state => ({
			...state,
			updateDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete subject
	{
		on: Action.deleteSubjectRequest,
		reducer: state => ({
			...state,
			deleteSubjectStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteSubjectSuccess,
		reducer: state => ({
			...state,
			deleteSubjectStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteSubjectFailure,
		reducer: state => ({
			...state,
			deleteSubjectStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete document
	{
		on: Action.deleteDocumentRequest,
		reducer: state => ({
			...state,
			deleteDocumentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteDocumentSuccess,
		reducer: state => ({
			...state,
			deleteDocumentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteDocumentFailure,
		reducer: state => ({
			...state,
			deleteDocumentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete file doc upload
	{
		on: Action.removeFileDocRequest,
		reducer: state => ({
			...state,
			deleteFileDocStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeFileDocSuccess,
		reducer: state => ({
			...state,
			deleteFileDocStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeFileDocFailure,
		reducer: state => ({
			...state,
			deleteFileDocStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('subjectPage', reducer, initialState);
