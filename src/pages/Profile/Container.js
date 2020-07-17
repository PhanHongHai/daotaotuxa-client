import { connect } from 'react-redux';

import ProfileAccountAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	profile: state.loginPage.profileUser,
	rules: state.profileAccountPage.rules,
	ruleAccount: state.profileAccountPage.ruleAccount,
	getRuleOfAccountStatus: state.profileAccountPage.getRuleOfAccountStatus,
	updateInfoStatus: state.profileAccountPage.updateInfoStatus,
	getRulesStatus: state.profileAccountPage.getRulesStatus,
	changePasswordStatus: state.profileAccountPage.getRulesStatus,
});

const mapDispatchToProps = {
	updateInfoReq: ProfileAccountAction.updateProfileRequest,
	getRulesReq: ProfileAccountAction.getRuleAllRequest,
	getRuleOfAccount: ProfileAccountAction.getRuleOfAccountRequest,
	changePasswordReq: ProfileAccountAction.changePasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
