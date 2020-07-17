import { connect } from 'react-redux';
import Component from './Component';

const mapStateToProps = state => ({
  userData:state.loginPage.profileUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps,mapDispatchToProps)(Component);