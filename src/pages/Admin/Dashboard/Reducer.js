import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getTotalsReportStatus: STATUS.DEFAULT,
	getReportsAccountStatus: STATUS.DEFAULT,
	totalsReport: {},
};

const reducer = [
	// active when call action get totals report
	{
		on: Action.getTotalsReportRequest,
		reducer: state => ({
			...state,
			getTotalsReportStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotalsReportSuccess,
		reducer: (state, action) => ({
			...state,
			getTotalsReportStatus: STATUS.SUCCESS,
			totalsReport: action.payload,
		}),
	},
	{
		on: Action.getTotalsReportFailure,
		reducer: state => ({
			...state,
			getTotalsReportStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get total reports account
	{
		on: Action.getReportsAccountDashboardRequest,
		reducer: state => ({
			...state,
			getReportsAccountStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportsAccountDashboardSuccess,
		reducer: (state) => ({
			...state,
			getReportsAccountStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportsAccountDashboardFailure,
		reducer: state => ({
			...state,
			getReportsAccountStatus: STATUS.FAILURE,
		}),
	},
];

export default createReducers('dashboardAdminPage', reducer, initialState);
