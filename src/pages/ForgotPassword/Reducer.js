import STATUS from '../../constands/apiStatus';
import Action from './Action';
import Redux from '../../utils/redux';

const { createReducers } = Redux;
const initialState = {
	statusForgotPassword: STATUS.DEFAULT,

};

const reducer = [

	// active when call action forgot password
	{
		on: Action.forgotPasswordRequest,
		reducer: state => ({
			...state,
			statusForgotPassword: STATUS.FETCHING,
		}),
	},
	{
		on: Action.forgotPasswordSuccess,
		reducer: (state) => {
			return {
				...state,
				statusForgotPassword: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.forgotPasswordFailure,
		reducer: state => ({
			...state,
			statusForgotPassword: STATUS.FAILURE,
		}),
	},


];
export default createReducers('forgotPasswordPage', reducer, initialState);
