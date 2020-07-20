import { connect } from 'react-redux';
import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getDetailClassStatus: state.classOfTeacherPage.getDetailClassStatus,
	getStudentOfClassStatus: state.classOfTeacherPage.getStudentOfClassStatus,
	getSubjectOfClassStatus: state.classOfTeacherPage.getSubjectOfClassStatus,
	createSubjectOfClassStatus: state.classOfTeacherPage.createSubjectOfClassStatus,
	updateOfClassStatus: state.classOfTeacherPage.updateOfClassStatus,
	detailClass: state.classOfTeacherPage.detailClass,
	studentsClass: state.classOfTeacherPage.studentsClass,
	subjectsClass: state.classOfTeacherPage.subjectsClass,
});

const mapDispatchToProps = {
	getDetailClassReq: Actions.getDetailClassByTeacherRequest,
	getSubjectClassReq: Actions.getSubjectOfClassByTeacherRequest,
	getStudentClassReq: Actions.getStudentOfClassByTeacherRequest,
	createSubjectReq: Actions.createSubjectByTeacherRequest,
	updateClassReq: Actions.updateClassByTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
