import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getSectorsStatus: STATUS.DEFAULT,
	getSubjectsForSectorStatus: STATUS.DEFAULT,
	getSubjectsOfSectorStatus: STATUS.DEFAULT,
	addSubjectToSectorStatus: STATUS.DEFAULT,
	removeSubjectOfSectorStatus: STATUS.DEFAULT,
	searchSectorStatus: STATUS.DEFAULT,
	createSectorStatus: STATUS.DEFAULT,
	updateSectorStatus: STATUS.DEFAULT,
	deleteSectorStatus: STATUS.DEFAULT,
	sectors: {
		data: [],
		pagination: {},
	},
	subjectsOfSector: {
		data: [],
		pagination: {},
	},
	subjectsForSector: {
		data: [],
		pagination: {},
	},
};

const reducer = [
	// active when call action get sectors
	{
		on: Action.getSectorsRequest,
		reducer: state => ({
			...state,
			getSectorsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSectorsSuccess,
		reducer: (state, action) => ({
			...state,
			getSectorsStatus: STATUS.SUCCESS,
			sectors: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSectorsFailure,
		reducer: state => ({
			...state,
			getSectorsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get and search subjects for sector
	{
		on: Action.getSubjectsForSectorRequest,
		reducer: state => ({
			...state,
			getSubjectsForSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsForSectorSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsForSectorStatus: STATUS.SUCCESS,
			subjectsForSector: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubjectsForSectorFailure,
		reducer: state => ({
			...state,
			getSubjectsForSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get and search subjects of sector
	{
		on: Action.getSubjectsOfSectorRequest,
		reducer: state => ({
			...state,
			getSubjectsOfSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSubjectsOfSectorSuccess,
		reducer: (state, action) => ({
			...state,
			getSubjectsOfSectorStatus: STATUS.SUCCESS,
			subjectsOfSector: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSubjectsOfSectorFailure,
		reducer: state => ({
			...state,
			getSubjectsOfSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search sector
	{
		on: Action.searchSectorRequest,
		reducer: state => ({
			...state,
			searchSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchSectorSuccess,
		reducer: (state, action) => ({
			...state,
			searchSectorStatus: STATUS.SUCCESS,
			sectors: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchSectorFailure,
		reducer: state => ({
			...state,
			searchSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action add subject to sector
	{
		on: Action.addSubjectToSectorRequest,
		reducer: state => ({
			...state,
			addSubjectToSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.addSubjectToSectorSuccess,
		reducer: state => ({
			...state,
			addSubjectToSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.addSubjectToSectorFailure,
		reducer: state => ({
			...state,
			addSubjectToSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove subject to sector
	{
		on: Action.removeSubjectFromSectorRequest,
		reducer: state => ({
			...state,
			removeSubjectOfSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeSubjectFromSectorSuccess,
		reducer: state => ({
			...state,
			removeSubjectOfSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeSubjectFromSectorFailure,
		reducer: state => ({
			...state,
			removeSubjectOfSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create sector
	{
		on: Action.createSectorRequest,
		reducer: state => ({
			...state,
			createSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createSectorSuccess,
		reducer: state => ({
			...state,
			createSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createSectorFailure,
		reducer: state => ({
			...state,
			createSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update sector
	{
		on: Action.updateSectorRequest,
		reducer: state => ({
			...state,
			updateSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateSectorSuccess,
		reducer: state => ({
			...state,
			updateSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateSectorFailure,
		reducer: state => ({
			...state,
			updateSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete sector
	{
		on: Action.deleteSectorRequest,
		reducer: state => ({
			...state,
			deleteSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteSectorSuccess,
		reducer: state => ({
			...state,
			deleteSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteSectorFailure,
		reducer: state => ({
			...state,
			deleteSectorStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('trainingSectorPage', reducer, initialState);
