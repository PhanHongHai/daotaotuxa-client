import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getSectorForScheduleStatus: STATUS.DEFAULT,
	getSubjectsBySectorForScheduleStatus: STATUS.DEFAULT,
	getSubjectBySectorForScheduleStatus: STATUS.DEFAULT,
	getExamForScheduleStatus: STATUS.DEFAULT,
	getClassesForScheduleStatus: STATUS.DEFAULT,
	authForScheduleStatus: STATUS.DEFAULT,
	getSchedulesStatus: STATUS.DEFAULT,
	getDetailScheduleStatus: STATUS.DEFAULT,
	getDetailExamForScheduleStatus: STATUS.DEFAULT,
	createScheduleStatus: STATUS.DEFAULT,
	updateScheduleStatus: STATUS.DEFAULT,
	removeScheduleStatus: STATUS.DEFAULT,
	removeDetailScheduleStatus: STATUS.DEFAULT,
	sectors: [],
	subjects: {
		data: [],
		pagination: {},
	},
	exams: {
		data: [],
		pagination: {},
	},
	classes: {
		data: [],
		pagination: {},
	},
	schedules: {
		data: [],
		pagination: {},
	},
	detailSchedule: {},
	detailExam: {},
	subjectAll:[],
};

const reducer = [
	// active when call action get sector for schedule
	{
		on: Action.getSectorForScheduleRequest,
		reducer: state => ({
			...state,
			getSectorForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSectorForScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getSectorForScheduleStatus: STATUS.SUCCESS,
			sectors: action.payload,
		}),
	},
	{
		on: Action.getSectorForScheduleFailure,
		reducer: state => ({
			...state,
			getSectorForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get subjects by sector for schedule
	{
		on: Action.getSubjectsBySectorForScheduleRequest,
		reducer: state => ({
			...state,
			getSubjectsBySectorForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsBySectorForScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsBySectorForScheduleStatus: STATUS.SUCCESS,
			subjectAll: action.payload
		}),
	},
	{
		on: Action.getSubjectsBySectorForScheduleFailure,
		reducer: state => ({
			...state,
			getSubjectsBySectorForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get subject by sector for schedule
	{
		on: Action.getSubjectBySectorForScheduleRequest,
		reducer: state => ({
			...state,
			getSubjectBySectorForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectBySectorForScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectBySectorForScheduleStatus: STATUS.SUCCESS,
			subjects: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubjectBySectorForScheduleFailure,
		reducer: state => ({
			...state,
			getSubjectBySectorForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get exam for schedule
	{
		on: Action.getExamForScheduleRequest,
		reducer: state => ({
			...state,
			getExamForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getExamForScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getExamForScheduleStatus: STATUS.SUCCESS,
			exams: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getExamForScheduleFailure,
		reducer: state => ({
			...state,
			getExamForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail exam for schedule
	{
		on: Action.getDetailExamForScheduleRequest,
		reducer: state => ({
			...state,
			getDetailExamForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailExamForScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailExamForScheduleStatus: STATUS.SUCCESS,
			detailExam: action.payload,
		}),
	},
	{
		on: Action.getDetailExamForScheduleFailure,
		reducer: state => ({
			...state,
			getDetailExamForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get classes for schedule
	{
		on: Action.getClassesForScheduleRequest,
		reducer: state => ({
			...state,
			getClassesForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getClassesForScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getClassesForScheduleStatus: STATUS.SUCCESS,
			classes: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getClassesForScheduleFailure,
		reducer: state => ({
			...state,
			getClassesForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action auth for schedule
	{
		on: Action.authPasswordScheduleRequest,
		reducer: state => ({
			...state,
			authForScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.authPasswordScheduleSuccess,
		reducer: state => ({
			...state,
			authForScheduleStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.authPasswordScheduleFailure,
		reducer: state => ({
			...state,
			authForScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get schedules
	{
		on: Action.getSchedulesRequest,
		reducer: state => ({
			...state,
			getSchedulesStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSchedulesSuccess,
		reducer: (state, action) => ({
			...state,
			getSchedulesStatus: STATUS.SUCCESS,
			schedules: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSchedulesFailure,
		reducer: state => ({
			...state,
			getSchedulesStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail schedule
	{
		on: Action.getDetailScheduleRequest,
		reducer: state => ({
			...state,
			getDetailScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailScheduleSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailScheduleStatus: STATUS.SUCCESS,
			detailSchedule: action.payload,
		}),
	},
	{
		on: Action.getDetailScheduleFailure,
		reducer: state => ({
			...state,
			getDetailScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create schedule
	{
		on: Action.createScheduleRequest,
		reducer: state => ({
			...state,
			createScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createScheduleSuccess,
		reducer: state => ({
			...state,
			createScheduleStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createScheduleFailure,
		reducer: state => ({
			...state,
			createScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update schedule
	{
		on: Action.updateScheduleRequest,
		reducer: state => ({
			...state,
			updateScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateScheduleSuccess,
		reducer: state => ({
			...state,
			updateScheduleStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateScheduleFailure,
		reducer: state => ({
			...state,
			updateScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove schedule
	{
		on: Action.removeScheduleRequest,
		reducer: state => ({
			...state,
			removeScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeScheduleSuccess,
		reducer: state => ({
			...state,
			removeScheduleStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeScheduleFailure,
		reducer: state => ({
			...state,
			removeScheduleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove detail schedule
	{
		on: Action.removeDetailScheduleRequest,
		reducer: state => ({
			...state,
			removeDetailScheduleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeDetailScheduleSuccess,
		reducer: state => ({
			...state,
			removeDetailScheduleStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeDetailScheduleFailure,
		reducer: state => ({
			...state,
			removeDetailScheduleStatus: STATUS.FAILURE,
		}),
	},
];

export default createReducers('schedulePage', reducer, initialState);
