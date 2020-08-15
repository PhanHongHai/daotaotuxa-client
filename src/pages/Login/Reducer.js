import STATUS from '../../constands/apiStatus';
import Action from './Action';
import Redux from '../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	statusLogin: STATUS.DEFAULT,
	statusLogout: STATUS.DEFAULT,
	statusFetch: STATUS.DEFAULT,
	statusActive: STATUS.DEFAULT,
	statusResetPassword:STATUS.DEFAULT,
	statusResendActiveMail: STATUS.DEFAULT,
	statusResendForgotPassword:STATUS.DEFAULT,
	isActived: true,
	profileUser: {},
};

const reducer = [
	// active when call action login
	{
		on: Action.loginRequest,
		reducer: state => ({
			...state,
			statusLogin: STATUS.FETCHING,
		}),
	},
	{
		on: Action.loginSuccess,
		reducer: state => ({
			...state,
			statusLogin: STATUS.SUCCESS,
			isLogin: true,
		}),
	},
	{
		on: Action.loginFailure,
		reducer: (state, action) => {
			const { payload } = action;
			return {
				...state,
				statusLogin: STATUS.FAILURE,
				isActived: payload,
			};
		},
	},
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
		on: Action.logoutRequest,
		reducer: state => ({
			...state,
			statusLogout: STATUS.FETCHING,
		}),
	},
	{
		on: Action.logoutSuccess,
		reducer: state => ({
			...state,
			statusLogout: STATUS.SUCCESS,
			isLogin: false,
		}),
	},
	{
		on: Action.logoutFailure,
		reducer: state => ({
			...state,
			statusLogout: STATUS.FAILURE,
		}),
	},
	// active when call action get profile
	{
		on: Action.getProfileRequest,
		reducer: state => ({
			...state,
			statusFetch: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getProfileSuccess,
		reducer: (state, action) => {
			const { payload } = action;
			return {
				...state,
				statusFetch: STATUS.SUCCESS,
				profileUser: payload,
			};
		},
	},
	{
		on: Action.getProfileFailure,
		reducer: state => ({
			...state,
			statusFetch: STATUS.FAILURE,
		}),
	},
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
		reducer: (state, action) => {
			const { payload } = action;
			return {
				...state,
				statusActive: STATUS.SUCCESS,
				isActived: payload,
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
	// active when call action  resend active mail account
	{
		on: Action.resendActiveMailRequest,
		reducer: state => ({
			...state,
			statusResendActiveMail: STATUS.FETCHING,
		}),
	},
	{
		on: Action.resendActiveMailSuccess,
		reducer: (state) => {
			return {
				...state,
				statusResendActiveMail: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.resendActiveMailFailure,
		reducer: state => ({
			...state,
			statusResendActiveMail: STATUS.FAILURE,
		}),
	},
	// active when call action  resend forgot password mail account
	{
		on: Action.resendForgotPasswordMailRequest,
		reducer: state => ({
			...state,
			statusResendForgotPassword: STATUS.FETCHING,
		}),
	},
	{
		on: Action.resendForgotPasswordMailSuccess,
		reducer: (state) => {
			return {
				...state,
				statusResendForgotPassword: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.resendForgotPasswordMailFailure,
		reducer: state => ({
			...state,
			statusResendForgotPassword: STATUS.FAILURE,
		}),
	},
	// active when call action  reset password account
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
export default createReducers('loginPage', reducer, initialState);
