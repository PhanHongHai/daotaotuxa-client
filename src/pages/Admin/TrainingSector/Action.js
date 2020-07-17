import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const { getSectorsRequest, getSectorsSuccess, getSectorsFailure } = createAsyncAction('getSectors', 'GET_SECTORS');
const { getSubjectsForSectorRequest, getSubjectsForSectorSuccess, getSubjectsForSectorFailure } = createAsyncAction(
	'getSubjectsForSector',
	'GET_SUBJECT_FOR_SECTOR',
);
const { getSubjectsOfSectorRequest, getSubjectsOfSectorSuccess, getSubjectsOfSectorFailure } = createAsyncAction(
	'getSubjectsOfSector',
	'GET_SUBJECT_OF_SECTOR',
);
const { addSubjectToSectorRequest, addSubjectToSectorSuccess, addSubjectToSectorFailure } = createAsyncAction(
	'addSubjectToSector',
	'ADD_SUBJECT_TO_SECTOR',
);
const {
	removeSubjectFromSectorRequest,
	removeSubjectFromSectorSuccess,
	removeSubjectFromSectorFailure,
} = createAsyncAction('removeSubjectFromSector', 'REMOVE_SUBJECT_FROM_SECTOR');

const { searchSectorRequest, searchSectorSuccess, searchSectorFailure } = createAsyncAction(
	'searchSector',
	'SEARCH_SECTOR',
);

const { createSectorRequest, createSectorSuccess, createSectorFailure } = createAsyncAction(
	'createSector',
	'CREATE_SECTOR',
);

const { updateSectorRequest, updateSectorSuccess, updateSectorFailure } = createAsyncAction(
	'updateSector',
	'UPDATE_SECTOR',
);

const { deleteSectorRequest, deleteSectorSuccess, deleteSectorFailure } = createAsyncAction(
	'deleteSector',
	'DELETE_SECTOR',
);

const Actions = {
	getSectorsRequest,
	getSectorsSuccess,
	getSectorsFailure,

	getSubjectsForSectorRequest,
	getSubjectsForSectorSuccess,
	getSubjectsForSectorFailure,

	getSubjectsOfSectorRequest,
	getSubjectsOfSectorSuccess,
	getSubjectsOfSectorFailure,

	addSubjectToSectorRequest,
	addSubjectToSectorSuccess,
	addSubjectToSectorFailure,

	removeSubjectFromSectorRequest,
	removeSubjectFromSectorSuccess,
	removeSubjectFromSectorFailure,

	searchSectorRequest,
	searchSectorSuccess,
	searchSectorFailure,

	createSectorRequest,
	createSectorSuccess,
	createSectorFailure,

	updateSectorRequest,
	updateSectorSuccess,
	updateSectorFailure,

	deleteSectorRequest,
	deleteSectorSuccess,
	deleteSectorFailure,
};
export default Actions;
