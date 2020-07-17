import { connect } from 'react-redux';
import Component from './Component';
import SubjectAction from './Action';

const mapStateToProps = state => ({
  getSubjectsStatus:state.subjectPage.getSubjectsStatus,
  createSubjectStatus:state.subjectPage.createSubjectStatus,
	deleteSubjectStatus:state.subjectPage.deleteSubjectStatus,
	subjects:state.subjectPage.subjects,
	
});

const mapDispatchToProps = {
	createSubjectReq: SubjectAction.createSubjectRequest,
	getSubjectsReq: SubjectAction.getSubjectsRequest,
	deleteSubjectReq: SubjectAction.deleteSubjectRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
