import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getSubjectOfClassStatus: STATUS.DEFAULT,
	getStudentsOfClassStatus: STATUS.DEFAULT,
	getDetailOfClassByStudentIDStatus: STATUS.DEFAULT,
	getInfoSubjectByID: STATUS.DEFAULT,
	getSubjectsOtherByStudentStatus: STATUS.DEFAULT,
	getDocumentsByTypeStatus: STATUS.DEFAULT,
	getDetailDocumentByStudentStatus: STATUS.DEFAULT,
	getDetaiSubjectProgressStatus: STATUS.DEFAULT,
	getProgressByStudentStatus: STATUS.DEFAULT,
	createSubjectProgressStatus: STATUS.DEFAULT,
	getScheduleOfClassStatus: STATUS.DEFAULT,
	getPointsByStudentStatus: STATUS.DEFAULT,
	detailOfClass: {},
	infoSubject: {},
	detailDocument: {},
	studentsClass: {
		data: [],
		pagination: {},
	},
	subjectsClass: {
		data: [],
		pagination: {},
	},
	subjectOther: {
		data: [],
		pagination: {},
	},
	documents: {
		data: [],
		pagination: {},
	},
	scheduleOfClass: {
		data: [],
		pagination: {},
	},
	pointsOfStudent: {
		data: [],
		pagination: {},
	},
	detailSubjectProgress: {},
	progressOfStudent: [],
};

const reducer = [
	// active when call action get detail class by studentID
	{
		on: Action.getDetailOfClassByStudentIDRequest,
		reducer: state => ({
			...state,
			getDetailOfClassByStudentIDStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailOfClassByStudentIDSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailOfClassByStudentIDStatus: STATUS.SUCCESS,
			detailOfClass: action.payload,
		}),
	},
	{
		on: Action.getDetailOfClassByStudentIDFailure,
		reducer: state => {
			return {
				...state,
				getDetailOfClassByStudentIDStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get student list of class
	{
		on: Action.getStudentsOfClassByStudentRequest,
		reducer: state => ({
			...state,
			getStudentsOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getStudentsOfClassByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getStudentsOfClassStatus: STATUS.SUCCESS,
			studentsClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getStudentsOfClassByStudentFailure,
		reducer: state => {
			return {
				...state,
				getStudentsOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get subject list of class
	{
		on: Action.getSubjectsOfClassByStudentRequest,
		reducer: state => ({
			...state,
			getSubjectOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsOfClassByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectOfClassStatus: STATUS.SUCCESS,
			subjectsClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubjectsOfClassByStudentFailure,
		reducer: state => {
			return {
				...state,
				getSubjectOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get subject list other of class
	{
		on: Action.getSubjectsOtherByStudentRequest,
		reducer: state => ({
			...state,
			getSubjectsOtherByStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsOtherByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsOtherByStudentStatus: STATUS.SUCCESS,
			subjectOther: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubjectsOtherByStudentFailure,
		reducer: state => {
			return {
				...state,
				getSubjectsOtherByStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get info subject by id
	{
		on: Action.getInfoSubjectByIDRequest,
		reducer: state => ({
			...state,
			getInfoSubjectByID: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getInfoSubjectByIDSuccess,
		reducer: (state, action) => ({
			...state,
			getInfoSubjectByID: STATUS.SUCCESS,
			infoSubject: action.payload,
		}),
	},
	{
		on: Action.getInfoSubjectByIDFailure,
		reducer: state => {
			return {
				...state,
				getInfoSubjectByID: STATUS.FAILURE,
			};
		},
	},
	// active when call action get documents by subject id
	{
		on: Action.getDocumentsByTypeRequest,
		reducer: state => ({
			...state,
			getDocumentsByTypeStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDocumentsByTypeSuccess,
		reducer: (state, action) => ({
			...state,
			getDocumentsByTypeStatus: STATUS.SUCCESS,
			documents: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getDocumentsByTypeFailure,
		reducer: state => {
			return {
				...state,
				getDocumentsByTypeStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get detail document
	{
		on: Action.getDetailDocumentByStudentRequest,
		reducer: state => ({
			...state,
			getDetailDocumentByStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailDocumentByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailDocumentByStudentStatus: STATUS.SUCCESS,
			detailDocument: action.payload,
		}),
	},
	{
		on: Action.getDetailDocumentByStudentFailure,
		reducer: state => {
			return {
				...state,
				getDetailDocumentByStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get detail subject progress
	{
		on: Action.getDetailSubjectProgressRequest,
		reducer: state => ({
			...state,
			getDetaiSubjectProgressStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailSubjectProgressSuccess,
		reducer: (state, action) => ({
			...state,
			getDetaiSubjectProgressStatus: STATUS.SUCCESS,
			detailSubjectProgress: action.payload,
		}),
	},
	{
		on: Action.getDetailSubjectProgressFailure,
		reducer: state => {
			return {
				...state,
				getDetaiSubjectProgressStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get points by student
	{
		on: Action.getPointsByStudentRequest,
		reducer: state => ({
			...state,
			getPointsByStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getPointsByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getPointsByStudentStatus: STATUS.SUCCESS,
			pointsOfStudent: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getPointsByStudentFailure,
		reducer: state => {
			return {
				...state,
				getPointsByStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action create subject progress
	{
		on: Action.createSubjectProgressRequest,
		reducer: state => ({
			...state,
			createSubjectProgressStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createSubjectProgressSuccess,
		reducer: state => ({
			...state,
			createSubjectProgressStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createSubjectProgressFailure,
		reducer: state => {
			return {
				...state,
				createSubjectProgressStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action create subject progress
	{
		on: Action.getProgressByStudentRequest,
		reducer: state => ({
			...state,
			getProgressByStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getProgressByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getProgressByStudentStatus: STATUS.SUCCESS,
			progressOfStudent: action.payload,
		}),
	},
	{
		on: Action.getProgressByStudentFailure,
		reducer: state => {
			return {
				...state,
				getProgressByStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get schedule of class by id
	{
		on: Action.getScheduleOfClassByIDRequest,
		reducer: state => ({
			...state,
			getScheduleOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getScheduleOfClassByIDSuccess,
		reducer: (state, action) => ({
			...state,
			getScheduleOfClassStatus: STATUS.SUCCESS,
			scheduleOfClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getScheduleOfClassByIDFailure,
		reducer: state => {
			return {
				...state,
				getScheduleOfClassStatus: STATUS.FAILURE,
			};
		},
	},
];

export default createReducers('classOfStudentPage', reducer, initialState);
