import api from './restful';

const { restful } = api;

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
		const res = await restful.POST(`/api/v1/points/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	submitTask,
	getPoinByStudent,
  getPointsByAccountID,
  updatePointMiddle
};
