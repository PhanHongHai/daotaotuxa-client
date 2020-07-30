import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	statusLogin: STATUS.DEFAULT,
	statusLogout: STATUS.DEFAULT,
	statusFetch: STATUS.DEFAULT,
	statusResetPassword:STATUS.DEFAULT,
	statusResendForgotPassword:STATUS.DEFAULT,
};

const reducer = [
	// active when call action login
	{
		on: Action.loginStudentRequest,
		reducer: state => ({
			...state,
			statusLogin: STATUS.FETCHING,
		}),
	},
	{
		on: Action.loginStudentSuccess,
		reducer: state => ({
			...state,
			statusLogin: STATUS.SUCCESS,
			isLogin: true,
		}),
	},
	{
		on: Action.loginStudentFailure,
		reducer: (state, action) => {
			const { payload } = action;
			return {
				...state,
				statusLogin: STATUS.FAILURE,
				isActived: payload,
			};
		},
	},
	// active when call action logout
	{
		on: Action.logoutStudentRequest,
		reducer: state => ({
			...state,
			statusLogout: STATUS.FETCHING,
		}),
	},
	{
		on: Action.logoutStudentSuccess,
		reducer: state => ({
			...state,
			statusLogout: STATUS.SUCCESS,
			isLogin: false,
		}),
	},
	{
		on: Action.logoutStudentFailure,
		reducer: state => ({
			...state,
			statusLogout: STATUS.FAILURE,
		}),
	},

	// active when call action  resend forgot password mail account
	{
		on: Action.resendForgotPasswordMailStudentRequest,
		reducer: state => ({
			...state,
			statusResendForgotPassword: STATUS.FETCHING,
		}),
	},
	{
		on: Action.resendForgotPasswordMailStudentSuccess,
		reducer: (state) => {
			return {
				...state,
				statusResendForgotPassword: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.resendForgotPasswordMailStudentFailure,
		reducer: state => ({
			...state,
			statusResendForgotPassword: STATUS.FAILURE,
		}),
	},
	// active when call action  reset password account
	{
		on: Action.resetPasswordStudentRequest,
		reducer: state => ({
			...state,
			statusResetPassword: STATUS.FETCHING,
		}),
	},
	{
		on: Action.resetPasswordStudentSuccess,
		reducer: (state) => {
			return {
				...state,
				statusResetPassword: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.resetPasswordStudentFailure,
		reducer: state => ({
			...state,
			statusResetPassword: STATUS.FAILURE,
		}),
	},
];
export default createReducers('loginStudentPage', reducer, initialState);
