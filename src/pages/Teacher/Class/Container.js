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
	detailClass: state.classOfTeacherPage.detailClass,
	studentsClass: state.classOfTeacherPage.studentsClass,
	subjectsClass: state.classOfTeacherPage.subjectsClass,
	schedulesClass: state.classOfTeacherPage.schedulesClass,
	detailExam: state.classOfTeacherPage.detailExam,
	logsScheduleClass: state.classOfTeacherPage.logsScheduleClass,
});

const mapDispatchToProps = {
	getDetailClassReq: Actions.getDetailClassByTeacherRequest,
	getSubjectClassReq: Actions.getSubjectOfClassByTeacherRequest,
	getStudentClassReq: Actions.getStudentOfClassByTeacherRequest,
	getScheduleClassReq: Actions.getScheduleOfClassByTeacherRequest,
	getLogScheduleClassReq: Actions.getLogsScheduleOfClassByTeacherRequest,
	createSubjectReq: Actions.createSubjectByTeacherRequest,
	updateClassReq: Actions.updateClassByTeacherRequest,
	getDetailExamReq: Actions.getDetailExamByTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
