import { connect } from 'react-redux';
import ForgotPasswordAction from './Action';
import Component from './Component';

const mapStateToProps = state => ({
  statusForgotPassword:state.forgotPasswordPage.statusForgotPassword
});

const mapDispatchToProps = {
  forgotPWReq: ForgotPasswordAction.forgotPasswordRequest
};


export default connect(mapStateToProps,mapDispatchToProps)(Component);