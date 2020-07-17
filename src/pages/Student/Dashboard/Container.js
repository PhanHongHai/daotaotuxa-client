import { connect } from 'react-redux';
import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getInfoClassStatus: state.dashboadStudentPage.getInfoClassStatus,
	getTimeKeepingOfStudentStatus: state.dashboadStudentPage.getTimeKeepingOfStudentStatus,
	attendanceByStudentStatus: state.dashboadStudentPage.attendanceByStudentStatus,
	infoClass: state.dashboadStudentPage.infoClass,
	timeKeeping: state.dashboadStudentPage.timeKeeping,
});

const mapDispatchToProps = {
	getInfoClassReq: Actions.getDetailOfClassByStudentRequest,
	getTimeKeepingReq: Actions.getTimeKeepingOfStudentRequest,
	attendanceReq: Actions.attendanceByStudentRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
