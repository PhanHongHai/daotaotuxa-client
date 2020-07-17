import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../utils/redux';
import LoginAction from './Action';
import AccountApi from '../../apis/Account';
import filterError from '../../utils/filterError';

const { createSagas } = Redux;

function* hanldeLogin(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.login, req);
		if (!res.errors) {
			if (!res.isActived && !res.token) {
				yield put(LoginAction.loginFailure(res.isActived));
				message.warning('Tài khoản chưa được kích hoạt ');
			} else {
				yield put(LoginAction.loginSuccess());
				yield localStorage.setItem('token', res.token);
				if (cb && typeof cb === 'function') yield cb({ role: res.role });
				//	yield put(LoginAction.getProfileRequest({}));
			}
		} else {
			yield put(LoginAction.loginFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(LoginAction.loginFailure());
		message.error('Đăng nhập không thành công ! Xin thử lại');
	}
}
function* hanldeLogout() {
	try {
		yield put(LoginAction.logoutSuccess());
		yield localStorage.clear();
		window.location.href('/login');
	} catch (error) {
		yield put(LoginAction.logoutFailure());
		message.error('Đăng xuất không thành công ! Xin thử lại');
	}
}
function* handleFetch(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.getProfile, req);
		if (!res.errors) {
			yield put(LoginAction.getProfileSuccess(res));
			if (cb && typeof cb === 'function') yield cb({ role: res.role });
			yield localStorage.setItem('role', res.role);
		} else {
			yield put(LoginAction.getProfileFailure());
			if (cb && typeof cb === 'function') yield cb({ isRedirect: true });
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(LoginAction.getProfileFailure());
		message.error('Lấy thông tin người dùng không thành công ! Xin thử lại');
	}
}
function* handleResendActiveAccountMail(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.resendActiveAccountMail, req);
		if (!res.errors) {
			yield put(LoginAction.resendActiveMailSuccess());
			message.success('Gửi yêu cầu kích hoạt tài khoản thành công ! Xin kiểm tra email');
		} else {
			yield put(LoginAction.resendActiveMailFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(LoginAction.resendActiveMailFailure());
		message.error('Gửi yêu cầu kích hoạt tài khoản không thành công ! Xin thử lại');
	}
}

const loginSaga = {
	on: LoginAction.loginRequest,
	worker: hanldeLogin,
};

const logoutSaga = {
	on: LoginAction.logoutRequest,
	worker: hanldeLogout,
};

const resendActiveAccountSaga = {
	on: LoginAction.resendActiveMailRequest,
	worker: handleResendActiveAccountMail,
};

const fetchSaga = {
	on: LoginAction.getProfileRequest,
	worker: handleFetch,
};
export default createSagas([loginSaga, logoutSaga, fetchSaga, resendActiveAccountSaga]);
