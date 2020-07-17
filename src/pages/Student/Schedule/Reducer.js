import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getScheduleOfClassStatus: STATUS.DEFAULT,
	scheduleOfClass: {
		data: [],
		pagination: {},
	},
};

const reducer = [
	// active when call action get detail class by studentID
	{
		on: Action.getDetailOfClassByStudentIDRequest,
		reducer: state => ({
			...state,
			getScheduleOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailOfClassByStudentIDSuccess,
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
		on: Action.getDetailOfClassByStudentIDFailure,
		reducer: state => {
			return {
				...state,
				getScheduleOfClassStatus: STATUS.FAILURE,
			};
		},
	},
];

export default createReducers('scheduleOfStudentPage', reducer, initialState);
