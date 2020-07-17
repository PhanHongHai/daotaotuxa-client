import { connect } from 'react-redux';
import Component from './Component';
import ClassAction from './Action';


const mapStateToProps = state => ({
	getClassesStatus: state.classPage.getClassesStatus,
	getTeachersStatus: state.classPage.getTeachersStatus,
	getStudentsStatus: state.classPage.getStudentsStatus,
	getStudentOfClassStatus: state.classPage.getStudentOfClassStatus,
	filterClassStatus: state.classPage.getClassesStatus,
	searchClassStatus: state.classPage.getClassesStatus,
	createClassStatus: state.classPage.getClassesStatus,
	deleteClassStatus: state.classPage.getClassesStatus,
	addStudentToClassStatus: state.classPage.addStudentToClassStatus,
	removeStudentToClassStatus: state.classPage.removeStudentToClassStatus,
	getSectorsStatus: state.classPage.classes,
	classes: state.classPage.classes,
	sector: state.classPage.sector,
	students: state.classPage.students,
	studentsOfClass: state.classPage.studentsOfClass,
});

const mapDispatchToProps = {
	getClassesReq: ClassAction.getClassesRequest,
	filterReq: ClassAction.filterClassRequest,
	searchClassReq: ClassAction.searchClassRequest,
	createClassReq: ClassAction.createClassRequest,
	deleteClassReq: ClassAction.deleteClassRequest,
	getTeachersReq: ClassAction.getTeachersRequest,
	searchTeacherReq: ClassAction.searchTeacherForClassRequest,
	getSectorsReq: ClassAction.getSectorsForClassRequest,
	getStudentsReq: ClassAction.getStudentsForClassRequest,
	getStudentOfClassReq: ClassAction.getStudentOfClassRequest,
	addStudentToClassReq:ClassAction.addStudentToClassRequest,
	removeStudentClassReq:ClassAction.removeStudentToClassRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
