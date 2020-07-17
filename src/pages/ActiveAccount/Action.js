import Redux from '../../utils/redux';

const { createAsyncAction } = Redux;

const { checkActiveAccountRequest, checkActiveAccountSuccess, checkActiveAccountFailure } = createAsyncAction(
	'checkActiveAccount',
	'CHECK_ACTIVE_ACCOUNT',
);
const { activeAccountRequest, activeAccountSuccess, activeAccountFailure } = createAsyncAction(
	'activeAccount',
	'ACTIVE_ACCOUNT',
);
const Actions = {
	checkActiveAccountRequest,
	checkActiveAccountSuccess,
	checkActiveAccountFailure,

	activeAccountRequest,
	activeAccountSuccess,
	activeAccountFailure,
};
export default Actions;
