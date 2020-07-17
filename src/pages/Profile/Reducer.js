import STATUS from '../../constands/apiStatus';
import Action from './Action';
import Redux from '../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getRulesStatus: STATUS.DEFAULT,
	getRuleOfAccountStatus: STATUS.DEFAULT,
	updateInfoStatus: STATUS.DEFAULT,
	changePasswordStatus: STATUS.DEFAULT,
	removeFileStatus: STATUS.DEFAULT,
	rules: [],
	ruleAccount:[]
};

const reducer = [
	// active when call action get list rules 
	{
		on: Action.getRuleAllRequest,
		reducer: state => ({
			...state,
			getRulesStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getRuleAllSuccess,
		reducer: (state, action) => ({
			...state,
			getRulesStatus: STATUS.SUCCESS,
			rules:  action.payload
			
		}),
	},
	{
		on: Action.getRuleAllFailure,
		reducer: state => ({
			...state,
			getRulesStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list rule of account 
	{
		on: Action.getRuleOfAccountRequest,
		reducer: state => ({
			...state,
			getRuleOfAccountStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getRuleOfAccountSuccess,
		reducer: (state, action) => ({
			...state,
			getRuleOfAccountStatus: STATUS.SUCCESS,
			ruleAccount:  action.payload
			
		}),
	},
	{
		on: Action.getRuleOfAccountFailure,
		reducer: state => ({
			...state,
			getRuleOfAccountStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update info account
	{
		on: Action.updateProfileRequest,
		reducer: state => ({
			...state,
			updateInfoStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateProfileSuccess,
		reducer: (state) => ({
			...state,
			updateInfoStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateProfileFailure,
		reducer: state => ({
			...state,
			updateInfoStatus: STATUS.FAILURE,
		}),
	},
	// active when call action change password
	{
		on: Action.changePasswordRequest,
		reducer: state => ({
			...state,
			changePasswordStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.changePasswordSuccess,
		reducer: (state) => ({
			...state,
			changePasswordStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.changePasswordFailure,
		reducer: state => ({
			...state,
			changePasswordStatus: STATUS.FAILURE,
		}),
	},
		// active when call action remove file temp
		{
			on: Action.removeFileAvatarRequest,
			reducer: state => ({
				...state,
				removeFileStatus: STATUS.FETCHING,
			}),
		},
		{
			on: Action.removeFileAvatarSuccess,
			reducer: state => {
				return {
					...state,
					removeFileStatus: STATUS.SUCCESS,
				};
			},
		},
		{
			on: Action.removeFileAvatarFailure,
			reducer: state => ({
				...state,
				removeFileStatus: STATUS.FAILURE,
			}),
		},
];
export default createReducers('profileAccountPage', reducer, initialState);
