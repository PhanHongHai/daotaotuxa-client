import { call, put } from 'redux-saga/effects';
import { message } from 'antd';
// import

import Redux from '../../../utils/redux';
import Action from './Action';
import AnalysisAPI from '../../../apis/Analysis';
import AccountAPI from '../../../apis/Account';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* hanldeGetStudents(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearchStudentByPartner, req);
		if (!res.errors) {
			yield put(Action.getStudentByPartnerSuccess(res));
		} else {
			yield put(Action.getStudentByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.getStudentByPartnerFailure());
		message.error('Lấy dữ liệu tài khoản học viên không thành công ! Xin thử lại');
	}
}

function* hanldeGetDetailStudent(action) {
	try {
		const { ID } = action.payload;
		const res = yield call(AccountAPI.getDetailAccount, ID);
		if (!res.errors) {
			yield put(Action.getDetailStudentByPartnerSuccess(res));
		} else {
			yield put(Action.getDetailStudentByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.getDetailStudentByPartnerFailure());
		message.error('Lấy dữ liệu tài khoản học viên không thành công ! Xin thử lại');
	}
}
function* hanldeSearchStudent(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AccountAPI.getAndSearchStudentByPartner, req);
		if (!res.errors) {
			yield put(Action.searchStudentByPartnerSuccess(res));
		} else {
			yield put(Action.searchStudentByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.searchStudentByPartnerFailure());
		message.error('Lấy dữ liệu tài khoản học viên không thành công ! Xin thử lại');
	}
}

function* hanldeCreateStudent(action) {
	try {
		const { req, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(AccountAPI.createStudent, req);
		if (!res.errors) {
			yield put(Action.createStudentByPartnerSuccess());
			yield put(Action.getStudentByPartnerRequest({ ...pageCurrent, keyword }));
			if (cb && typeof cb === 'function') cb({ isRedirect: true, msg: 'Thêm mới học viên thành công' });
		} else {
			yield put(Action.createStudentByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.createStudentByPartnerFailure());
		message.error('Tạo học viên không thành công ! Xin thử lại');
	}
}

function* hanldeUpdateStudent(action) {
	try {
		const { req, ID, cb } = action.payload;
		const res = yield call(AccountAPI.updateAccount, { req, ID });
		if (!res.errors) {
      yield put(Action.updateStudentByPartnerSuccess());
      yield put(Action.getDetailStudentByPartnerRequest({ID}));
			if (cb && typeof cb === 'function') cb({ msg: 'Cập nhật học viên thành công' });
		} else {
			yield put(Action.updateStudentByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.updateStudentByPartnerFailure());
		message.error('Cập nhật học viên không thành công ! Xin thử lại');
	}
}

function* hanldeDeleteStudent(action) {
	try {
		const { ID, pageCurrent, keyword, cb } = action.payload;
		const res = yield call(AccountAPI.updateAccount, ID);
		if (!res.errors) {
			yield put(Action.deleteStudentByPartnerSuccess());
      yield put(Action.getStudentByPartnerRequest({ ...pageCurrent, keyword }));
      if (cb && typeof cb === 'function') cb({ isRedirect: true, msg: 'Xóa học viên thành công' });
		} else {
			yield put(Action.deleteStudentByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.deleteStudentByPartnerFailure());
		message.error('Xóa học viên không thành công ! Xin thử lại');
	}
}
function* handleReportStudentGroupByDate(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AnalysisAPI.getReportStudentGroupDateByPartner, req);
		if (!res.errors) {
			yield put(Action.getReportStudentGroupDateByPartnerSuccess());
      if (cb && typeof cb === 'function') cb({ data: res});
		} else {
			yield put(Action.getReportStudentGroupDateByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.getReportStudentGroupDateByPartnerFailure());
		message.error('Lây dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleReportStudentGroupByArea(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AnalysisAPI.getReportStudentGroupAreaByPartner, req);
		if (!res.errors) {
			yield put(Action.getReportStudentGroupAreaByPartnerSuccess());
      if (cb && typeof cb === 'function') cb({ data: res});
		} else {
			yield put(Action.getReportStudentGroupAreaByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.getReportStudentGroupAreaByPartnerFailure());
		message.error('Lây dữ liệu thống kê không thành công ! Xin thử lại');
	}
}
function* handleReportStudentGroupByYear(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AnalysisAPI.getReportStudentGroupYearByPartner, req);
		if (!res.errors) {
			yield put(Action.getReportStudentGroupYearByPartnerSuccess());
      if (cb && typeof cb === 'function') cb({ data: res});
		} else {
			yield put(Action.getReportStudentGroupYearByPartnerFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(Action.getReportStudentGroupYearByPartnerFailure());
		message.error('Lây dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

const getStudentsSaga = {
	on: Action.getStudentByPartnerRequest,
	worker: hanldeGetStudents,
};

const getDetailStudentSaga = {
	on: Action.getDetailStudentByPartnerRequest,
	worker: hanldeGetDetailStudent,
};

const searchStudentSaga = {
	on: Action.searchStudentByPartnerRequest,
	worker: hanldeSearchStudent,
};

const createStudentSaga = {
	on: Action.createStudentByPartnerRequest,
	worker: hanldeCreateStudent,
};

const updateStudentSaga = {
	on: Action.updateStudentByPartnerRequest,
	worker: hanldeUpdateStudent,
};

const deleteStudentSaga = {
	on: Action.deleteStudentByPartnerRequest,
	worker: hanldeDeleteStudent,
};

const getReportStudentGroupByDateSaga = {
	on: Action.getReportStudentGroupDateByPartnerRequest,
	worker: handleReportStudentGroupByDate,
};

const getReportStudentGroupByAreaSaga = {
	on: Action.getReportStudentGroupAreaByPartnerRequest,
	worker: handleReportStudentGroupByArea,
};

const getReportStudentGroupByYearSaga = {
	on: Action.getReportStudentGroupYearByPartnerRequest,
	worker: handleReportStudentGroupByYear,
};

export default createSagas([
  getStudentsSaga,
	getDetailStudentSaga,
	getReportStudentGroupByDateSaga,
	getReportStudentGroupByAreaSaga,
	getReportStudentGroupByYearSaga,
	searchStudentSaga,
	createStudentSaga,
	updateStudentSaga,
	deleteStudentSaga,
]);
