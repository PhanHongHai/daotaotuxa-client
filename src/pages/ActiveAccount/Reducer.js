import STATUS from '../../constands/apiStatus';
import Action from './Action';
import Redux from '../../utils/redux';

const { createReducers } = Redux;
const initialState = {
	statusActive: STATUS.DEFAULT,
	statusCheckActive: STATUS.DEFAULT,
};

const reducer = [

	// active when call action active account
	{
		on: Action.activeAccountRequest,
		reducer: state => ({
			...state,
			statusActive: STATUS.FETCHING,
		}),
	},
	{
		on: Action.activeAccountSuccess,
		reducer: (state) => {
			return {
				...state,
				statusActive: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.activeAccountFailure,
		reducer: state => ({
			...state,
			statusActive: STATUS.FAILURE,
		}),
	},
	// active when call action check active account
	{
		on: Action.checkActiveAccountRequest,
		reducer: state => ({
			...state,
			statusCheckActive: STATUS.FETCHING,
		}),
	},
	{
		on: Action.checkActiveAccountSuccess,
		reducer: (state) => {
			return {
				...state,
				statusCheckActive: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.checkActiveAccountFailure,
		reducer: state => ({
			...state,
			statusCheckActive: STATUS.FAILURE,
		}),
	},

];
export default createReducers('activeAccountPage', reducer, initialState);
