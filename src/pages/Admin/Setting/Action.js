import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { updateProfileRequest, updateProfileSuccess, updateProfileFailure } = createAsyncAction(
	'updateProfile',
	'UPDATE_PROFILE',
);

const { getRulesRequest, getRulesSuccess, getRulesFailure } = createAsyncAction('getRules', 'GET_RULES');
const { getRuleSubAdminRequest, getRuleSubAdminSuccess, getRuleSubAdminFailure } = createAsyncAction(
	'getRuleSubAdmin',
	'GET_RULE_SUB_ADMIN',
);
const { getSubAdminRequest, getSubAdminSuccess, getSubAdminFailure } = createAsyncAction(
	'getSubAdmin',
	'GET_SUB_ADMIN',
);

const {
	getGroupRuleByAccountIDRequest,
	getGroupRuleByAccountIDSuccess,
	getGroupRuleByAccountIDFailure,
} = createAsyncAction('getGroupRuleByAccountID', 'GET_GROUP_RULE_ACCOUNT_ID');

const { searchSubAdminRequest, searchSubAdminSuccess, searchSubAdminFailure } = createAsyncAction(
	'searchSubAdmin',
	'SEARCH_SUB_ADMIN',
);

const { createSubAdminRequest, createSubAdminSuccess, createSubAdminFailure } = createAsyncAction(
	'createSubAdmin',
	'CREATE_SUB_ADMIN',
);

const { updateSubAdminRequest, updateSubAdminSuccess, updateSubAdminFailure } = createAsyncAction(
	'updateSubAdmin',
	'UPDATE_SUB_ADMIN',
);

const { deleteSubAdminRequest, deleteSubAdminSuccess, deleteSubAdminFailure } = createAsyncAction(
	'deleteSubAdmin',
	'DELETE_SUB_ADMIN',
);
const {
	decentralizationSubAdminRequest,
	decentralizationSubAdminSuccess,
	decentralizationSubAdminFailure,
} = createAsyncAction('decentralizationSubAdmin', 'DECENTRALIZATION_SUB_ADMIN');

const Actions = {
	getRulesRequest,
	getRulesSuccess,
	getRulesFailure,

	getRuleSubAdminRequest,
	getRuleSubAdminSuccess,
	getRuleSubAdminFailure,

	getGroupRuleByAccountIDRequest,
	getGroupRuleByAccountIDSuccess,
	getGroupRuleByAccountIDFailure,

	updateProfileRequest,
	updateProfileSuccess,
	updateProfileFailure,

	getSubAdminRequest,
	getSubAdminSuccess,
	getSubAdminFailure,

	searchSubAdminRequest,
	searchSubAdminSuccess,
	searchSubAdminFailure,

	createSubAdminRequest,
	createSubAdminSuccess,
	createSubAdminFailure,

	updateSubAdminRequest,
	updateSubAdminSuccess,
	updateSubAdminFailure,

	deleteSubAdminRequest,
	deleteSubAdminSuccess,
	deleteSubAdminFailure,

	decentralizationSubAdminRequest,
	decentralizationSubAdminSuccess,
	decentralizationSubAdminFailure,
};

export default Actions;
