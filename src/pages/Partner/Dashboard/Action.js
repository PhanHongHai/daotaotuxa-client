import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getStudentByPartnerRequest, getStudentByPartnerSuccess, getStudentByPartnerFailure } = createAsyncAction(
	'getStudentByPartner',
	'GET_STUDENT_BY_PARTNER',
);

const {
	getReportStudentGroupDateByPartnerRequest,
	getReportStudentGroupDateByPartnerSuccess,
	getReportStudentGroupDateByPartnerFailure,
} = createAsyncAction('getReportStudentGroupDateByPartner', 'GET_REPORT_STUDENT_GROUP_DATE_BY_PARTNER');

const {
	getReportStudentGroupYearByPartnerRequest,
	getReportStudentGroupYearByPartnerSuccess,
	getReportStudentGroupYearByPartnerFailure,
} = createAsyncAction('getReportStudentGroupYearByPartner', 'GET_REPORT_STUDENT_GROUP_YEAR_BY_PARTNER');

const {
	getReportStudentGroupAreaByPartnerRequest,
	getReportStudentGroupAreaByPartnerSuccess,
	getReportStudentGroupAreaByPartnerFailure,
} = createAsyncAction('getReportStudentGroupAreaByPartner', 'GET_REPORT_STUDENT_GROUP_AREA_BY_PARTNER');

const {
	getDetailStudentByPartnerRequest,
	getDetailStudentByPartnerSuccess,
	getDetailStudentByPartnerFailure,
} = createAsyncAction('getDetailStudentByPartner', 'GET_DETAIL_STUDENT_BY_PARTNER');
const {
	searchStudentByPartnerRequest,
	searchStudentByPartnerSuccess,
	searchStudentByPartnerFailure,
} = createAsyncAction('searchStudentByPartner', 'SEARCH_STUDENT_BY_PARTNER');
const {
	createStudentByPartnerRequest,
	createStudentByPartnerSuccess,
	createStudentByPartnerFailure,
} = createAsyncAction('createStudentByPartner', 'CREATE_STUDENT_BY_PARTNER');
const {
	updateStudentByPartnerRequest,
	updateStudentByPartnerSuccess,
	updateStudentByPartnerFailure,
} = createAsyncAction('updateStudentByPartner', 'UPDATE_STUDENT_BY_PARTNER');
const {
	deleteStudentByPartnerRequest,
	deleteStudentByPartnerSuccess,
	deleteStudentByPartnerFailure,
} = createAsyncAction('deleteStudentByPartner', 'DELETE_STUDENT_BY_PARTNER');

const Action = {
	getStudentByPartnerRequest,
	getStudentByPartnerSuccess,
	getStudentByPartnerFailure,

	getReportStudentGroupDateByPartnerRequest,
	getReportStudentGroupDateByPartnerSuccess,
	getReportStudentGroupDateByPartnerFailure,

	getReportStudentGroupYearByPartnerRequest,
	getReportStudentGroupYearByPartnerSuccess,
	getReportStudentGroupYearByPartnerFailure,

	getReportStudentGroupAreaByPartnerRequest,
	getReportStudentGroupAreaByPartnerSuccess,
	getReportStudentGroupAreaByPartnerFailure,

	getDetailStudentByPartnerRequest,
	getDetailStudentByPartnerSuccess,
	getDetailStudentByPartnerFailure,

	searchStudentByPartnerRequest,
	searchStudentByPartnerSuccess,
	searchStudentByPartnerFailure,

	createStudentByPartnerRequest,
	createStudentByPartnerSuccess,
	createStudentByPartnerFailure,

	updateStudentByPartnerRequest,
	updateStudentByPartnerSuccess,
	updateStudentByPartnerFailure,

	deleteStudentByPartnerRequest,
	deleteStudentByPartnerSuccess,
	deleteStudentByPartnerFailure,
};

export default Action;
