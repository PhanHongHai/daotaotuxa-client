import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getQuestionsForExamStatus: STATUS.DEFAULT,
	getQuestionsForUpdateExamStatus: STATUS.DEFAULT,
	getExamsStatus: STATUS.DEFAULT,
	getDetailExamStatus: STATUS.DEFAULT,
	createExamStatus: STATUS.DEFAULT,
	createExamAutoStatus: STATUS.DEFAULT,
	updateExamStatus: STATUS.DEFAULT,
	removeExamStatus: STATUS.DEFAULT,
	authPasswordStatus: STATUS.DEFAULT,
	getTotalQuestionStatus: STATUS.DEFAULT,
	getSubjectsExamStatus: STATUS.DEFAULT,
	questions: {
		data: [],
		pagination: {},
	},
	questionsForUpdateExam: {
		data: [],
		pagination: {},
	},
	exams: {
		data: [],
		pagination: {},
	},
	subjects: [],
	detailExam: {},
	totalQuestion: {},
};

const reducer = [
	// active when call action get list question
	{
		on: Action.getQuestionsForExamRequest,
		reducer: state => ({
			...state,
			getQuestionsForExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getQuestionsForExamSuccess,
		reducer: (state, action) => ({
			...state,
			getQuestionsForExamStatus: STATUS.SUCCESS,
			questions: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getQuestionsForExamFailure,
		reducer: state => ({
			...state,
			getQuestionsForExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list question for update exam
	{
		on: Action.getQuestionsForUpdateExamRequest,
		reducer: state => ({
			...state,
			getQuestionsForUpdateExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getQuestionsForUpdateExamSuccess,
		reducer: (state, action) => ({
			...state,
			getQuestionsForUpdateExamStatus: STATUS.SUCCESS,
			questionsForUpdateExam: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getQuestionsForUpdateExamFailure,
		reducer: state => ({
			...state,
			getQuestionsForUpdateExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get subjects for exam
	{
		on: Action.getSubjectsForExamRequest,
		reducer: state => ({
			...state,
			getSubjectsExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsForExamSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsExamStatus: STATUS.SUCCESS,
			subjects: action.payload,
		}),
	},
	{
		on: Action.getSubjectsForExamFailure,
		reducer: state => ({
			...state,
			getSubjectsExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get total question
	{
		on: Action.getTotalQuestionRequest,
		reducer: state => ({
			...state,
			getTotalQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotalQuestionSuccess,
		reducer: (state, action) => ({
			...state,
			getTotalQuestionStatus: STATUS.SUCCESS,
			totalQuestion: action.payload,
		}),
	},
	{
		on: Action.getTotalQuestionFailure,
		reducer: state => ({
			...state,
			getTotalQuestionStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list exam
	{
		on: Action.getExamsRequest,
		reducer: state => ({
			...state,
			getExamsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getExamsSuccess,
		reducer: (state, action) => ({
			...state,
			getExamsStatus: STATUS.SUCCESS,
			exams: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getExamsFailure,
		reducer: state => ({
			...state,
			getExamsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail exam
	{
		on: Action.getDetailExamRequest,
		reducer: state => ({
			...state,
			getDetailExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailExamSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailExamStatus: STATUS.SUCCESS,
			detailExam: action.payload,
		}),
	},
	{
		on: Action.getDetailExamFailure,
		reducer: state => ({
			...state,
			getDetailExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get create exam
	{
		on: Action.createExamRequest,
		reducer: state => ({
			...state,
			createExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createExamSuccess,
		reducer: state => ({
			...state,
			createExamStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createExamFailure,
		reducer: state => ({
			...state,
			createExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get create exam auto
	{
		on: Action.createExamAutoRequest,
		reducer: state => ({
			...state,
			createExamAutoStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createExamAutoSuccess,
		reducer: state => ({
			...state,
			createExamAutoStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createExamAutoFailure,
		reducer: state => ({
			...state,
			createExamAutoStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get update exam
	{
		on: Action.updateExamRequest,
		reducer: state => ({
			...state,
			updateExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateExamSuccess,
		reducer: state => ({
			...state,
			updateExamStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateExamFailure,
		reducer: state => ({
			...state,
			updateExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get remove exam
	{
		on: Action.removeExamRequest,
		reducer: state => ({
			...state,
			removeExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeExamSuccess,
		reducer: state => ({
			...state,
			removeExamStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeExamFailure,
		reducer: state => ({
			...state,
			removeExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get auth password in exam
	{
		on: Action.authPasswordExamRequest,
		reducer: state => ({
			...state,
			authPasswordStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.authPasswordExamSuccess,
		reducer: state => ({
			...state,
			authPasswordStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.authPasswordExamFailure,
		reducer: state => ({
			...state,
			authPasswordStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('examPage', reducer, initialState);
