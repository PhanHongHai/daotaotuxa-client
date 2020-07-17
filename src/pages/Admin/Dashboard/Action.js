import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getTotalsReportRequest, getTotalsReportSuccess, getTotalsReportFailure } = createAsyncAction(
	'getTotalsReport',
	'GET_TOTAL_REPORT',
);

const {
	getReportsAccountDashboardRequest,
	getReportsAccountDashboardSuccess,
	getReportsAccountDashboardFailure,
} = createAsyncAction('getReportsAccountDashboard', 'GET_REPORTS_ACCOUNT_DASHBOARD');

const Actions = {
	getTotalsReportRequest,
	getTotalsReportSuccess,
	getTotalsReportFailure,

	getReportsAccountDashboardRequest,
	getReportsAccountDashboardSuccess,
	getReportsAccountDashboardFailure,
};

export default Actions;
