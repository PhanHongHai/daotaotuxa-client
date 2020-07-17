import {connect} from 'react-redux';

import SettingAction from './Action';
import Component from './Component';


const mapStateToProps = (state) => ({
  getRulesStatus:state.settingPage.getRulesStatus,
  getListSubAdminStatus:state.settingPage.getListSubAdminStatus,
  searchSubAdminStatus:state.settingPage.searchSubAdminStatus,
  createSubAdminStatus:state.settingPage.createSubAdminStatus,
  updateSubAdminStatus:state.settingPage.updateSubAdminStatus,
  deleteSubAdminStatus:state.settingPage.deleteSubAdminStatus,
  decentralizationStatus:state.settingPage.decentralizationStatus,
  listSubAdmin:state.settingPage.listSubAdmin,
  rules:state.settingPage.rules,
  getGroupRuleStatus:state.settingPage.getGroupRuleStatus,
  groupRule:state.settingPage.groupRule,
});

const mapDispatchToProps = {
 getRuleReq:SettingAction.getRulesRequest,
 getSubAdminReq:SettingAction.getSubAdminRequest,
 searchSubAdminReq:SettingAction.searchSubAdminRequest,
 createSunAdminReq:SettingAction.createSubAdminRequest,
 updateSubAdminReq:SettingAction.updateSubAdminRequest,
 deleteSubAdminReq:SettingAction.deleteSubAdminRequest,
 getGroupRuleReq:SettingAction.getGroupRuleByAccountIDRequest,
 decentralizationReq:SettingAction.decentralizationSubAdminRequest,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);