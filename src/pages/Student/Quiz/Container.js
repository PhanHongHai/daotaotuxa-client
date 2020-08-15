import { connect } from 'react-redux';
import Component from './Component';
import Action from './Action';

const mapStateToProps = state => ({
  getScheduleDetailStatus:state.scheduleStudentPage.getScheduleDetailStatus,
  submitTaskStatus:state.scheduleStudentPage.submitTaskStatus,
  scheduleDetail:state.scheduleStudentPage.scheduleDetail,
  getExamByQuizStatus:state.scheduleStudentPage.getExamByQuizStatus,
  checkExistPointInScheduleStatus:state.scheduleStudentPage.checkExistPointInScheduleStatus,
  examDetail:state.scheduleStudentPage.examDetail,
  resultTask:state.scheduleStudentPage.resultTask,

});

const mapDispatchToProps = {
  getScheduleDetailReq: Action.getScheduleDetailRequest,
  getExamReq: Action.getExamDetailByQuizRequest,
  submitTaskReq:Action.submitTaskRequest,
  checkExistStudentDoneTestReq:Action.checkExistPointInSCheduleRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
