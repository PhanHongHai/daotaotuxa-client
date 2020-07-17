import Redux from '../../utils/redux';

const { createAsyncAction } = Redux;

const { forgotPasswordRequest, forgotPasswordSuccess, forgotPasswordFailure } = createAsyncAction(
	'forgotPassword',
	'FORGET_PASSWORD',
);

const Actions = {
	forgotPasswordRequest,
	forgotPasswordSuccess,
	forgotPasswordFailure,

};
export default Actions;
