import { call, put } from 'redux-saga/effects';
import Redux from '../../utils/redux';
import ResetPasswordAction from './Action';
import AccountApi from '../../apis/Account';
import filterError from '../../utils/filterError';
import customMessage from '../../utils/customMessage';

const { createSagas } = Redux;

function* hanldeResetPassword(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.resetPassword, req);
		if (!res.errors) {
			yield put(ResetPasswordAction.resetPasswordSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRedirect: res.isUpdated });
			customMessage('notification', 'success', 'Đổi mật khẩu thành công');
		} else {
			yield put(ResetPasswordAction.resetPasswordFailure());
			filterError(res.errors);
		}
	} catch (error) {
		yield put(ResetPasswordAction.resetPasswordFailure());
		customMessage('message', 'error', 'Đổi mật khẩu không thành công ! Xin thử lại');
	}
}

const resetPasswordSaga = {
	on: ResetPasswordAction.resetPasswordRequest,
	worker: hanldeResetPassword,
};

export default createSagas([resetPasswordSaga]);
