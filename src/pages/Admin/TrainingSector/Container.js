import { connect } from 'react-redux';
import Component from './Component';

import TrainingSectorAction from './Action';




const mapStateToProps = (state) => ({
  getSectorsStatus:state.trainingSectorPage.getSectorsStatus,
  getSubjectsForSectorStatus:state.trainingSectorPage.getSubjectsForSectorStatus,
  getSubjectsOfSectorStatus:state.trainingSectorPage.getSubjectsOfSectorStatus,
  addSubjectToSectorStatus:state.trainingSectorPage.addSubjectToSectorStatus,
  removeSubjectOfSectorStatus:state.trainingSectorPage.removeSubjectOfSectorStatus,
  searchSectorStatus:state.trainingSectorPage.searchSectorStatus,
  createSectorStatus:state.trainingSectorPage.createSectorStatus,
  updateSectorStatus:state.trainingSectorPage.updateSectorStatus,
  deleteSectorStatus:state.trainingSectorPage.deleteSectorStatus,
  sectors:state.trainingSectorPage.sectors,
  subjectsOfSector:state.trainingSectorPage.subjectsOfSector,
  subjectsForSector:state.trainingSectorPage.subjectsForSector,
});

const mapDispatchToProps = {
  getSectorsReq:TrainingSectorAction.getSectorsRequest,
  getSubjectsForSectorReq:TrainingSectorAction.getSubjectsForSectorRequest,
  getSubjectsOfSectorReq:TrainingSectorAction.getSubjectsOfSectorRequest,
  addSubjectToSectorReq:TrainingSectorAction.addSubjectToSectorRequest,
  removeSubjectFromSectorReq:TrainingSectorAction.removeSubjectFromSectorRequest,
  searchSectorReq:TrainingSectorAction.searchSectorRequest,
  createSectorReq:TrainingSectorAction.createSectorRequest,
  updateSectorReq:TrainingSectorAction.updateSectorRequest,
  deleteSectorReq:TrainingSectorAction.deleteSectorRequest,
};

export default connect(mapStateToProps,mapDispatchToProps)(Component);
