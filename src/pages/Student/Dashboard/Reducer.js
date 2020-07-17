import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getInfoClassStatus: STATUS.DEFAULT,
	getTimeKeepingOfStudentStatus: STATUS.DEFAULT,
	attendanceByStudentStatus: STATUS.DEFAULT,
	infoClass: {},
	timeKeeping: {},
};

const reducer = [
	// active when call action get info class by student
	{
		on: Action.getDetailOfClassByStudentRequest,
		reducer: state => ({
			...state,
			getInfoClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailOfClassByStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getInfoClassStatus: STATUS.SUCCESS,
			infoClass: action.payload,
		}),
	},
	{
		on: Action.getDetailOfClassByStudentFailure,
		reducer: state => {
			return {
				...state,
				getInfoClassStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get time keeping of student
	{
		on: Action.getTimeKeepingOfStudentRequest,
		reducer: state => ({
			...state,
			getTimeKeepingOfStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTimeKeepingOfStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getTimeKeepingOfStudentStatus: STATUS.SUCCESS,
			timeKeeping: action.payload,
		}),
	},
	{
		on: Action.getTimeKeepingOfStudentFailure,
		reducer: state => {
			return {
				...state,
				getTimeKeepingOfStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action attendance by student
	{
		on: Action.attendanceByStudentRequest,
		reducer: state => ({
			...state,
			attendanceByStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.attendanceByStudentSuccess,
		reducer: state => ({
			...state,
			attendanceByStudentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.attendanceByStudentFailure,
		reducer: state => {
			return {
				...state,
				attendanceByStudentStatus: STATUS.FAILURE,
			};
		},
	},
];

export default createReducers('dashboadStudentPage', reducer, initialState);
