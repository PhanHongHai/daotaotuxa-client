import Redux from '../../utils/redux';

const { createAsyncAction } = Redux;

const { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } = createAsyncAction(
	'resetPassword',
	'RESET_PASSWORD',
);
const Actions = {

	resetPasswordRequest,
	resetPasswordSuccess,
	resetPasswordFailure,
};
export default Actions;
