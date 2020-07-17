import { connect } from 'react-redux';
import Component from './Component';
import PartnerAction from '../Dashboard/Action';

const mapStateToProps = state => ({
	getDetailStudentStatus: state.partnerDasboardPage.getDetailStudentStatus,
	updateStudentStatus: state.partnerDasboardPage.updateStudentStatus,
	deleteStudentStatus: state.partnerDasboardPage.deleteStudentStatus,
	studentDetail: state.partnerDasboardPage.studentDetail,
});

const mapDispatchToProps = {
	getDetailStudentReq: PartnerAction.getDetailStudentByPartnerRequest,
	updateStudentReq:PartnerAction.updateStudentByPartnerRequest,
	deleteStudentReq:PartnerAction.deleteStudentByPartnerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
