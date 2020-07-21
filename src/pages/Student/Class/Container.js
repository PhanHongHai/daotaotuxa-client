import { connect } from 'react-redux';
import Action from './Action';
import Component from './Component';

const mapStateToProps = state => ({
	getSubjectOfClassStatus: state.classOfStudentPage.getSubjectOfClassStatus,
	getStudentsOfClassStatus: state.classOfStudentPage.getStudentsOfClassStatus,
	getDetailOfClassByStudentIDStatus: state.classOfStudentPage.getDetailOfClassByStudentIDStatus,
	getProgressByStudentStatus: state.classOfStudentPage.getProgressByStudentStatus,
	getScheduleOfClassStatus: state.classOfStudentPage.getScheduleOfClassStatus,
	studentsClass: state.classOfStudentPage.studentsClass,
	subjectsClass: state.classOfStudentPage.subjectsClass,
	detailOfClass: state.classOfStudentPage.detailOfClass,
	progressOfStudent: state.classOfStudentPage.progressOfStudent,
	scheduleOfClass: state.classOfStudentPage.scheduleOfClass,
});

const mapDispatchToProps = {
	getStudentsOfClassReq: Action.getStudentsOfClassByStudentRequest,
	getSubjectsOfClassReq: Action.getSubjectsOfClassByStudentRequest,
	getDetailOfClassReq: Action.getDetailOfClassByStudentIDRequest,
	getProgressReq: Action.getProgressByStudentRequest,
	getScheduleReq: Action.getScheduleOfClassByIDRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
