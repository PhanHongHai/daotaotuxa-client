import { connect } from 'react-redux';

import ProfileAccountAction from '../../Profile/Action';
import Component from './Component';

const mapStateToProps = state => ({
	profile: state.loginPage.profileUser,
	updateInfoStatus: state.profileAccountPage.updateInfoStatus,
	changePasswordStatus: state.profileAccountPage.getRulesStatus,
});

const mapDispatchToProps = {
	updateInfoReq: ProfileAccountAction.updateProfileRequest,
	changePasswordReq: ProfileAccountAction.changePasswordRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
