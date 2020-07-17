import STATUS from '../../constands/apiStatus';
import Action from './Action';
import Redux from '../../utils/redux';

const { createReducers } = Redux;
const initialState = {

	statusResetPassword: STATUS.DEFAULT,
};

const reducer = [

	// active when call action reset password
	{
		on: Action.resetPasswordRequest,
		reducer: state => ({
			...state,
			statusResetPassword: STATUS.FETCHING,
		}),
	},
	{
		on: Action.resetPasswordSuccess,
		reducer: (state) => {
			return {
				...state,
				statusResetPassword: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.resetPasswordFailure,
		reducer: state => ({
			...state,
			statusResetPassword: STATUS.FAILURE,
		}),
	},

];
export default createReducers('resetPasswordPage', reducer, initialState);
