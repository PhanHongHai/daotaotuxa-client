import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
  getStudentStatus:STATUS.DEFAULT,
  getDetailStudentStatus:STATUS.DEFAULT,
  getReportStudentGroupDateStatus:STATUS.DEFAULT,
  getReportStudentGroupYearStatus:STATUS.DEFAULT,
  getReportStudentGroupAreaStatus:STATUS.DEFAULT,
  searchStudentStatus:STATUS.DEFAULT,
  createStudentStatus:STATUS.DEFAULT,
  updateStudentStatus:STATUS.DEFAULT,
  deleteStudentStatus:STATUS.DEFAULT,
  students:{
    data:[],
    pagination:{}
	},
	studentDetail:{}
};

const reducer=[

  	// active when call action get student
	{
		on: Action.getStudentByPartnerRequest,
		reducer: state => ({
			...state,
			getStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getStudentByPartnerSuccess,
		reducer: (state, action) => ({
			...state,
			getStudentStatus: STATUS.SUCCESS,
			students: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getStudentByPartnerFailure,
		reducer: state => ({
			...state,
			getStudentStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action get detail student
	{
		on: Action.getDetailStudentByPartnerRequest,
		reducer: state => ({
			...state,
			getDetailStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailStudentByPartnerSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailStudentStatus: STATUS.SUCCESS,
			studentDetail: action.payload,
		}),
	},
	{
		on: Action.getDetailStudentByPartnerFailure,
		reducer: state => ({
			...state,
			getDetailStudentStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action search student
	{
		on: Action.searchStudentByPartnerRequest,
		reducer: state => ({
			...state,
			searchStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchStudentByPartnerSuccess,
		reducer: (state, action) => ({
			...state,
			searchStudentStatus: STATUS.SUCCESS,
			students: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchStudentByPartnerFailure,
		reducer: state => ({
			...state,
			searchStudentStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action create student
	{
		on: Action.createStudentByPartnerRequest,
		reducer: state => ({
			...state,
			createStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createStudentByPartnerSuccess,
		reducer: (state) => ({
			...state,
			createStudentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createStudentByPartnerFailure,
		reducer: state => ({
			...state,
			createStudentStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action update student
	{
		on: Action.updateStudentByPartnerRequest,
		reducer: state => ({
			...state,
			updateStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateStudentByPartnerSuccess,
		reducer: (state) => ({
			...state,
			updateStudentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateStudentByPartnerFailure,
		reducer: state => ({
			...state,
			updateStudentStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action delete student
	{
		on: Action.deleteStudentByPartnerRequest,
		reducer: state => ({
			...state,
			deleteStudentStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteStudentByPartnerSuccess,
		reducer: (state) => ({
			...state,
			deleteStudentStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteStudentByPartnerFailure,
		reducer: state => ({
			...state,
			deleteStudentStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action get report student group by date
	{
		on: Action.getReportStudentGroupDateByPartnerRequest,
		reducer: state => ({
			...state,
			getReportStudentGroupDateStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportStudentGroupDateByPartnerSuccess,
		reducer: (state) => ({
			...state,
			getReportStudentGroupDateStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportStudentGroupDateByPartnerFailure,
		reducer: state => ({
			...state,
			getReportStudentGroupDateStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action get report student group by area
	{
		on: Action.getReportStudentGroupAreaByPartnerRequest,
		reducer: state => ({
			...state,
			getReportStudentGroupAreaStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportStudentGroupAreaByPartnerSuccess,
		reducer: (state) => ({
			...state,
			getReportStudentGroupAreaStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportStudentGroupAreaByPartnerFailure,
		reducer: state => ({
			...state,
			getReportStudentGroupAreaStatus: STATUS.FAILURE,
		}),
	},
  	// active when call action get report student group by year
	{
		on: Action.getReportStudentGroupYearByPartnerRequest,
		reducer: state => ({
			...state,
			getReportStudentGroupYearStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportStudentGroupYearByPartnerSuccess,
		reducer: (state) => ({
			...state,
			getReportStudentGroupYearStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportStudentGroupYearByPartnerFailure,
		reducer: state => ({
			...state,
			getReportStudentGroupYearStatus: STATUS.FAILURE,
		}),
	},
];

export default createReducers('partnerDasboardPage', reducer, initialState);