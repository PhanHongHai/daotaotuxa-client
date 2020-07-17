import { call, put } from 'redux-saga/effects';
import Redux from '../../utils/redux';
import ForgotPasswordAction from './Action';
import AccountApi from '../../apis/Account';
import filterError from '../../utils/filterError';
import customMessage from '../../utils/customMessage';

const { createSagas } = Redux;

function* hanldeForgotPassword(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.resendForgotPasswordMail, req);
		if (!res.errors) {
			yield put(ForgotPasswordAction.forgotPasswordSuccess());
			customMessage('message', 'success', 'Gửi yêu cầu thành công');
		} else {
			yield put(ForgotPasswordAction.forgotPasswordFailure());
			filterError(res.errors);
		}
	} catch (error) {
		yield put(ForgotPasswordAction.forgotPasswordFailure());
		customMessage('message', 'error', 'Gửi yêu cầu không thành công ! Xin thử lại');
	}
}

const forgotPasswordSaga = {
	on: ForgotPasswordAction.forgotPasswordRequest,
	worker: hanldeForgotPassword,
};

export default createSagas([forgotPasswordSaga]);
