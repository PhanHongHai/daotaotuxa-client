import { connect } from 'react-redux';
import Component from './Component';
import Action from './Action';

const mapStateToProps = state => ({
	getInfoStudentStatus: state.detailStudentOfTeacherPage.getInfoStudentStatus,
	getProfileStudentStatus: state.detailStudentOfTeacherPage.getProfileStudentStatus,
	getSubjectProgressStudentStatus: state.detailStudentOfTeacherPage.getSubjectProgressStudentStatus,
	infoStudent: state.detailStudentOfTeacherPage.infoStudent,
  profileStudent: state.detailStudentOfTeacherPage.profileStudent,
  subjectProgressOfStudent: state.detailStudentOfTeacherPage.subjectProgressOfStudent,
  
});

const mapDispatchToProps = {
	getInfoStudentReq: Action.getInfoStudentByTeacherRequest,
	getProfileStudentReq: Action.getProfileStudentByTeacherRequest,
	getSubjectProgressStudentReq: Action.getSubjectProgressStudentByTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
