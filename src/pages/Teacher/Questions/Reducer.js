import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getSubjectsForQuestionStatus: STATUS.DEFAULT,
	getAndSearchQuestionStatus: STATUS.DEFAULT,
	getDetailQuestionStatus: STATUS.DEFAULT,
	createQuestionStatus: STATUS.DEFAULT,
	updateQuestionStatus: STATUS.DEFAULT,
	removeQuestionStatus: STATUS.DEFAULT,
	removeDetailQuestionStatus: STATUS.DEFAULT,
	questions: {
		data: [],
		pagination: {},
	},
	detailQuestion: {},
	subjects:[],
};

const reducer = [
	// active when call action get list subject
	{
		on: Action.getSubjectsForQuestionTeacherRequest,
		reducer: state => ({
			...state,
			getSubjectsForQuestion: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsForQuestionTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsForQuestion: STATUS.SUCCESS,
			subjects: action.payload,
		}),
	},
	{
		on: Action.getSubjectsForQuestionTeacherFailure,
		reducer: state => ({
			...state,
			getSubjectsForQuestion: STATUS.FAILURE,
		}),
	},
	// active when call action get list question
	{
		on: Action.getAndSearchQuestionTeacherRequest,
		reducer: state => ({
			...state,
			getAndSearchQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getAndSearchQuestionTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getAndSearchQuestionStatus: STATUS.SUCCESS,
			questions: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getAndSearchQuestionTeacherFailure,
		reducer: state => ({
			...state,
			getAndSearchQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action get detail question
	{
		on: Action.getDetailQuestionTeacherRequest,
		reducer: state => ({
			...state,
			getDetailQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailQuestionTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailQuestionStatus: STATUS.SUCCESS,
			detailQuestion: action.payload,
		}),
	},
	{
		on: Action.getDetailQuestionTeacherFailure,
		reducer: state => ({
			...state,
			getDetailQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action create question
	{
		on: Action.createQuestionTeacherRequest,
		reducer: state => ({
			...state,
			createQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createQuestionTeacherSuccess,
		reducer: state => ({
			...state,
			createQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createQuestionTeacherFailure,
		reducer: state => ({
			...state,
			createQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action update question
	{
		on: Action.updateQuestionTeacherRequest,
		reducer: state => ({
			...state,
			updateQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateQuestionTeacherSuccess,
		reducer: state => ({
			...state,
			updateQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateQuestionTeacherFailure,
		reducer: state => ({
			...state,
			updateQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action remove question
	{
		on: Action.removeQuestionTeacherRequest,
		reducer: state => ({
			...state,
			removeQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeQuestionTeacherSuccess,
		reducer: state => ({
			...state,
			removeQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeQuestionTeacherFailure,
		reducer: state => ({
			...state,
			removeQuestionStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove detail question
	{
		on: Action.removeDetailQuestionTeacherRequest,
		reducer: state => ({
			...state,
			removeDetailQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeDetailQuestionTeacherSuccess,
		reducer: state => ({
			...state,
			removeDetailQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeDetailQuestionTeacherFailure,
		reducer: state => ({
			...state,
			removeDetailQuestionStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('questionPageTeacher', reducer, initialState);
