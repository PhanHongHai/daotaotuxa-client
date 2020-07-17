import { call, put } from 'redux-saga/effects';
import { message } from 'antd';

import Redux from '../../../utils/redux';
import DashboardAction from './Action';
import AnalysisAPI from '../../../apis/Analysis';
import filterError from '../../../utils/filterError';

const { createSagas } = Redux;

function* handleGetTotalsReport(action) {
	try {
		const { req } = action.payload;
		const res = yield call(AnalysisAPI.getTotalsDashboard, req);
		if (!res.errors) {
			yield put(DashboardAction.getTotalsReportSuccess(res));
		} else {
			yield put(DashboardAction.getTotalsReportFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(DashboardAction.getTotalsReportFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

function* handleGetReportAccount(action) {
	try {
		const { req, cb } = action.payload;
		const res = yield call(AnalysisAPI.getReportsAccount, req);
		if (!res.errors) {
			yield put(DashboardAction.getReportsAccountDashboardSuccess());
			if (cb && typeof cb === 'function') yield cb({ data: res });
		} else {
			yield put(DashboardAction.getReportsAccountDashboardFailure());
			filterError(res.errors, 'message');
		}
	} catch (error) {
		yield put(DashboardAction.getReportsAccountDashboardFailure());
		message.error('Lấy dữ liệu thống kê không thành công ! Xin thử lại');
	}
}

const getTotalsDashboardSaga = {
	on: DashboardAction.getTotalsReportRequest,
	worker: handleGetTotalsReport,
};

const getReportAccountSaga = {
	on: DashboardAction.getReportsAccountDashboardRequest,
	worker: handleGetReportAccount,
};

export default createSagas([getTotalsDashboardSaga, getReportAccountSaga]);
