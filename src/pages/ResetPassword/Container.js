import { connect } from 'react-redux';
import ResetPasswordAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	statusResetPassword: state.resetPasswordPage.statusResetPassword,
});

const mapDispatchToProps = {
	resetPWReq: ResetPasswordAction.resetPasswordRequest,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
