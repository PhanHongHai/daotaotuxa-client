import { connect } from 'react-redux';
import Component from './Component';
import DashboardAction from './Action';

const mapStateToProps = state => ({
	getTotalsReportStatus: state.dashboardAdminPage.getTotalsReportStatus,
	getReportsAccountStatus: state.dashboardAdminPage.getReportsAccountStatus,
	totalsReport: state.dashboardAdminPage.totalsReport,
});

const mapDispatchToProps = {
	getTotalsReq: DashboardAction.getTotalsReportRequest,
	getReportsAccountReq: DashboardAction.getReportsAccountDashboardRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
