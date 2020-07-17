import Redux from '../../../utils/redux';
import STATUS from '../../../constands/apiStatus';
import Action from './Action';

const { createReducers } = Redux;

const initialState = {
	getInfoStudentStatus: STATUS.DEFAULT,
	getProfileStudentStatus: STATUS.DEFAULT,
	getSubjectProgressStudentStatus: STATUS.DEFAULT,
	infoStudent: {},
	profileStudent: [],
	subjectProgressOfStudent: [],
};

const reducer = [
	// active when call action get info student by teacher
	{
		on: Action.getInfoStudentByTeacherRequest,
		reducer: state => ({
			...state,
			getInfoStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getInfoStudentByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getInfoStudentStatus: STATUS.SUCCESS,
			infoStudent: action.payload,
		}),
	},
	{
		on: Action.getInfoStudentByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getInfoStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get profile student by teacher
	{
		on: Action.getProfileStudentByTeacherRequest,
		reducer: state => ({
			...state,
			getProfileStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getProfileStudentByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getProfileStudentStatus: STATUS.SUCCESS,
			profileStudent: action.payload,
		}),
	},
	{
		on: Action.getProfileStudentByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getProfileStudentStatus: STATUS.FAILURE,
			};
		},
	},
	// active when call action get subject progress of student by teacher
	{
		on: Action.getSubjectProgressStudentByTeacherRequest,
		reducer: state => ({
			...state,
			getSubjectProgressStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectProgressStudentByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectProgressStudentStatus: STATUS.SUCCESS,
			subjectProgressOfStudent: action.payload,
		}),
	},
	{
		on: Action.getSubjectProgressStudentByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getSubjectProgressStudentStatus: STATUS.FAILURE,
			};
		},
	},
];

export default createReducers('detailStudentOfTeacherPage', reducer, initialState);
