import {connect} from 'react-redux';

import Component from './Component';
import LoginAction from './Action';

const mapStateToProps = (state) => ({
  statusLogin:state.loginPage.statusLogin,
  isActived:state.loginPage.isActived,
  statusResendActiveMail:state.loginPage.statusResendActiveMail,
});

const mapActionToProps = {
  loginRequest:LoginAction.loginRequest,
  loginStudentRequest:LoginAction.loginStudentRequest,
  resendActiveReq:LoginAction.resendActiveMailRequest,
};



export default connect(mapStateToProps,mapActionToProps)(Component);
