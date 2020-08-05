import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getDetailClassStatus: STATUS.DEFAULT,
	getStudentOfClassStatus: STATUS.DEFAULT,
	getSubjectOfClassStatus: STATUS.DEFAULT,
	getScheduleOfClassStatus: STATUS.DEFAULT,
	getLogsScheduleOfClassStatus: STATUS.DEFAULT,
	createSubjectOfClassStatus: STATUS.DEFAULT,
	updateOfClassStatus: STATUS.DEFAULT,
	getDetailExamStatus: STATUS.DEFAULT,
	exportLogScheduleStatus: STATUS.DEFAULT,
	detailClass: {},
	detailExam: {},
	studentsClass: {
		data: [],
		pagination: {},
	},
	subjectsClass: {
		data: [],
		pagination: {},
	},
	schedulesClass: {
		data: [],
		pagination: {},
	},
	logsScheduleClass: {
		data: [],
		pagination: {},
	},
};

const reducer = [
	// active when call action get info class by teacher
	{
		on: Action.getDetailClassByTeacherRequest,
		reducer: state => ({
			...state,
			getDetailClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailClassByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailClassStatus: STATUS.SUCCESS,
			detailClass: action.payload,
		}),
	},
	{
		on: Action.getDetailClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getDetailClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get student of class by teacher
	{
		on: Action.getStudentOfClassByTeacherRequest,
		reducer: state => ({
			...state,
			getStudentOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getStudentOfClassByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getStudentOfClassStatus: STATUS.SUCCESS,
			studentsClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getStudentOfClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getStudentOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get detail exam  by teacher
	{
		on: Action.getDetailExamByTeacherRequest,
		reducer: state => ({
			...state,
			getDetailExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailExamByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailExamStatus: STATUS.SUCCESS,
			detailExam: action.payload,
		}),
	},
	{
		on: Action.getDetailExamByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getDetailExamStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get subject of class by teacher
	{
		on: Action.getSubjectOfClassByTeacherRequest,
		reducer: state => ({
			...state,
			getSubjectOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectOfClassByTeacherSuccess,
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
		on: Action.getSubjectOfClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getSubjectOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get schedule of class by teacher
	{
		on: Action.getScheduleOfClassByTeacherRequest,
		reducer: state => ({
			...state,
			getScheduleOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getScheduleOfClassByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getScheduleOfClassStatus: STATUS.SUCCESS,
			schedulesClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getScheduleOfClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getScheduleOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get logs schedule of class by teacher
	{
		on: Action.getLogsScheduleOfClassByTeacherRequest,
		reducer: state => ({
			...state,
			getLogsScheduleOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getLogsScheduleOfClassByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getLogsScheduleOfClassStatus: STATUS.SUCCESS,
			logsScheduleClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getLogsScheduleOfClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getLogsScheduleOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action create subject of class by teacher
	{
		on: Action.createSubjectByTeacherRequest,
		reducer: state => ({
			...state,
			createSubjectOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createSubjectByTeacherSuccess,
		reducer: state => ({
			...state,
			createSubjectOfClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createSubjectByTeacherFailure,
		reducer: state => {
			return {
				...state,
				createSubjectOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action update class by teacher
	{
		on: Action.updateClassByTeacherRequest,
		reducer: state => ({
			...state,
			updateOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateClassByTeacherSuccess,
		reducer: state => ({
			...state,
			updateOfClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				updateOfClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action export log schedule of class by teacher
	{
		on: Action.exportLogScheduleByTeacherRequest,
		reducer: state => ({
			...state,
			exportLogScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.exportLogScheduleByTeacherSuccess,
		reducer: state => ({
			...state,
			exportLogScheduleStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.exportLogScheduleByTeacherFailure,
		reducer: state => {
			return {
				...state,
				exportLogScheduleStatus: STATUS.FAILURE,
			};
		},
	},
];

export default createReducers('classOfTeacherPage', reducer, initialState);
