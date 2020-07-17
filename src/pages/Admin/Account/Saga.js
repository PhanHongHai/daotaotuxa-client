import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
// import

import Redux from '../../../utils/redux';
import AccountAction from './Action';
import AccountApi from '../../../apis/Account';
import AnalysisApi from '../../../apis/Analysis';
import ProfileApi from '../../../apis/Profile';
import { removeFile } from '../../../apis/apiUpload';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeSearchStudent(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearch, req);
		if (!res.errors) {
			yield put(AccountAction.searchStudentSuccess(res));
		} else {
			yield put(AccountAction.searchStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.searchStudentFailure());
		message.error('Lấy dữ liệu tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeSearchTeacher(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearch, req);
		if (!res.errors) {
			yield put(AccountAction.searchTeacherSuccess(res));
		} else {
			yield put(AccountAction.searchTeacherFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.searchTeacherFailure());
		message.error('Lấy dữ liệu tài khoản giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeSearchPartner(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearch, req);
		if (!res.errors) {
			yield put(AccountAction.searchPartnerSuccess(res));
		} else {
			yield put(AccountAction.searchPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.searchPartnerFailure());
		message.error('Lấy dữ liệu tài khoản đối tác không thành công ! Xin thử lại');
	}
}
function* hanldeGetDetailAccount(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(AccountApi.getDetailAccount, ID);
		if (!res.errors) {
			yield put(AccountAction.getDetailAccountSuccess(res));
		} else {
			yield put(AccountAction.getDetailAccountFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getDetailAccountFailure());
		message.error('Lấy dữ liệu tài khoản không thành công ! Xin thử lại');
	}
}
function* hanldeGetListStudent(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearch, req);
		if (!res.errors) {
			yield put(AccountAction.getListStudentSuccess(res));
		} else {
			yield put(AccountAction.getListStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getListStudentFailure());
		message.error('Lấy dữ liệu tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetListTeacher(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearch, req);
		if (!res.errors) {
			yield put(AccountAction.getListTeacherSuccess(res));
		} else {
			yield put(AccountAction.getListTeacherFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getListTeacherFailure());
		message.error('Lấy dữ liệu tài khoản giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetListStudentNotApprove(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearchAccountNotApprove, req);
		if (!res.errors) {
			yield put(AccountAction.getAccountNotApproveSuccess(res));
		} else {
			yield put(AccountAction.getAccountNotApproveFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getAccountNotApproveFailure());
		message.error('Lấy dữ liệu tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeGetListPartner(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountApi.getAndSearch, req);
		if (!res.errors) {
			yield put(AccountAction.getListPartnerSuccess(res));
		} else {
			yield put(AccountAction.getListPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getListPartnerFailure());
		message.error('Lấy dữ liệu tài khoản đối tác không thành công ! Xin thử lại');
	}
}
function* hanldeCreateStudent(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AccountApi.createStudent, req);
		if (!res.errors) {
			yield put(AccountAction.createStudentSuccess());
			yield put(
				AccountAction.getListStudentRequest({
					req: { limit: 10, page: 1, keyword: '', type: 'student' },
				}),
			);
			if (cb && typeof cb === 'function') cb({ isRedirect: true, msg: 'Thêm mới học viên thành công' });
		} else {
			yield put(AccountAction.createStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.createStudentFailure());
		message.error('Tạo tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeCreateTeacher(action) {
	try {
		const { req, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.createTeacher, req);
		if (!res.errors) {
			yield put(AccountAction.createTeacherSuccess());
			yield put(
				AccountAction.getListTeacherRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'teacher' },
				}),
			);
			if (cb && typeof cb === 'function') yield cb('Tạo giảng viên thành công');
		} else {
			yield put(AccountAction.createTeacherFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.createTeacherFailure());
		message.error('Tạo tài khoản giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeCreatePartner(action) {
	try {
		const { req, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.createPartner, req);
		if (!res.errors) {
			yield put(AccountAction.createPartnerSuccess());
			yield put(
				AccountAction.getListPartnerRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'partner' },
				}),
			);
			if (cb && typeof cb === 'function') yield cb('Tạo đối tác thành công');
		} else {
			yield put(AccountAction.createPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.createPartnerFailure());
		message.error('Tạo tài khoản đối tác không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateStudent(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(AccountApi.updateAccount, { req, ID });
		if (!res.errors) {
			yield put(AccountAction.updateStudentSuccess());
			yield put(
				AccountAction.getDetailAccountRequest({
					ID,
				}),
			);
			if (cb && typeof cb === 'function') cb({ msg: 'Cập nhật học viên thành công' });
		} else {
			yield put(AccountAction.updateStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.updateStudentFailure());
		message.error('Cập nhật tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeApproveStudent(action) {
	try {
		const { req, ID, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(AccountApi.updateAccount, { req, ID });
		if (!res.errors) {
			yield put(AccountAction.approveStudentSuccess());
			yield put(
				AccountAction.getAccountNotApproveRequest({
					req: {
						...pageCurrent,
						keyword,
					},
				}),
			);
			if (cb && typeof cb === 'function') cb({ isApproved: true, msg: 'Duyệt học viên thành công' });
		} else {
			yield put(AccountAction.approveStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.approveStudentFailure());
		message.error('Duyệt học viên không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateTeacher(action) {
	try {
		const { req, ID, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.updateAccount, { req, ID });
		if (!res.errors) {
			yield put(AccountAction.updateTeacherSuccess());
			yield put(
				AccountAction.getListTeacherRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'teacher' },
				}),
			);
			if (cb && typeof cb === 'function') cb('Cập nhật giảng viên thành công');
		} else {
			yield put(AccountAction.updateTeacherFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.updateTeacherFailure());
		message.error('Cập nhật tài khoản giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeUpdatePartner(action) {
	try {
		const { req, ID, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.updateAccount, { req, ID });
		if (!res.errors) {
			yield put(AccountAction.updatePartnerSuccess());
			yield put(
				AccountAction.getListPartnerRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'partner' },
				}),
			);
			if (cb && typeof cb === 'function') cb('Cập nhật đối tác thành công');
		} else {
			yield put(AccountAction.updatePartnerailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.updatePartnerailure());
		message.error('Cập nhật tài khoản đối tác không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteStudent(action) {
	try {
		const { ID, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.removeAccount, ID);
		if (!res.errors) {
			yield put(AccountAction.deleteStudentSuccess());
			yield put(
				AccountAction.getListStudentRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'student' },
				}),
			);
			if (cb && typeof cb === 'function') cb('Xóa học viên thành công');
		} else {
			yield put(AccountAction.deleteStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.deleteStudentFailure());
		message.error('Xóa tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeDeleteTeacher(action) {
	try {
		const { ID, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.removeAccount, ID);
		if (!res.errors) {
			yield put(AccountAction.deleteTeacherSuccess());
			yield put(
				AccountAction.getListTeacherRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'teacher' },
				}),
			);
			if (cb && typeof cb === 'function') cb('Xóa giảng viên thành công');
		} else {
			yield put(AccountAction.deleteTeacherFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.deleteTeacherFailure());
		message.error('Xóa tài khoản giảng viên không thành công ! Xin thử lại');
	}
}
function* hanldeDeletePartner(action) {
	try {
		const { ID, paginationData, keyword, cb } = action.payload;
		const res = yield call(AccountApi.removeAccount, ID);
		if (!res.errors) {
			yield put(AccountAction.deletePartnerSuccess());
			yield put(
				AccountAction.getListPartnerRequest({
					req: { limit: paginationData.limit, page: paginationData.page, keyword, type: 'partner' },
				}),
			);
			if (cb && typeof cb === 'function') cb('Xóa giảng viên thành công');
		} else {
			yield put(AccountAction.deletePartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.deletePartnerFailure());
		message.error('Xóa tài khoản đối tác không thành công ! Xin thử lại');
	}
}
function* hanldeGetProfileStudentByID(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(ProfileApi.getProfileStudentByID, ID);
		if (!res.errors) {
			yield put(AccountAction.getProfileStudentByIDSuccess(res));
		} else {
			yield put(AccountAction.getProfileStudentByIDFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getProfileStudentByIDFailure());
		message.error('Lấy dữ liệu hồ sơ học viên không thành công ! Xin thử lại');
	}
}
function* hanldeCreateProfileStudent(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(ProfileApi.createProfileStudent, req);
		if (!res.errors) {
			yield put(AccountAction.createProfileStudentSuccess());
			yield put(AccountAction.getProfileStudentByIDRequest({ ID: req && req.accountID }));
			if (cb && typeof cb === 'function') yield cb({ isCreated: true, msg: 'Thêm hồ sơ học viên thành công' });
		} else {
			yield put(AccountAction.createProfileStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.createProfileStudentFailure());
		message.error('Thêm hồ sơ học viên không thành công ! Xin thử lại');
	}
}
function* hanldeUpdateProfileStudent(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(ProfileApi.updateProfileStudent, { req, ID });
		if (!res.errors) {
			yield put(AccountAction.updateProfileStudentSuccess());
			yield put(AccountAction.getProfileStudentByIDRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isUpdated: true, msg: 'Cập nhật hồ sơ học viên thành công' });
		} else {
			yield put(AccountAction.updateProfileStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.updateProfileStudentFailure());
		message.error('Cập nhật hồ sơ học viên không thành công ! Xin thử lại');
	}
}
function* hanldeRemoveProfileStudent(action) {
	try {
		const { ID, cb, profileID } = action.payload;
		const res = yield call(ProfileApi.removeProfileStudent, profileID);
		if (!res.errors) {
			yield put(AccountAction.removeProfileStudentSuccess());
			yield put(AccountAction.getProfileStudentByIDRequest({ ID }));
			if (cb && typeof cb === 'function') yield cb({ isRemoved: true, msg: 'Xóa hồ sơ học viên thành công' });
		} else {
			yield put(AccountAction.removeProfileStudentFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.removeProfileStudentFailure());
		message.error('Xóa hồ sơ học viên không thành công ! Xin thử lại');
	}
}
function* hanldeRemoveFile(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(removeFile, req);
		if (!res.errors) {
			yield put(AccountAction.removeFileSuccess());
			if (cb && typeof cb === 'function') yield cb({ isRemoved: res.isRemoved });
		} else {
			yield put(AccountAction.removeFileFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.removeFileFailure());
		message.error('Xóa tệp vừa tải lên không thành công ! Xin thử lại');
	}
}

function* handleGetTotalsAllTime(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AnalysisApi.getTotalsDashboard, req);
		if (!res.errors) {
			yield put(AccountAction.getTotalsAllTimeSuccess(res));
		} else {
			yield put(AccountAction.getTotalsAllTimeFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getTotalsAllTimeFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetTotals30days(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AnalysisApi.getTotalsAccountByGroupDate, req);
		if (!res.errors) {
			yield put(AccountAction.getTotals30daysSuccess(res));
		} else {
			yield put(AccountAction.getTotals30daysFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getTotals30daysFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetReportAccountByGroupType(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AnalysisApi.getReportsAccount, req);
		if (!res.errors) {
			yield put(AccountAction.getReportAccountByGroupTypeSuccess());
			if (cb && typeof cb === 'function') yield cb({ data: res });
		} else {
			yield put(AccountAction.getReportAccountByGroupTypeFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getReportAccountByGroupTypeFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetReportUserSex(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AnalysisApi.getReportUserSex, req);
		if (!res.errors) {
			yield put(AccountAction.getReportSexSuccess(res));
		} else {
			yield put(AccountAction.getReportSexFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getReportSexFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleGetReportUserArea(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AnalysisApi.getReportUserArea, req);
		if (!res.errors) {
			yield put(AccountAction.getReportUserAreaSuccess());
			if (cb && typeof cb === 'function') yield cb({ data: res });
		} else {
			yield put(AccountAction.getReportUserAreaFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(AccountAction.getReportUserAreaFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

const searchStudentSaga = {
	on: AccountAction.searchStudentRequest,
	worker: hanldeSearchStudent,
};

const searchTeacherSaga = {
	on: AccountAction.searchTeacherRequest,
	worker: hanldeSearchTeacher,
};
const searchPartnerSaga = {
	on: AccountAction.searchPartnerRequest,
	worker: hanldeSearchPartner,
};

const getDetailAccountSaga = {
	on: AccountAction.getDetailAccountRequest,
	worker: hanldeGetDetailAccount,
};
const getStudentNotApproveSaga = {
	on: AccountAction.getAccountNotApproveRequest,
	worker: hanldeGetListStudentNotApprove,
};
const getStudentSaga = {
	on: AccountAction.getListStudentRequest,
	worker: hanldeGetListStudent,
};
const getTeacherSaga = {
	on: AccountAction.getListTeacherRequest,
	worker: hanldeGetListTeacher,
};
const getPartnerSaga = {
	on: AccountAction.getListPartnerRequest,
	worker: hanldeGetListPartner,
};
const createStudentSaga = {
	on: AccountAction.createStudentRequest,
	worker: hanldeCreateStudent,
};
const createTeacherSaga = {
	on: AccountAction.createTeacherRequest,
	worker: hanldeCreateTeacher,
};
const createPartnerSaga = {
	on: AccountAction.createPartnerRequest,
	worker: hanldeCreatePartner,
};
const updateStudentSaga = {
	on: AccountAction.updateStudentRequest,
	worker: hanldeUpdateStudent,
};
const approveStudentSaga = {
	on: AccountAction.approveStudentRequest,
	worker: hanldeApproveStudent,
};
const updateTeacherSaga = {
	on: AccountAction.updateTeacherRequest,
	worker: hanldeUpdateTeacher,
};
const updatePartnerSaga = {
	on: AccountAction.updatePartnerRequest,
	worker: hanldeUpdatePartner,
};
const deleteStudentSaga = {
	on: AccountAction.deleteStudentRequest,
	worker: hanldeDeleteStudent,
};
const deleteTeacherSaga = {
	on: AccountAction.deleteTeacherRequest,
	worker: hanldeDeleteTeacher,
};
const deletePartnerSaga = {
	on: AccountAction.deletePartnerRequest,
	worker: hanldeDeletePartner,
};

const getProfileStudentSaga = {
	on: AccountAction.getProfileStudentByIDRequest,
	worker: hanldeGetProfileStudentByID,
};
const updateProfileStudentSaga = {
	on: AccountAction.updateProfileStudentRequest,
	worker: hanldeUpdateProfileStudent,
};
const createProfileStudentSaga = {
	on: AccountAction.createProfileStudentRequest,
	worker: hanldeCreateProfileStudent,
};
const removeProfileStudentSaga = {
	on: AccountAction.removeProfileStudentRequest,
	worker: hanldeRemoveProfileStudent,
};
const removeFileSaga = {
	on: AccountAction.removeFileRequest,
	worker: hanldeRemoveFile,
};
const getTotalsAllTimeSaga = {
	on: AccountAction.getTotalsAllTimeRequest,
	worker: handleGetTotalsAllTime,
};
const getTotals30daysSaga = {
	on: AccountAction.getTotals30daysRequest,
	worker: handleGetTotals30days,
};
const getReportAccountGroupTypeSaga = {
	on: AccountAction.getReportAccountByGroupTypeRequest,
	worker: handleGetReportAccountByGroupType,
};
const getReportUserSexSaga = {
	on: AccountAction.getReportSexRequest,
	worker: handleGetReportUserSex,
};
const getReportUserAreaSaga = {
	on: AccountAction.getReportUserAreaRequest,
	worker: handleGetReportUserArea,
};

export default createSagas([
	getDetailAccountSaga,
	getStudentSaga,
	getTeacherSaga,
	getPartnerSaga,
	createStudentSaga,
	createTeacherSaga,
	createPartnerSaga,
	updateStudentSaga,
	updateTeacherSaga,
	updatePartnerSaga,
	deleteStudentSaga,
	deleteTeacherSaga,
	deletePartnerSaga,
	searchStudentSaga,
	searchTeacherSaga,
	searchPartnerSaga,
	getProfileStudentSaga,
	getStudentNotApproveSaga,
	createProfileStudentSaga,
	updateProfileStudentSaga,
	removeProfileStudentSaga,
	removeFileSaga,
	approveStudentSaga,
	getTotalsAllTimeSaga,
	getTotals30daysSaga,
	getReportAccountGroupTypeSaga,
	getReportUserSexSaga,
	getReportUserAreaSaga
]);
