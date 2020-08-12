import api from './restful';

const { restful, exportExcel } = api;

/**
 * get  points
 */
async function exportLogPointsOfSchedule({scheduleID,classID}, fileName) {
	try {
		const res = await exportExcel(`/api/v1/logs-point/export-logs-data-schedule/${scheduleID}/${classID}`,fileName);
		return res;
	} catch (err) {
		return err;
	}
}
/**
 * get  points
 */
async function getLogPoinByStudent(req) {
	try {
		const res = await restful.GET('/api/v1/logs-point/log-by-student', req);
		return res;
	} catch (err) {
		return err;
	}
}

/**
 * get  points
 */
async function getLogPoinByTeacher(req) {
	try {
		const res = await restful.GET('/api/v1/logs-point/log-by-teacher', req);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getLogPoinByTeacher,
	getLogPoinByStudent,
	exportLogPointsOfSchedule
};
