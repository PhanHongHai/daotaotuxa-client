import { call, put } from 'redux-saga/effects';
import Redux from '../../utils/redux';
import ActiveAccountAction from './Action';
import AccountApi from '../../apis/Account';
import filterError from '../../utils/filterError';
import customMessage from '../../utils/customMessage';

const { createSagas } = Redux;

function* hanldeActiveAccount(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.activeAccount, req);
		if (!res.errors) {
			if (res.isActived) {
				yield put(ActiveAccountAction.activeAccountSuccess());
				if (cb && typeof cb === 'function') yield cb({ isRedirect: res.isActived });
				customMessage('message', 'warning', 'Tài khoản đã được kích hoạt');
			} else {
				yield put(ActiveAccountAction.activeAccountFailure());
			}
		} else {
			yield put(ActiveAccountAction.activeAccountFailure());
			filterError(res.errors);
		}
	} catch (error) {
		yield put(ActiveAccountAction.activeAccountFailure());
		customMessage('message', 'error', 'Kích hoạt tài khoản không thành công ! Xin thử lại');
	}
}

function* hanldeCheckActiveAccount(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.checkActiveAccount, req);
		if (!res.errors) {
			if (res.nonActive) {
				yield put(ActiveAccountAction.checkActiveAccountSuccess());
				if (cb && typeof cb === 'function') yield cb({ isRedirect: res.nonActive });
			} else {
				yield put(ActiveAccountAction.checkActiveAccountFailure());
				if (cb && typeof cb === 'function') yield cb({ isRedirect: res.nonActive });
			}
		} else filterError(res.errors);
	} catch (error) {
		yield put(ActiveAccountAction.checkActiveAccountFailure());
		customMessage('message', 'error', 'Kiểm tra tài khoản không thành công ! Xin thử lại');
	}
}

const activeAccountSaga = {
	on: ActiveAccountAction.activeAccountRequest,
	worker: hanldeActiveAccount,
};
const checkActiveAccountSaga = {
	on: ActiveAccountAction.checkActiveAccountRequest,
	worker: hanldeCheckActiveAccount,
};
export default createSagas([activeAccountSaga, checkActiveAccountSaga]);
