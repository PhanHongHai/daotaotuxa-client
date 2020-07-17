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
		on: Action.getSubjectsForQuestionRequest,
		reducer: state => ({
			...state,
			getSubjectsForQuestion: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsForQuestionSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsForQuestion: STATUS.SUCCESS,
			subjects: action.payload,
		}),
	},
	{
		on: Action.getSubjectsForQuestionFailure,
		reducer: state => ({
			...state,
			getSubjectsForQuestion: STATUS.FAILURE,
		}),
	},
	// active when call action get list question
	{
		on: Action.getAndSearchQuestionRequest,
		reducer: state => ({
			...state,
			getAndSearchQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getAndSearchQuestionSuccess,
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
		on: Action.getAndSearchQuestionFailure,
		reducer: state => ({
			...state,
			getAndSearchQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action get detail question
	{
		on: Action.getDetailQuestionRequest,
		reducer: state => ({
			...state,
			getDetailQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailQuestionSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailQuestionStatus: STATUS.SUCCESS,
			detailQuestion: action.payload,
		}),
	},
	{
		on: Action.getDetailQuestionFailure,
		reducer: state => ({
			...state,
			getDetailQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action create question
	{
		on: Action.createQuestionRequest,
		reducer: state => ({
			...state,
			createQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createQuestionSuccess,
		reducer: state => ({
			...state,
			createQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createQuestionFailure,
		reducer: state => ({
			...state,
			createQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action update question
	{
		on: Action.updateQuestionRequest,
		reducer: state => ({
			...state,
			updateQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateQuestionSuccess,
		reducer: state => ({
			...state,
			updateQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateQuestionFailure,
		reducer: state => ({
			...state,
			updateQuestionStatus: STATUS.FAILURE,
		}),
	},

	// active when call action remove question
	{
		on: Action.removeQuestionRequest,
		reducer: state => ({
			...state,
			removeQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeQuestionSuccess,
		reducer: state => ({
			...state,
			removeQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeQuestionFailure,
		reducer: state => ({
			...state,
			removeQuestionStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove detail question
	{
		on: Action.removeDetailQuestionRequest,
		reducer: state => ({
			...state,
			removeDetailQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeDetailQuestionSuccess,
		reducer: state => ({
			...state,
			removeDetailQuestionStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeDetailQuestionFailure,
		reducer: state => ({
			...state,
			removeDetailQuestionStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('questionPage', reducer, initialState);
