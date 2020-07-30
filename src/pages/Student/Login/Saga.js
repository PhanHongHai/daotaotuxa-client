import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import LoginAction from './Action';
import AccountApi from '../../../apis/Account';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeLogin(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.loginStudent, req);
		if (!res.errors) {
			yield put(LoginAction.loginStudentSuccess());
			yield localStorage.setItem('token', res.token);
			if (cb && typeof cb === 'function') yield cb({ role: res.role });
			//	yield put(LoginAction.getProfileRequest({}));
		} else {
			yield put(LoginAction.loginStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(LoginAction.loginStudentFailure());
		message.error('Đăng nhập không thành công ! Xin thử lại');
	}
}
function* hanldeLogout() {
	try {
		yield put(LoginAction.logoutStudentSuccess());
		yield localStorage.clear();
		window.location.href('/hoc-vien');
	} catch (error) {
		yield put(LoginAction.logoutStudentFailure());
		message.error('Đăng xuất không thành công ! Xin thử lại');
	}
}

const loginSaga = {
	on: LoginAction.loginStudentRequest,
	worker: hanldeLogin,
};

const logoutSaga = {
	on: LoginAction.logoutStudentRequest,
	worker: hanldeLogout,
};

export default createSagas([loginSaga, logoutSaga,]);
