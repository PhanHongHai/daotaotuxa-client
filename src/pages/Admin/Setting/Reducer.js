import  STATUS  from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getListSubAdminStatus: STATUS.DEFAULT,
	searchSubAdminStatus: STATUS.DEFAULT,
	createSubAdminStatus: STATUS.DEFAULT,
	updateSubAdminStatus: STATUS.DEFAULT,
	deleteSubAdminStatus: STATUS.DEFAULT,
	getRulesStatus: STATUS.DEFAULT,
	getGroupRuleStatus: STATUS.DEFAULT,
	decentralizationStatus: STATUS.DEFAULT,
	listSubAdmin: {
		data: [],
		pagination: {},
	},
	rules: [],
	groupRule:[],
};

const reducer = [
	// active when call action get list sub admin
	{
		on: Action.getSubAdminRequest,
		reducer: state => ({
			...state,
			getListSubAdminStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubAdminSuccess,
		reducer: (state, action) => ({
			...state,
			getListSubAdminStatus: STATUS.SUCCESS,
			listSubAdmin: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubAdminFailure,
		reducer: state => ({
			...state,
			getListSubAdminStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search sub admin
	{
		on: Action.searchSubAdminRequest,
		reducer: state => ({
			...state,
			searchSubAdminStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchSubAdminSuccess,
		reducer: (state, action) => ({
			...state,
			searchSubAdminStatus: STATUS.SUCCESS,
			listSubAdmin: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchSubAdminFailure,
		reducer: state => ({
			...state,
			searchSubAdminStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create sub admin
	{
		on: Action.createSubAdminRequest,
		reducer: state => ({
			...state,
			createSubAdminStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createSubAdminSuccess,
		reducer: state => {
			return {
				...state,
				createSubAdminStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.createSubAdminFailure,
		reducer: state => ({
			...state,
			createSubAdminStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update sub admin
	{
		on: Action.updateSubAdminRequest,
		reducer: state => ({
			...state,
			updateSubAdminStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateSubAdminSuccess,
		reducer: state => {
			return {
				...state,
				updateSubAdminStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.updateSubAdminFailure,
		reducer: state => ({
			...state,
			updateSubAdminStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete sub admin
	{
		on: Action.deleteSubAdminRequest,
		reducer: state => ({
			...state,
			deleteSubAdminStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteSubAdminSuccess,
		reducer: state => {
			return {
				...state,
				deleteSubAdminStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.deleteSubAdminFailure,
		reducer: state => ({
			...state,
			deleteSubAdminStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get  rules
	{
		on: Action.getRulesRequest,
		reducer: state => ({
			...state,
			getRulesStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getRulesSuccess,
		reducer: (state, action) => {
			const { payload } = action;
			return {
				...state,
				getRulesStatus: STATUS.SUCCESS,
				rules:payload,
			};
		},
	},
	{
		on: Action.getRulesFailure,
		reducer: state => ({
			...state,
			getRulesStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get  rule by ud
	{
		on: Action.getGroupRuleByAccountIDRequest,
		reducer: state => ({
			...state,
			getGroupRuleStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getGroupRuleByAccountIDSuccess,
		reducer: (state, action) => {
			const { payload } = action;
			return {
				...state,
				getGroupRuleStatus: STATUS.SUCCESS,
				groupRule:payload,
			};
		},
	},
	{
		on: Action.getGroupRuleByAccountIDFailure,
		reducer: state => ({
			...state,
			getGroupRuleStatus: STATUS.FAILURE,
		}),
	},
	// active when call action decentralizationStatus sub admin
	{
		on: Action.decentralizationSubAdminRequest,
		reducer: state => ({
			...state,
			decentralizationStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.decentralizationSubAdminSuccess,
		reducer: (state) => {
			return {
				...state,
				decentralizationStatus: STATUS.SUCCESS,
			};
		},
	},
	{
		on: Action.decentralizationSubAdminFailure,
		reducer: state => ({
			...state,
			decentralizationStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('settingPage', reducer, initialState);
