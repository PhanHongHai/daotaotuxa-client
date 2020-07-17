import Redux from '../../../utils/redux';

const { createAsyncAction } = Redux;

const {
	getScheduleOfClassByClassIDRequest,
	getScheduleOfClassByClassIDSuccess,
	getScheduleOfClassByClassIDFailure,
} = createAsyncAction('getScheduleOfClassByClassID', 'GET_SCHEDULE_OF_CLASS_BY_CLASS_ID');

const Actions = {
	getScheduleOfClassByClassIDRequest,
	getScheduleOfClassByClassIDSuccess,
	getScheduleOfClassByClassIDFailure,
};

export default Actions;
