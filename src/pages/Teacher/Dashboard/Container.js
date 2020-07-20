import { connect } from 'react-redux';
import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getInfoClassStatus: state.dashboadTeacherPage.getInfoClassStatus,
	updateStatusClassStatus: state.dashboadTeacherPage.updateStatusClassStatus,
	infoClass: state.dashboadTeacherPage.infoClass,
});

const mapDispatchToProps = {
	getInfoClassReq: Actions.getInfoClassByTeacherRequest,
	updateClassReq: Actions.updateStatusClassByTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
