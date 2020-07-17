import { connect } from 'react-redux';
import Action from './Action';
import Component from './Component';

const mapStateToProps = (state) => ({
  getStudentStatus:state.partnerDasboardPage.getStudentStatus,
  searchStudentStatus:state.partnerDasboardPage.getStudentStatus,
  createStudentStatus:state.partnerDasboardPage.createStudentStatus,
  deleteStudentStatus:state.partnerDasboardPage.deleteStudentStatus,
  getReportStudentGroupDateStatus:state.partnerDasboardPage.getReportStudentGroupDateStatus,
  getReportStudentGroupYearStatus:state.partnerDasboardPage.getReportStudentGroupYearStatus,
  getReportStudentGroupAreaStatus:state.partnerDasboardPage.getReportStudentGroupAreaStatus,
  students:state.partnerDasboardPage.students,
});

const mapDispatchToProps = {
  getStudentReq:Action.getStudentByPartnerRequest,
  searchStudentReq:Action.searchStudentByPartnerRequest,
  createStudentReq:Action.createStudentByPartnerRequest,
  deleteStudentReq:Action.deleteStudentByPartnerRequest,
  getReportStudentGroupByDateReq:Action.getReportStudentGroupDateByPartnerRequest,
  getReportStudentGroupByAreaReq:Action.getReportStudentGroupAreaByPartnerRequest,
  getReportStudentGroupByYearReq:Action.getReportStudentGroupYearByPartnerRequest,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
