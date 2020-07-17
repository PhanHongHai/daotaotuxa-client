import { connect } from 'react-redux';
import Component from './Component';
import PartnerAction from '../Dashboard/Action';

const mapStateToProps = state => ({
	createStudentStatus: state.partnerDasboardPage.createStudentStatus,
});

const mapDispatchToProps = {
	createStudentReq: PartnerAction.createStudentByPartnerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
