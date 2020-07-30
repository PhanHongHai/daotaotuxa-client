import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { loginStudentRequest, loginStudentSuccess, loginStudentFailure } = createAsyncAction(
	'loginStudent',
	'LOGIN_STUDENT',
);

const { logoutStudentRequest, logoutStudentSuccess, logoutStudentFailure } = createAsyncAction(
	'logoutStudent',
	'LOGOUT_STUDENT',
);

const {
	resendForgotPasswordMailStudentRequest,
	resendForgotPasswordMailStudentSuccess,
	resendForgotPasswordMailStudentFailure,
} = createAsyncAction('resendForgotPasswordMailStudent', 'RESEND_FORGOT_PASSWORD_MAIL_STUDENT');

const { resetPasswordStudentRequest, resetPasswordStudentSuccess, resetPasswordStudentFailure } = createAsyncAction(
	'resetPasswordStudent',
	'RESET_PASSWORD_STUDENT',
);

const Actions = {
	loginStudentRequest,
	loginStudentSuccess,
	loginStudentFailure,

	logoutStudentRequest,
	logoutStudentSuccess,
  logoutStudentFailure,
  
	resendForgotPasswordMailStudentRequest,
	resendForgotPasswordMailStudentSuccess,
  resendForgotPasswordMailStudentFailure,
  
	resetPasswordStudentRequest,
	resetPasswordStudentSuccess,
	resetPasswordStudentFailure,
};
export default Actions;
