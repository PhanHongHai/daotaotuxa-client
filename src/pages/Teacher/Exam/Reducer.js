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
	detailExam: {},
	totalQuestion: {},
};

const reducer = [
	// active when call action get list question
	{
		on: Action.getQuestionsForExamTeacherRequest,
		reducer: state => ({
			...state,
			getQuestionsForExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getQuestionsForExamTeacherSuccess,
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
		on: Action.getQuestionsForExamTeacherFailure,
		reducer: state => ({
			...state,
			getQuestionsForExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list question for update exam
	{
		on: Action.getQuestionsForUpdateExamTeacherRequest,
		reducer: state => ({
			...state,
			getQuestionsForUpdateExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getQuestionsForUpdateExamTeacherSuccess,
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
		on: Action.getQuestionsForUpdateExamTeacherFailure,
		reducer: state => ({
			...state,
			getQuestionsForUpdateExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get total question
	{
		on: Action.getTotalQuestionTeacherRequest,
		reducer: state => ({
			...state,
			getTotalQuestionStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotalQuestionTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getTotalQuestionStatus: STATUS.SUCCESS,
			totalQuestion: action.payload,
		}),
	},
	{
		on: Action.getTotalQuestionTeacherFailure,
		reducer: state => ({
			...state,
			getTotalQuestionStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list exam
	{
		on: Action.getExamsTeacherRequest,
		reducer: state => ({
			...state,
			getExamsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getExamsTeacherSuccess,
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
		on: Action.getExamsTeacherFailure,
		reducer: state => ({
			...state,
			getExamsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail exam
	{
		on: Action.getDetailExamTeacherRequest,
		reducer: state => ({
			...state,
			getDetailExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailExamTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailExamStatus: STATUS.SUCCESS,
			detailExam: action.payload,
		}),
	},
	{
		on: Action.getDetailExamTeacherFailure,
		reducer: state => ({
			...state,
			getDetailExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get create exam
	{
		on: Action.createExamTeacherRequest,
		reducer: state => ({
			...state,
			createExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createExamTeacherSuccess,
		reducer: state => ({
			...state,
			createExamStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createExamTeacherFailure,
		reducer: state => ({
			...state,
			createExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get create exam auto
	{
		on: Action.createExamAutoTeacherRequest,
		reducer: state => ({
			...state,
			createExamAutoStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createExamAutoTeacherSuccess,
		reducer: state => ({
			...state,
			createExamAutoStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createExamAutoTeacherFailure,
		reducer: state => ({
			...state,
			createExamAutoStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get update exam
	{
		on: Action.updateExamTeacherRequest,
		reducer: state => ({
			...state,
			updateExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateExamTeacherSuccess,
		reducer: state => ({
			...state,
			updateExamStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateExamTeacherFailure,
		reducer: state => ({
			...state,
			updateExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get remove exam
	{
		on: Action.removeExamTeacherRequest,
		reducer: state => ({
			...state,
			removeExamStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeExamTeacherSuccess,
		reducer: state => ({
			...state,
			removeExamStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeExamTeacherFailure,
		reducer: state => ({
			...state,
			removeExamStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get auth password in exam
	{
		on: Action.authPasswordExamTeacherRequest,
		reducer: state => ({
			...state,
			authPasswordStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.authPasswordExamTeacherSuccess,
		reducer: state => ({
			...state,
			authPasswordStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.authPasswordExamTeacherFailure,
		reducer: state => ({
			...state,
			authPasswordStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('examPageTeacher', reducer, initialState);
