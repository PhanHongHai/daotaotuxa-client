import api from './restful';

const { restful, exportExcel } = api;

/**
 * export  points of subject in class
 */
async function exportPointsOfSubject({ classID, subjectID }, fileName) {
	try {
		const res = await exportExcel(`/api/v1/points/export-points-class-by-subject/${classID}/${subjectID}`,fileName);
		return res;
	} catch (err) {
		return err;
	}
}
/**
 * get  points
 */
async function getPoinSubjectOfStudent(req) {
	try {
		const res = await restful.GET('/api/v1/points/get-points-by-subject', req);
		return res;
	} catch (err) {
		return err;
	}
}

/**
 * get  points
 */
async function getPoinByStudent() {
	try {
		const res = await restful.GET('/api/v1/points/detail-point-by-student');
		return res;
	} catch (err) {
		return err;
	}
}

/**
 * get  points
 */
async function getPointsByAccountID(ID) {
	try {
		const res = await restful.GET(`/api/v1/points/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

/**
 * submit task
 * @param {*} req
 */
async function submitTask(req) {
	try {
		const res = await restful.POST('/api/v1/points/caculator-point', req);
		return res;
	} catch (err) {
		return err;
	}
}

/**
 * submit task
 * @param {*} req
 */
async function updatePointMiddle({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/points/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	submitTask,
	getPoinSubjectOfStudent,
	getPoinByStudent,
	getPointsByAccountID,
	updatePointMiddle,
	exportPointsOfSubject
};
