import { connect } from 'react-redux';
import Component from './Component';
import ActiveAccountAction from './Action';

const mapStateToProps = (state) => ({
  statusActive:state.activeAccountPage.statusActive,
  statusCheckActive:state.activeAccountPage.statusCheckActive,

});

const mapDispatchToProps = {
  activeReq:ActiveAccountAction.activeAccountRequest,
  checkActiveReq:ActiveAccountAction.checkActiveAccountRequest,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);