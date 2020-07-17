import api from './restful';

const { restful } = api;

async function getSchedules(req) {
	try {
		const res = await restful.GET('/api/v1/schedules', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getDetailSchedule(ID) {
	try {
		const res = await restful.GET(`/api/v1/schedules/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

async function getScheduleByClassID(req) {
	try {
		const res = await restful.GET('/api/v1/schedules/get-schedule',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createSchedule(req) {
	try {
		const res = await restful.POST('/api/v1/schedules', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateSchedule({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/schedules/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}
async function deleteSchedule(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/schedules/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
  
  getSchedules,
  getDetailSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule,
	getScheduleByClassID
};
