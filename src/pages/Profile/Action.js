import Redux from '../../utils/redux';

const { createAsyncAction } = Redux;

const { getRuleAllRequest, getRuleAllSuccess, getRuleAllFailure } = createAsyncAction('getRuleAll', 'GET_RULE_ALL');
const { getRuleOfAccountRequest, getRuleOfAccountSuccess, getRuleOfAccountFailure } = createAsyncAction(
	'getRuleOfAccount',
	'GET_RULE_OF_ACCOUNT',
);

const { updateProfileRequest, updateProfileSuccess, updateProfileFailure } = createAsyncAction(
	'updateProfile',
	'UPDATE_PROFILE',
);

const { changePasswordRequest, changePasswordSuccess, changePasswordFailure } = createAsyncAction(
	'changePassword',
	'CHANGE_PASSWORD',
);
const { removeFileAvatarRequest, removeFileAvatarSuccess, removeFileAvatarFailure } = createAsyncAction(
	'removeFileAvatar',
	'REMOVE_FILE_AVATAR',
);
const Actions = {
	getRuleAllRequest,
	getRuleAllSuccess,
	getRuleAllFailure,

	getRuleOfAccountRequest,
	getRuleOfAccountSuccess,
	getRuleOfAccountFailure,

	updateProfileRequest,
	updateProfileSuccess,
	updateProfileFailure,

	changePasswordRequest,
	changePasswordSuccess,
	changePasswordFailure,

	removeFileAvatarRequest,
	removeFileAvatarSuccess,
	removeFileAvatarFailure,
};

export default Actions;
