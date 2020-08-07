import { connect } from 'react-redux';
import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getDetailClassStatus: state.classOfTeacherPage.getDetailClassStatus,
	getStudentOfClassStatus: state.classOfTeacherPage.getStudentOfClassStatus,
	getSubjectOfClassStatus: state.classOfTeacherPage.getSubjectOfClassStatus,
	createSubjectOfClassStatus: state.classOfTeacherPage.createSubjectOfClassStatus,
	updateOfClassStatus: state.classOfTeacherPage.updateOfClassStatus,
	getScheduleOfClassStatus: state.classOfTeacherPage.getScheduleOfClassStatus,
	getDetailExamStatus: state.classOfTeacherPage.getDetailExamStatus,
	getLogsScheduleOfClassStatus: state.classOfTeacherPage.getLogsScheduleOfClassStatus,
	getSubjectAllOfClassStatus: state.classOfTeacherPage.getSubjectAllOfClassStatus,
	getPointSubjectOfStudentStatus: state.classOfTeacherPage.getPointSubjectOfStudentStatus,
	updatePointMiddleStatus: state.classOfTeacherPage.updatePointMiddleStatus,
	detailClass: state.classOfTeacherPage.detailClass,
	studentsClass: state.classOfTeacherPage.studentsClass,
	subjectsClass: state.classOfTeacherPage.subjectsClass,
	schedulesClass: state.classOfTeacherPage.schedulesClass,
	detailExam: state.classOfTeacherPage.detailExam,
	logsScheduleClass: state.classOfTeacherPage.logsScheduleClass,
	subjectsOfClass: state.classOfTeacherPage.subjectsOfClass,
	poinOfStudent: state.classOfTeacherPage.poinOfStudent,
});

const mapDispatchToProps = {
	getDetailClassReq: Actions.getDetailClassByTeacherRequest,
	getSubjectClassReq: Actions.getSubjectOfClassByTeacherRequest,
	getStudentClassReq: Actions.getStudentOfClassByTeacherRequest,
	getScheduleClassReq: Actions.getScheduleOfClassByTeacherRequest,
	getLogScheduleClassReq: Actions.getLogsScheduleOfClassByTeacherRequest,
	createSubjectReq: Actions.createSubjectByTeacherRequest,
	updateClassReq: Actions.updateClassByTeacherRequest,
	updatePointMiddleReq: Actions.updatePointMiddleByTeacherRequest,
	getDetailExamReq: Actions.getDetailExamByTeacherRequest,
	getSubjectAllReq: Actions.getSubjectAllOfClassByTeacherRequest,
	getPointSubjectClassReq: Actions.getPointSubjectStudentOfClassByTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
