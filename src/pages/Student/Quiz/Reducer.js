import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getScheduleDetailStatus: STATUS.DEFAULT,
	submitTaskStatus: STATUS.DEFAULT,
	getExamByQuizStatus: STATUS.DEFAULT,
	scheduleDetail: {},
	examDetail: {},
};

const reducer = [
	// active when call action get schedule detail
	{
		on: Action.getScheduleDetailRequest,
		reducer: state => ({
			...state,
			getScheduleDetailStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getScheduleDetailSuccess,
		reducer: (state, action) => ({
			...state,
			getScheduleDetailStatus: STATUS.SUCCESS,
			scheduleDetail: action.payload,
		}),
	},
	{
		on: Action.getScheduleDetailFailure,
		reducer: state => {
			return {
				...state,
				getScheduleDetailStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get exam detail
	{
		on: Action.getExamDetailByQuizRequest,
		reducer: state => ({
			...state,
			getExamByQuizStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getExamDetailByQuizSuccess,
		reducer: (state, action) => ({
			...state,
			getExamByQuizStatus: STATUS.SUCCESS,
			examDetail: action.payload,
		}),
	},
	{
		on: Action.getExamDetailByQuizFailure,
		reducer: state => {
			return {
				...state,
				getExamByQuizStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action submit task
	{
		on: Action.submitTaskRequest,
		reducer: state => ({
			...state,
			submitTaskStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.submitTaskSuccess,
		reducer: state => ({
			...state,
			submitTaskStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.submitTaskFailure,
		reducer: state => {
			return {
				...state,
				submitTaskStatus: STATUS.FAILURE,
			};
		},
	},
];
export default createReducers('scheduleStudentPage', reducer, initialState);
