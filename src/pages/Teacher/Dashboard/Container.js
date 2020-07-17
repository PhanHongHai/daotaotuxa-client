import { connect } from 'react-redux';
import Component from './Component';
import Actions from './Action';

const mapStateToProps = state => ({
	getInfoClassStatus: state.dashboadTeacherPage.getInfoClassStatus,
	infoClass: state.dashboadTeacherPage.infoClass,
});

const mapDispatchToProps = {
	getInfoClassReq: Actions.getInfoClassByTeacherRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
