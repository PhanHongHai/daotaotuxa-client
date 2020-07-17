import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../utils/redux';
import ProfileAccountAction from './Action';
import AccountApi from '../../apis/Account';
import RuleApi from '../../apis/Rule';
import { removeFile } from '../../apis/apiUpload';
import filterError from '../../utils/filterError';

import LoginAction from '../Login/Action';

const { createSagas } = Redux;

function* hanldeGetRules(action) {
	try {
		const { req } = action.payload;
		const res = yield call(RuleApi.getRules, req);
		if (!res.errors) {
			yield put(ProfileAccountAction.getRuleAllSuccess(res));
		} else {
			yield put(ProfileAccountAction.getRuleAllFailure());
			filterError(res.error, 'message');
		}
	} catch (error) {
		yield put(ProfileAccountAction.getRuleAllFailure());
		message.error('Lấy danh sách quyền không thành công ! Xin thử lại');
	}
}

function* hanldeGetRuleByAccount(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(RuleApi.getGroupRuleByAccount, ID);
		if (!res.errors) {
			yield put(ProfileAccountAction.getRuleOfAccountSuccess(res));
		} else {
			yield put(ProfileAccountAction.getRuleOfAccountFailure());
			filterError(res.error, 'message');
		}
	} catch (error) {
		yield put(ProfileAccountAction.getRuleOfAccountFailure());
		message.error('Lấy danh sách quyền tài khoản không thành công ! Xin thử lại');
	}
}

function* hanldeUpdateInfo(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.updateProfile, req);
		if (!res.errors) {
			yield put(ProfileAccountAction.updateProfileSuccess());
			yield put(LoginAction.getProfileRequest({ req: {} }));
			if (cb && typeof cb === 'function') yield cb({ msg: 'Cập nhật thông tin thành công' });
		} else {
			yield put(ProfileAccountAction.updateProfileFailure());
			filterError(res.error, 'message');
		}
	} catch (error) {
		yield put(ProfileAccountAction.updateProfileFailure());
		message.error('Cập nhật tài khoản không thành công ! Xin thử lại');
	}
}
function* hanldeChangePassword(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.changePassword, req);
		if (!res.errors) {
			yield put(ProfileAccountAction.updateProfileSuccess());
			if (cb && typeof cb === 'function') yield cb({ msg: 'Cập nhật thông tin thành công' });
		} else {
			yield put(ProfileAccountAction.updateProfileFailure());
			filterError(res.error, 'message');
		}
	} catch (error) {
		yield put(ProfileAccountAction.updateProfileFailure());
		message.error('Cập nhật tài khoản không thành công ! Xin thử lại');
	}
}
function* hanldeRemoveFile(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(removeFile, req);
		if (!res.errors) {
			yield put(ProfileAccountAction.removeFileAvatarSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRemoved: res.isRemoved });
		} else {
			yield put(ProfileAccountAction.removeFileAvatarFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(ProfileAccountAction.removeFileAvatarFailure());
		message.error('Xóa tệp vừa tải lên không thành công ! Xin thử lại');
	}
}

const getRulesSaga = {
	on: ProfileAccountAction.getRuleAllRequest,
	worker: hanldeGetRules,
};
const getRuleByAccountSaga = {
	on: ProfileAccountAction.getRuleOfAccountRequest,
	worker: hanldeGetRuleByAccount,
};
const updateInfoSaga = {
	on: ProfileAccountAction.updateProfileRequest,
	worker: hanldeUpdateInfo,
};
const changePasswordSaga = {
	on: ProfileAccountAction.changePasswordRequest,
	worker: hanldeChangePassword,
};
const removeFileAvatarSaga = {
	on: ProfileAccountAction.removeFileAvatarRequest,
	worker: hanldeRemoveFile,
};

export default createSagas([
	getRulesSaga,
	getRuleByAccountSaga,
	updateInfoSaga,
	changePasswordSaga,
	removeFileAvatarSaga,
]);
