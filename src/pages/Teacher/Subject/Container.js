import { connect } from 'react-redux';
import Component from './Component';
import SubjectAction from './Action';

const mapStateToProps = state => ({
	getDetailSubjectStatus: state.subjectOfTeacherPage.getDetailSubjectStatus,
	updateSubjectStatus: state.subjectOfTeacherPage.updateSubjectStatus,
	deleteSubjectStatus: state.subjectOfTeacherPage.deleteSubjectStatus,
	getDocumentsStatus: state.subjectOfTeacherPage.getDocumentStatus,
	deleteFileDocStatus: state.subjectOfTeacherPage.deleteFileDocStatus,
	getDetailDocumentStatus: state.subjectOfTeacherPage.getDetailDocumentStatus,
	createDocumentStatus: state.subjectOfTeacherPage.createDocumentStatus,
	updateDocumentStatus: state.subjectOfTeacherPage.updateDocumentStatus,
	deleteDocumentStatus: state.subjectOfTeacherPage.deleteDocumentStatus,
	detailSubject: state.subjectOfTeacherPage.detailSubject,
	documents: state.subjectOfTeacherPage.documents,
	detailDocument: state.subjectOfTeacherPage.detailDocument,
});

const mapDispatchToProps = {
	getDetailSubjectReq: SubjectAction.getDetailSubjectTeacherPageRequest,
	getDetailDocumentReq: SubjectAction.getDetailDocumentTeacherPageRequest,
	getDocumetsReq: SubjectAction.getDocumentsTeacherPageRequest,
	createDocumentReq: SubjectAction.createDocumentTeacherPageRequest,
	updateDocumentReq: SubjectAction.updateDocumentTeacherPageRequest,
	deleteDocumentReq: SubjectAction.deleteDocumentTeacherPageRequest,
	updateSubjectReq: SubjectAction.updateSubjectTeacherPageRequest,
	deleteSubjectReq: SubjectAction.deleteDetailSubjectTeacherPageRequest,
	removeFileDocReq: SubjectAction.removeFileDocTeacherPageRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
