import Redux from '../../utils/redux';

const { createAsyncAction } = Redux;

const { loginRequest, loginSuccess, loginFailure } = createAsyncAction('login', 'LOGIN');

const { loginStudentRequest, loginStudentSuccess, loginStudentFailure } = createAsyncAction(
	'loginStudent',
	'LOGIN_STUDENT',
);
const { logoutRequest, logoutSuccess, logoutFailure } = createAsyncAction('logout', 'LOGOUT');

const { getProfileRequest, getProfileSuccess, getProfileFailure } = createAsyncAction('getProfile', 'GET_PROFILE');

const { resendActiveMailRequest, resendActiveMailSuccess, resendActiveMailFailure } = createAsyncAction(
	'resendActiveMail',
	'RESEND_ACTIVE_MAIL',
);
const {
	resendForgotPasswordMailRequest,
	resendForgotPasswordMailSuccess,
	resendForgotPasswordMailFailure,
} = createAsyncAction('resendForgotPasswordMail', 'RESEND_FORGOT_PASSWORD_MAIL');

const { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } = createAsyncAction(
	'resetPassword',
	'RESET_PASSWORD',
);

const Actions = {
	loginRequest,
	loginSuccess,
	loginFailure,

	loginStudentRequest,
	loginStudentSuccess,
	loginStudentFailure,

	logoutRequest,
	logoutSuccess,
	logoutFailure,

	getProfileRequest,
	getProfileSuccess,
	getProfileFailure,

	resendActiveMailRequest,
	resendActiveMailSuccess,
	resendActiveMailFailure,

	resendForgotPasswordMailRequest,
	resendForgotPasswordMailSuccess,
	resendForgotPasswordMailFailure,

	resetPasswordRequest,
	resetPasswordSuccess,
	resetPasswordFailure,
};
export default Actions;
