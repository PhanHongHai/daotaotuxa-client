import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
import Redux from '../../../utils/redux';
import SettingAction from './Action';
import RuleAPI from '../../../apis/Rule';
import AccountAPI from '../../../apis/Account';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeGetGroupRuleSubAdmin(action) {
	try {
		const { ID, cb } = action.payload;
		const res = yield call(RuleAPI.getGroupRuleByID, ID);
		if (!res.errors) {
			yield put(SettingAction.getGroupRuleByAccountIDSuccess(res));
			if (cb && typeof cb === 'function') yield cb({ isOpen: true });
		} else {
			yield put(SettingAction.getGroupRuleByAccountIDFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SettingAction.getGroupRuleByAccountIDFailure());
		message.error('Lấy danh sách quyền của nhân viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetRule(action) {
	try {
		const { req } = action.payload;
		const res = yield call(RuleAPI.getRules, req);
		if (!res.errors) {
			yield put(SettingAction.getRulesSuccess(res));
		} else {
			yield put(SettingAction.getRulesFailure());
			filterError(res.errors, 'notification');
		}
	} catch (error) {
		yield put(SettingAction.getRulesFailure());
		message.error('Lấy danh sách quyền không thành công ! Xin thử lại');
	}
}

function* hanldeGetSubAdmin(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearch, req);
		if (!res.errors) {
			yield put(SettingAction.getSubAdminSuccess(res));
		} else {
			yield put(SettingAction.getSubAdminFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SettingAction.getSubAdminFailure());
		message.error('Lấy danh sách nhân viên không thành công ! Xin thử lại');
	}
}
function* hanldeSearchtSubAdmin(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearch, req);
		if (!res.errors) {
			yield put(SettingAction.searchSubAdminSuccess(res));
		} else {
			yield put(SettingAction.searchSubAdminFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SettingAction.searchSubAdminFailure());
		message.error('Tìm kiếm nhân viên không thành công ! Xin thử lại');
	}
}
function* hanldeCreateSubAdmin(action) {
	try {
		const { req, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(AccountAPI.createEmployment, req);
		if (!res.errors) {
			yield put(SettingAction.createSubAdminSuccess());
			if (cb && typeof cb === 'function') yield cb('Thêm nhân viên thành công');
			yield put(
				SettingAction.getSubAdminRequest({
					req: { limit: pageCurrent.limit, page: pageCurrent.page, keyword, type: 'employment' },
				}),
			);
		} else {
			yield put(SettingAction.createSubAdminFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SettingAction.createSubAdminFailure());
		message.error('Tạo nhân viên không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateSubAdmin(action) {
	try {
		const { req, cb, ID, pageCurrent, keyword } = action.payload;
		const res = yield call(AccountAPI.updateAccount, { ID, req });
		if (!res.errors) {
			yield put(SettingAction.updateSubAdminSuccess());
			if (cb && typeof cb === 'function') yield cb('Cập nhật nhân viên thành công');
			yield put(
				SettingAction.getSubAdminRequest({
					req: { limit: pageCurrent.limit, page: pageCurrent.page, keyword, type: 'employment' },
				}),
			);
		} else {
			yield put(SettingAction.updateSubAdminFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SettingAction.updateSubAdminFailure());
		message.error('Cập nhật nhân viên không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteSubAdmin(action) {
	try {
		const { ID, cb, pageCurrent, keyword } = action.payload;
		const res = yield call(AccountAPI.removeAccount, ID);
		if (!res.errors) {
			yield put(SettingAction.deleteSubAdminSuccess());
			yield put(
				SettingAction.getSubAdminRequest({
					req: { limit: pageCurrent.limit, page: pageCurrent.page, keyword, type: 'employment' },
				}),
			);
			if (cb && typeof cb === 'function') yield cb({ isDeleted: true, msg: 'Xóa nhân viên thành công' });
		} else {
			yield put(SettingAction.deleteSubAdminFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SettingAction.deleteSubAdminFailure());
		message.error('Xóa nhân viên không thành công ! Xin thử lại');
	}
}
function* hanldeDecentralizationSubAdmin(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(RuleAPI.decentralization, req);
		if (!res.errors) {
			yield put(SettingAction.decentralizationSubAdminSuccess());
			yield put(SettingAction.getGroupRuleByAccountIDRequest({ ID: req.accountID }));
			if (cb && typeof cb === 'function') yield cb('Phân quyền quản trị viên thành công');
		} else {
			yield put(SettingAction.decentralizationSubAdminFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(SettingAction.decentralizationSubAdminFailure());
		message.error('Phân quyền quản trị viên không thành công ! Xin thử lại');
	}
}

const decentralizationSubAdminSaga = {
	on: SettingAction.decentralizationSubAdminRequest,
	worker: hanldeDecentralizationSubAdmin,
};
const getGroupRuleByIDSaga = {
	on: SettingAction.getGroupRuleByAccountIDRequest,
	worker: hanldeGetGroupRuleSubAdmin,
};
const getListRuleSaga = {
	on: SettingAction.getRulesRequest,
	worker: hanldeGetRule,
};

const getListSubAdminSaga = {
	on: SettingAction.getSubAdminRequest,
	worker: hanldeGetSubAdmin,
};

const searchSubAdminSaga = {
	on: SettingAction.searchSubAdminRequest,
	worker: hanldeSearchtSubAdmin,
};

const createSubAdminSaga = {
	on: SettingAction.createSubAdminRequest,
	worker: hanldeCreateSubAdmin,
};

const updateSubAdminSaga = {
	on: SettingAction.updateSubAdminRequest,
	worker: hanldeUpdateSubAdmin,
};

const deleteSubAdminSaga = {
	on: SettingAction.deleteSubAdminRequest,
	worker: hanldeDeleteSubAdmin,
};

export default createSagas([
	getListRuleSaga,
	getListSubAdminSaga,
	searchSubAdminSaga,
	createSubAdminSaga,
	updateSubAdminSaga,
	deleteSubAdminSaga,
	getGroupRuleByIDSaga,
	decentralizationSubAdminSaga,
]);
