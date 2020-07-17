import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getInfoClassStatus: STATUS.DEFAULT,
  infoClass:{}
};

const reducer = [
	// active when call action get info class by teacher
	{
		on: Action.getInfoClassByTeacherRequest,
		reducer: state => ({
			...state,
			getInfoClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getInfoClassByTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getInfoClassStatus: STATUS.SUCCESS,
			infoClass: action.payload,
		}),
	},
	{
		on: Action.getInfoClassByTeacherFailure,
		reducer: state => {
			return {
				...state,
				getInfoClassStatus: STATUS.FAILURE,
			};
		},
	},

];

export default createReducers('dashboadTeacherPage', reducer, initialState);
