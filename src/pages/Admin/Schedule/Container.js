import { connect } from 'react-redux';

import Component from './Component';
import ScheduleAction from './Action';

const mapStateToProps = state => ({
  getSchedulesStatus:state.schedulePage.getSchedulesStatus,
  getDetailExamForScheduleStatus:state.schedulePage.getDetailExamForScheduleStatus,
  removeScheduleStatus:state.schedulePage.removeScheduleStatus,
  authForScheduleStatus:state.schedulePage.authForScheduleStatus,
  schedules:state.schedulePage.schedules,
  detailExam:state.schedulePage.detailExam,
});

const mapDispatchToProps = {
  getSchedulesReq:ScheduleAction.getSchedulesRequest,
  getDetailExamForSchedulesReq:ScheduleAction.getDetailExamForScheduleRequest,
  removeScheduleReq:ScheduleAction.removeScheduleRequest,
  authPasswordReq:ScheduleAction.authPasswordScheduleRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
