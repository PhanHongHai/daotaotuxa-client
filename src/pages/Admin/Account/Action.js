import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getTotalsAllTimeRequest, getTotalsAllTimeSuccess, getTotalsAllTimeFailure } = createAsyncAction(
	'getTotalsAllTime',
	'GET_TOTALS_ALLTIME',
);
const { getTotals30daysRequest, getTotals30daysSuccess, getTotals30daysFailure } = createAsyncAction(
	'getTotals30days',
	'GET_TOTALS_30DAYS',
);

const { getReportSexRequest, getReportSexSuccess, getReportSexFailure } = createAsyncAction(
	'getReportSex',
	'GET_REPORT_SEX',
);

const { getReportUserAreaRequest, getReportUserAreaSuccess, getReportUserAreaFailure } = createAsyncAction(
	'getReportUserArea',
	'GET_REPORT_USER_AREA',
);

const {
	getReportAccountByGroupTypeRequest,
	getReportAccountByGroupTypeSuccess,
	getReportAccountByGroupTypeFailure,
} = createAsyncAction('getReportAccountByGroupType', 'GET_REPORT_ACCOUNT_BY_GROUP_TYPE');

const { getListStudentRequest, getListStudentSuccess, getListStudentFailure } = createAsyncAction(
	'getListStudent',
	'GET_LIST_STUDENT',
);

const { getProfileStudentByIDRequest, getProfileStudentByIDSuccess, getProfileStudentByIDFailure } = createAsyncAction(
	'getProfileStudentByID',
	'GET_PROFILE_STUDENT_BY_ID',
);

const { getAccountNotApproveRequest, getAccountNotApproveSuccess, getAccountNotApproveFailure } = createAsyncAction(
	'getAccountNotApprove',
	'GET_ACCOUNT_NOT_APPROVE',
);

const { createProfileStudentRequest, createProfileStudentSuccess, createProfileStudentFailure } = createAsyncAction(
	'createProfileStudent',
	'CREATE_PROFILE_STUDENT',
);

const { updateProfileStudentRequest, updateProfileStudentSuccess, updateProfileStudentFailure } = createAsyncAction(
	'updateProfileStudent',
	'UPDATE_PROFILE_STUDENT',
);
const { approveStudentRequest, approveStudentSuccess, approveStudentFailure } = createAsyncAction(
	'approveStudent',
	'APPROVE_STUDENT',
);
const { removeProfileStudentRequest, removeProfileStudentSuccess, removeProfileStudentFailure } = createAsyncAction(
	'removeProfileStudent',
	'REMOVE_PROFILE_STUDENT',
);

const { removeFileRequest, removeFileSuccess, removeFileFailure } = createAsyncAction('removeFile', 'REMOVE_FILE');

const { getDetailAccountRequest, getDetailAccountSuccess, getDetailAccountFailure } = createAsyncAction(
	'getDetailAccount',
	'GET_DETAIL_ACCOUNT',
);

const { getListTeacherRequest, getListTeacherSuccess, getListTeacherFailure } = createAsyncAction(
	'getListTeacher',
	'GET_LIST_TEACHER',
);
const { getListPartnerRequest, getListPartnerSuccess, getListPartnerFailure } = createAsyncAction(
	'getListPartner',
	'GET_LIST_PARTNER',
);

const { searchStudentRequest, searchStudentSuccess, searchStudentFailure } = createAsyncAction(
	'searchStudent',
	'SEARCH_STUDENT',
);

const { searchTeacherRequest, searchTeacherSuccess, searchTeacherFailure } = createAsyncAction(
	'searchTeacher',
	'SEARCH_TEACHER',
);
const { searchPartnerRequest, searchPartnerSuccess, searchPartnerFailure } = createAsyncAction(
	'searchPartner',
	'SEARCH_PARTNER',
);

const { createStudentRequest, createStudentSuccess, createStudentFailure } = createAsyncAction(
	'createStudent',
	'CREATE_STUDENT',
);
const { createTeacherRequest, createTeacherSuccess, createTeacherFailure } = createAsyncAction(
	'createTeacher',
	'CREATE_TEACHER',
);
const { createPartnerRequest, createPartnerSuccess, createPartnerFailure } = createAsyncAction(
	'createPartner',
	'CREATE_PARTNER',
);
const { updateStudentRequest, updateStudentSuccess, updateStudentFailure } = createAsyncAction(
	'updateStudent',
	'UPDATE_STUDENT',
);

const { updateTeacherRequest, updateTeacherSuccess, updateTeacherFailure } = createAsyncAction(
	'updateTeacher',
	'UPDATE_TEACHER',
);
const { updatePartnerRequest, updatePartnerSuccess, updatePartnerFailure } = createAsyncAction(
	'updatePartner',
	'UPDATE_PARTNER',
);
const { deleteStudentRequest, deleteStudentSuccess, deleteStudentFailure } = createAsyncAction(
	'deleteStudent',
	'DELETE_STUDENT',
);
const { deleteTeacherRequest, deleteTeacherSuccess, deleteTeacherFailure } = createAsyncAction(
	'deleteTeacher',
	'DELETE_TEACHER',
);
const { deletePartnerRequest, deletePartnerSuccess, deletePartnerFailure } = createAsyncAction(
	'deletePartner',
	'DELETE_PARTNER',
);

const Actions = {
	getListStudentRequest,
	getListStudentSuccess,
	getListStudentFailure,

	getAccountNotApproveRequest,
	getAccountNotApproveSuccess,
	getAccountNotApproveFailure,

	getProfileStudentByIDRequest,
	getProfileStudentByIDSuccess,
	getProfileStudentByIDFailure,

	createProfileStudentRequest,
	createProfileStudentSuccess,
	createProfileStudentFailure,

	updateProfileStudentRequest,
	updateProfileStudentSuccess,
	updateProfileStudentFailure,

	approveStudentRequest,
	approveStudentSuccess,
	approveStudentFailure,

	removeProfileStudentRequest,
	removeProfileStudentSuccess,
	removeProfileStudentFailure,

	removeFileRequest,
	removeFileSuccess,
	removeFileFailure,

	getDetailAccountRequest,
	getDetailAccountSuccess,
	getDetailAccountFailure,

	searchStudentRequest,
	searchStudentSuccess,
	searchStudentFailure,

	searchTeacherRequest,
	searchTeacherSuccess,
	searchTeacherFailure,

	searchPartnerRequest,
	searchPartnerSuccess,
	searchPartnerFailure,

	getListTeacherRequest,
	getListTeacherSuccess,
	getListTeacherFailure,

	getListPartnerRequest,
	getListPartnerSuccess,
	getListPartnerFailure,

	createStudentRequest,
	createStudentSuccess,
	createStudentFailure,

	createTeacherRequest,
	createTeacherSuccess,
	createTeacherFailure,

	createPartnerRequest,
	createPartnerSuccess,
	createPartnerFailure,

	updateStudentRequest,
	updateStudentSuccess,
	updateStudentFailure,

	updateTeacherRequest,
	updateTeacherSuccess,
	updateTeacherFailure,

	updatePartnerRequest,
	updatePartnerSuccess,
	updatePartnerFailure,

	deleteStudentRequest,
	deleteStudentSuccess,
	deleteStudentFailure,

	deleteTeacherRequest,
	deleteTeacherSuccess,
	deleteTeacherFailure,

	deletePartnerRequest,
	deletePartnerSuccess,
	deletePartnerFailure,

	getTotals30daysRequest,
	getTotals30daysSuccess,
	getTotals30daysFailure,

	getTotalsAllTimeRequest,
	getTotalsAllTimeSuccess,
	getTotalsAllTimeFailure,

	getReportAccountByGroupTypeRequest,
	getReportAccountByGroupTypeSuccess,
	getReportAccountByGroupTypeFailure,

	getReportSexRequest,
	getReportSexSuccess,
	getReportSexFailure,

	getReportUserAreaRequest,
	getReportUserAreaSuccess,
	getReportUserAreaFailure,
};
export default Actions;
