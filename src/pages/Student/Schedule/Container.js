import { connect } from 'react-redux';

import Component from './Component';
import Action from './Action';

const mapStateToProps = state => ({
  getScheduleOfClassStatus: state.scheduleOfStudentPage.getScheduleOfClassStatus,
  scheduleOfClass: state.scheduleOfStudentPage.scheduleOfClass,
  
});

const mapDispatchToProps = {
	getScheduleReq: Action.getScheduleOfClassByClassIDRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
