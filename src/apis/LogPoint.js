import api from './restful';

const { restful } = api;

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
};
