import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	listStudent: {
		data: [],
		pagination: {},
	},
	listTeacher: {
		data: [],
		pagination: {},
	},
	listPartner: {
		data: [],
		pagination: {},
	},
	listStudentNotApprove: {
		data: [],
		pagination: {},
	},
	detailAccount: {},
	totalsAllTime: {},
	totals30days: {},
	reportSex: {},
	profileStudent: [],
	getStudentStatus: STATUS.DEFAULT,
	getTotalsAllTimeStatus: STATUS.DEFAULT,
	getTotals30daysStatus: STATUS.DEFAULT,
	getReportAccountByGroupTypeStatus: STATUS.DEFAULT,
	getReportUserSexStatus: STATUS.DEFAULT,
	getReportUserAreaStatus: STATUS.DEFAULT,
	getProfileStudentStatus: STATUS.DEFAULT,
	createProfileStudentStatus: STATUS.DEFAULT,
	updateProfileStudentStatus: STATUS.DEFAULT,
	getDetailStatus: STATUS.DEFAULT,
	getAccountNotApproveStatus: STATUS.DEFAULT,
	searchStudentStatus: STATUS.DEFAULT,
	getPartnerStatus: STATUS.DEFAULT,
	searchPartnerStatus: STATUS.DEFAULT,
	getTeacherStatus: STATUS.DEFAULT,
	searchTeacherStatus: STATUS.DEFAULT,
	createStudentStatus: STATUS.DEFAULT,
	createTeacherStatus: STATUS.DEFAULT,
	createPartnerStatus: STATUS.DEFAULT,
	updateStudentStatus: STATUS.DEFAULT,
	updateTeacherStatus: STATUS.DEFAULT,
	updatePartnerStatus: STATUS.DEFAULT,
	deleteStudentStatus: STATUS.DEFAULT,
	deleteTeacherStatus: STATUS.DEFAULT,
	deletePartnerStatus: STATUS.DEFAULT,
	removeProfileStudentStatus: STATUS.DEFAULT,
	removeFileStatus: STATUS.DEFAULT,
	approveStudentStatus: STATUS.DEFAULT,
};

const reducer = [
	// active when call action get profile student by id
	{
		on: Action.getProfileStudentByIDRequest,
		reducer: state => ({
			...state,
			getProfileStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getProfileStudentByIDSuccess,
		reducer: (state, action) => ({
			...state,
			getProfileStudentStatus: STATUS.SUCCESS,
			profileStudent: action.payload,
		}),
	},
	{
		on: Action.getProfileStudentByIDFailure,
		reducer: state => ({
			...state,
			getProfileStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create profile student
	{
		on: Action.createProfileStudentRequest,
		reducer: state => ({
			...state,
			createProfileStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createProfileStudentSuccess,
		reducer: state => ({
			...state,
			createProfileStudentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createProfileStudentFailure,
		reducer: state => ({
			...state,
			createProfileStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update profile student
	{
		on: Action.updateProfileStudentRequest,
		reducer: state => ({
			...state,
			updateProfileStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateProfileStudentSuccess,
		reducer: state => ({
			...state,
			updateProfileStudentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateProfileStudentFailure,
		reducer: state => ({
			...state,
			updateProfileStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search student
	{
		on: Action.searchStudentRequest,
		reducer: state => ({
			...state,
			searchStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchStudentSuccess,
		reducer: (state, action) => ({
			...state,
			searchStudentStatus: STATUS.SUCCESS,
			listStudent: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchStudentFailure,
		reducer: state => ({
			...state,
			searchStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search teacher
	{
		on: Action.searchTeacherRequest,
		reducer: state => ({
			...state,
			searchTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			searchTeacherStatus: STATUS.SUCCESS,
			listTeacher: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchTeacherFailure,
		reducer: state => ({
			...state,
			searchTeacherStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search partner
	{
		on: Action.searchPartnerRequest,
		reducer: state => ({
			...state,
			searchPartnerStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchPartnerSuccess,
		reducer: (state, action) => ({
			...state,
			searchPartnerStatus: STATUS.SUCCESS,
			listPartner: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchPartnerFailure,
		reducer: state => ({
			...state,
			searchPartnerStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail account
	{
		on: Action.getDetailAccountRequest,
		reducer: state => ({
			...state,
			getDetailStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailAccountSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailStatus: STATUS.SUCCESS,
			detailAccount: action.payload,
		}),
	},
	{
		on: Action.getDetailAccountFailure,
		reducer: state => ({
			...state,
			getDetailStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list teacher
	{
		on: Action.getListTeacherRequest,
		reducer: state => ({
			...state,
			getTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getListTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getTeacherStatus: STATUS.SUCCESS,
			listTeacher: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getListTeacherFailure,
		reducer: state => ({
			...state,
			getTeacherStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list student not approve
	{
		on: Action.getAccountNotApproveRequest,
		reducer: state => ({
			...state,
			getAccountNotApproveStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getAccountNotApproveSuccess,
		reducer: (state, action) => ({
			...state,
			getAccountNotApproveStatus: STATUS.SUCCESS,
			listStudentNotApprove: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getAccountNotApproveFailure,
		reducer: state => ({
			...state,
			getAccountNotApproveStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list student
	{
		on: Action.getListStudentRequest,
		reducer: state => ({
			...state,
			getStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getListStudentSuccess,
		reducer: (state, action) => ({
			...state,
			getStudentStatus: STATUS.SUCCESS,
			listStudent: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getListStudentFailure,
		reducer: state => ({
			...state,
			getStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list teacher
	{
		on: Action.getListTeacherRequest,
		reducer: state => ({
			...state,
			getTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getListTeacherSuccess,
		reducer: (state, action) => ({
			...state,
			getTeacherStatus: STATUS.SUCCESS,
			listTeacher: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	// active when call action get list partner
	{
		on: Action.getListPartnerRequest,
		reducer: state => ({
			...state,
			getPartnerStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getListPartnerSuccess,
		reducer: (state, action) => ({
			...state,
			getPartnerStatus: STATUS.SUCCESS,
			listPartner: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getListPartnerFailure,
		reducer: state => ({
			...state,
			getPartnerStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create student
	{
		on: Action.createStudentRequest,
		reducer: state => ({
			...state,
			createStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createStudentSuccess,
		reducer: state => {
			return {
				...state,
				createStudentStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.createStudentFailure,
		reducer: state => ({
			...state,
			createStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create teacher
	{
		on: Action.createTeacherRequest,
		reducer: state => ({
			...state,
			createTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createTeacherSuccess,
		reducer: state => {
			return {
				...state,
				createTeacherStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.createTeacherFailure,
		reducer: state => ({
			...state,
			createTeacherStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create partner
	{
		on: Action.createPartnerRequest,
		reducer: state => ({
			...state,
			createPartnerStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createPartnerSuccess,
		reducer: state => {
			return {
				...state,
				createPartnerStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.createPartnerFailure,
		reducer: state => ({
			...state,
			createPartnerStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update student
	{
		on: Action.updateStudentRequest,
		reducer: state => ({
			...state,
			updateStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateStudentSuccess,
		reducer: state => {
			return {
				...state,
				updateStudentStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.updateStudentFailure,
		reducer: state => ({
			...state,
			updateStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action approve student
	{
		on: Action.approveStudentRequest,
		reducer: state => ({
			...state,
			approveStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.approveStudentSuccess,
		reducer: state => {
			return {
				...state,
				approveStudentStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.approveStudentFailure,
		reducer: state => ({
			...state,
			approveStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update teacher
	{
		on: Action.updateTeacherRequest,
		reducer: state => ({
			...state,
			updateTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateTeacherSuccess,
		reducer: state => {
			return {
				...state,
				updateTeacherStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.updateTeacherFailure,
		reducer: state => ({
			...state,
			updateTeacherStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update partner
	{
		on: Action.updatePartnerRequest,
		reducer: state => ({
			...state,
			updatePartnerStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updatePartnerSuccess,
		reducer: state => {
			return {
				...state,
				updatePartnerStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.updatePartnerFailure,
		reducer: state => ({
			...state,
			updatePartnerStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete student
	{
		on: Action.deleteStudentRequest,
		reducer: state => ({
			...state,
			deleteStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteStudentSuccess,
		reducer: state => {
			return {
				...state,
				deleteStudentStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.deleteStudentFailure,
		reducer: state => ({
			...state,
			deleteStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete teacher
	{
		on: Action.deleteTeacherRequest,
		reducer: state => ({
			...state,
			deleteTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteTeacherSuccess,
		reducer: state => {
			return {
				...state,
				deleteTeacherStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.deleteTeacherFailure,
		reducer: state => ({
			...state,
			deleteTeacherStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete partner
	{
		on: Action.deletePartnerRequest,
		reducer: state => ({
			...state,
			deletePartnerStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deletePartnerSuccess,
		reducer: state => {
			return {
				...state,
				deletePartnerStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.deletePartnerFailure,
		reducer: state => ({
			...state,
			deletePartnerStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove profile
	{
		on: Action.removeProfileStudentRequest,
		reducer: state => ({
			...state,
			removeProfileStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeProfileStudentSuccess,
		reducer: state => {
			return {
				...state,
				removeProfileStudentStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.removeProfileStudentFailure,
		reducer: state => ({
			...state,
			removeProfileStudentStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove file temp
	{
		on: Action.removeFileRequest,
		reducer: state => ({
			...state,
			removeFileStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeFileSuccess,
		reducer: state => {
			return {
				...state,
				removeFileStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.removeFileFailure,
		reducer: state => ({
			...state,
			removeFileStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get totals all time
	{
		on: Action.getTotalsAllTimeRequest,
		reducer: state => ({
			...state,
			getTotalsAllTimeStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotalsAllTimeSuccess,
		reducer: (state, action) => {
			return {
				...state,
				getTotalsAllTimeStatus: STATUS.SUCCESS,
				totalsAllTime: action.payload,
			};
		},
	},
	{
		on: Action.getTotalsAllTimeFailure,
		reducer: state => ({
			...state,
			getTotalsAllTimeStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get totals 30days
	{
		on: Action.getTotals30daysRequest,
		reducer: state => ({
			...state,
			getTotals30daysStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotals30daysSuccess,
		reducer: (state, action) => {
			return {
				...state,
				getTotals30daysStatus: STATUS.SUCCESS,
				totals30days: action.payload,
			};
		},
	},
	{
		on: Action.getTotals30daysFailure,
		reducer: state => ({
			...state,
			getTotals30daysStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report account by group type
	{
		on: Action.getReportAccountByGroupTypeRequest,
		reducer: state => ({
			...state,
			getReportAccountByGroupTypeStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportAccountByGroupTypeRequest,
		reducer: state => {
			return {
				...state,
				getReportAccountByGroupTypeStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.getReportAccountByGroupTypeFailure,
		reducer: state => ({
			...state,
			getReportAccountByGroupTypeStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report account sex
	{
		on: Action.getReportSexRequest,
		reducer: state => ({
			...state,
			getReportUserSexStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportSexSuccess,
		reducer: (state, action) => {
			return {
				...state,
				getReportUserSexStatus: STATUS.SUCCESS,
				reportSex: action.payload,
			};
		},
	},
	{
		on: Action.getReportSexFailure,
		reducer: state => ({
			...state,
			getReportUserSexStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report account area
	{
		on: Action.getReportUserAreaRequest,
		reducer: state => ({
			...state,
			getReportUserAreaStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportUserAreaSuccess,
		reducer: state => {
			return {
				...state,
				getReportUserAreaStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.getReportUserAreaFailure,
		reducer: state => ({
			...state,
			getReportUserAreaStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('accountPage', reducer, initialState);
