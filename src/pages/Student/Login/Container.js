import {connect} from 'react-redux';

import Component from './Component';
import LoginAction from './Action';

const mapStateToProps = (state) => ({
  statusLogin:state.loginStudentPage.statusLogin,
  statusResendActiveMail:state.loginStudentPage.statusResendActiveMail,
});

const mapActionToProps = {
  loginRequest:LoginAction.loginStudentRequest,
};



export default connect(mapStateToProps,mapActionToProps)(Component);
