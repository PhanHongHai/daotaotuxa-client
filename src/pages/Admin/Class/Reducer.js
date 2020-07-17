import STATUS from '../../../constands/apiStatus';
import Action from './Action';
import Redux from '../../../utils/redux';

const { createReducers } = Redux;

const initialState = {
	getClassesStatus: STATUS.DEFAULT,
	getTeachersStatus: STATUS.DEFAULT,
	getInfoTeacherStatus: STATUS.DEFAULT,
	getStudentsStatus: STATUS.DEFAULT,
	getStudentOfClassStatus: STATUS.DEFAULT,
	getSectorsStatus: STATUS.DEFAULT,
	searchTeacherForClassStatus: STATUS.DEFAULT,
	getDetailClassStatus: STATUS.DEFAULT,
	filterClassStatus: STATUS.DEFAULT,
	searchClassStatus: STATUS.DEFAULT,
	createClassStatus: STATUS.DEFAULT,
	updateClassStatus: STATUS.DEFAULT,
	deleteClassStatus: STATUS.DEFAULT,
	addStudentToClassStatus: STATUS.DEFAULT,
	addTeacherToClassStatus: STATUS.DEFAULT,
	removeStudentToClassStatus: STATUS.DEFAULT,
	getTotalClassAllTimeStatus: STATUS.DEFAULT,
	getTotalClass30dayStatus: STATUS.DEFAULT,
	getReportClassByTrainingTypeStatus: STATUS.DEFAULT,
	getReportClassByTrainingSectorStatus: STATUS.DEFAULT,
	getReportTotalStudentByTrainingTypeStatus: STATUS.DEFAULT,
	getReportTotalStudentByTrainingSectorStatus: STATUS.DEFAULT,
	getReportTotalClassByYearStatus: STATUS.DEFAULT,
	classes: {
		data: [],
		pagination: {},
	},
	detailClass: {},
	teachers: {
		data: [],
		pagination: {},
	},
	infoTeacher: {},
	students: {
		data: [],
		pagination: {},
	},
	studentsOfClass: {
		data: [],
		pagination: {},
	},
	sector: [],
	totalAlltime: {},
	total30day: {},
};

const reducer = [
	// active when call action get info teacher by classID
	{
		on: Action.getInfoTeacherByClassIDRequest,
		reducer: state => ({
			...state,
			getInfoTeacherStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getInfoTeacherByClassIDSuccess,
		reducer: (state, action) => ({
			...state,
			getInfoTeacherStatus: STATUS.SUCCESS,
			infoTeacher: action.payload,
		}),
	},
	{
		on: Action.getInfoTeacherByClassIDFailure,
		reducer: state => ({
			...state,
			getInfoTeacherStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list sector
	{
		on: Action.getSectorsForClassRequest,
		reducer: state => ({
			...state,
			getSectorsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getSectorsForClassSuccess,
		reducer: (state, action) => ({
			...state,
			getSectorsStatus: STATUS.SUCCESS,
			sector: action.payload,
		}),
	},
	{
		on: Action.getSectorsForClassFailure,
		reducer: state => ({
			...state,
			getSectorsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list teacher
	{
		on: Action.getTeachersRequest,
		reducer: state => ({
			...state,
			getTeachersStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTeachersSuccess,
		reducer: (state, action) => ({
			...state,
			getTeachersStatus: STATUS.SUCCESS,
			teachers: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getTeachersFailure,
		reducer: state => ({
			...state,
			getTeachersStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search teacher
	{
		on: Action.searchTeacherForClassRequest,
		reducer: state => ({
			...state,
			searchTeacherForClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchTeacherForClassSuccess,
		reducer: (state, action) => ({
			...state,
			searchTeacherForClassStatus: STATUS.SUCCESS,
			teachers: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchTeacherForClassFailure,
		reducer: state => ({
			...state,
			searchTeacherForClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list students
	{
		on: Action.getStudentsForClassRequest,
		reducer: state => ({
			...state,
			getStudentsStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getStudentsForClassSuccess,
		reducer: (state, action) => ({
			...state,
			getStudentsStatus: STATUS.SUCCESS,
			students: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getSectorsForClassFailure,
		reducer: state => ({
			...state,
			getStudentsStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list students of class
	{
		on: Action.getStudentOfClassRequest,
		reducer: state => ({
			...state,
			getStudentOfClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getStudentOfClassSuccess,
		reducer: (state, action) => ({
			...state,
			getStudentOfClassStatus: STATUS.SUCCESS,
			studentsOfClass: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getStudentOfClassFailure,
		reducer: state => ({
			...state,
			getStudentOfClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get list class
	{
		on: Action.getClassesRequest,
		reducer: state => ({
			...state,
			getClassesStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getClassesSuccess,
		reducer: (state, action) => ({
			...state,
			getClassesStatus: STATUS.SUCCESS,
			classes: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.getClassesFailure,
		reducer: state => ({
			...state,
			getClassesStatus: STATUS.FAILURE,
		}),
	},
	// active when call action search class
	{
		on: Action.searchClassRequest,
		reducer: state => ({
			...state,
			searchClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.searchClassSuccess,
		reducer: (state, action) => ({
			...state,
			searchClassStatus: STATUS.SUCCESS,
			classes: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.searchClassFailure,
		reducer: state => ({
			...state,
			searchClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action filter class
	{
		on: Action.filterClassRequest,
		reducer: state => ({
			...state,
			filterClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.filterClassSuccess,
		reducer: (state, action) => ({
			...state,
			filterClassStatus: STATUS.SUCCESS,
			classes: {
				data: action.payload.docs,
				pagination: action.payload,
			},
		}),
	},
	{
		on: Action.filterClassFailure,
		reducer: state => ({
			...state,
			filterClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get detail class
	{
		on: Action.getDetailClassRequest,
		reducer: state => ({
			...state,
			getDetailClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getDetailClassSuccess,
		reducer: (state, action) => ({
			...state,
			getDetailClassStatus: STATUS.SUCCESS,
			detailClass: action.payload,
		}),
	},
	{
		on: Action.getDetailClassFailure,
		reducer: state => ({
			...state,
			getDetailClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action create class
	{
		on: Action.createClassRequest,
		reducer: state => ({
			...state,
			createClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.createClassSuccess,
		reducer: state => ({
			...state,
			createClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.createClassFailure,
		reducer: state => ({
			...state,
			createClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update class
	{
		on: Action.updateClassRequest,
		reducer: state => ({
			...state,
			updateClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateClassSuccess,
		reducer: state => ({
			...state,
			updateClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateClassFailure,
		reducer: state => ({
			...state,
			updateClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action update class
	{
		on: Action.updateDetailClassRequest,
		reducer: state => ({
			...state,
			updateClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.updateDetailClassSuccess,
		reducer: state => ({
			...state,
			updateClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.updateDetailClassFailure,
		reducer: state => ({
			...state,
			updateClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action delete class
	{
		on: Action.deleteClassRequest,
		reducer: state => ({
			...state,
			deleteClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.deleteClassSuccess,
		reducer: state => ({
			...state,
			deleteClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.deleteClassFailure,
		reducer: state => ({
			...state,
			deleteClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action add student to class
	{
		on: Action.addStudentToClassRequest,
		reducer: state => ({
			...state,
			addStudentToClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.addStudentToClassSuccess,
		reducer: state => ({
			...state,
			addStudentToClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.addStudentToClassFailure,
		reducer: state => ({
			...state,
			addStudentToClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action add teacher to class
	{
		on: Action.addTeacherToClassRequest,
		reducer: state => ({
			...state,
			addTeacherToClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.addTeacherToClassSuccess,
		reducer: state => ({
			...state,
			addTeacherToClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.addTeacherToClassFailure,
		reducer: state => ({
			...state,
			addTeacherToClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove student to class
	{
		on: Action.removeStudentToClassRequest,
		reducer: state => ({
			...state,
			removeStudentToClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeStudentToClassSuccess,
		reducer: state => ({
			...state,
			removeStudentToClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeStudentToClassFailure,
		reducer: state => ({
			...state,
			removeStudentToClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action add student to detail class
	{
		on: Action.addStudentToDetailClassRequest,
		reducer: state => ({
			...state,
			addStudentToClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.addStudentToDetailClassSuccess,
		reducer: state => ({
			...state,
			addStudentToClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.addStudentToDetailClassFailure,
		reducer: state => ({
			...state,
			addStudentToClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action remove student to detail class
	{
		on: Action.removeStudentToDetailClassRequest,
		reducer: state => ({
			...state,
			removeStudentToClassStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.removeStudentToDetailClassSuccess,
		reducer: state => ({
			...state,
			removeStudentToClassStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.removeStudentToDetailClassFailure,
		reducer: state => ({
			...state,
			removeStudentToClassStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get total class all time
	{
		on: Action.getTotalsClassAllTimeRequest,
		reducer: state => ({
			...state,
			getTotalClassAllTimeStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotalsClassAllTimeSuccess,
		reducer: (state, action) => ({
			...state,
			getTotalClassAllTimeStatus: STATUS.SUCCESS,
			totalAlltime: action.payload,
		}),
	},
	{
		on: Action.getTotalsClassAllTimeFailure,
		reducer: state => ({
			...state,
			getTotalClassAllTimeStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get total class 30day
	{
		on: Action.getTotalsClassByGroupDateRequest,
		reducer: state => ({
			...state,
			getTotalClass30dayStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getTotalsClassByGroupDateSuccess,
		reducer: (state, action) => ({
			...state,
			getTotalClass30dayStatus: STATUS.SUCCESS,
			total30day: action.payload,
		}),
	},
	{
		on: Action.getTotalsClassByGroupDateFailure,
		reducer: state => ({
			...state,
			getTotalClass30dayStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report class by training type
	{
		on: Action.getReportClassByTrainingTypeRequest,
		reducer: state => ({
			...state,
			getReportClassByTrainingTypeStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportClassByTrainingTypeSuccess,
		reducer: state => ({
			...state,
			getReportClassByTrainingTypeStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportClassByTrainingTypeFailure,
		reducer: state => ({
			...state,
			getReportClassByTrainingTypeStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report class by training sector
	{
		on: Action.getReportClassByTrainingSectorRequest,
		reducer: state => ({
			...state,
			getReportClassByTrainingSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportClassByTrainingSectorSuccess,
		reducer: state => ({
			...state,
			getReportClassByTrainingSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportClassByTrainingSectorFailure,
		reducer: state => ({
			...state,
			getReportClassByTrainingSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report total student by training type
	{
		on: Action.getReportTotalStudentByTrainingTypeRequest,
		reducer: state => ({
			...state,
			getReportTotalStudentByTrainingTypeStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportTotalStudentByTrainingTypeSuccess,
		reducer: state => ({
			...state,
			getReportTotalStudentByTrainingTypeStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportTotalStudentByTrainingTypeFailure,
		reducer: state => ({
			...state,
			getReportTotalStudentByTrainingTypeStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report total student by training sector
	{
		on: Action.getReportTotalStudentByTrainingSectorRequest,
		reducer: state => ({
			...state,
			getReportTotalStudentByTrainingSectorStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportTotalStudentByTrainingSectorSuccess,
		reducer: state => ({
			...state,
			getReportTotalStudentByTrainingSectorStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportTotalStudentByTrainingSectorFailure,
		reducer: state => ({
			...state,
			getReportTotalStudentByTrainingSectorStatus: STATUS.FAILURE,
		}),
	},
	// active when call action get report total class by year
	{
		on: Action.getReportTotalClassByYearRequest,
		reducer: state => ({
			...state,
			getReportTotalClassByYearStatus: STATUS.FETCHING,
		}),
	},
	{
		on: Action.getReportTotalClassByYearSuccess,
		reducer: state => ({
			...state,
			getReportTotalClassByYearStatus: STATUS.SUCCESS,
		}),
	},
	{
		on: Action.getReportTotalClassByYearFailure,
		reducer: state => ({
			...state,
			getReportTotalClassByYearStatus: STATUS.FAILURE,
		}),
	},
];
export default createReducers('classPage', reducer, initialState);
