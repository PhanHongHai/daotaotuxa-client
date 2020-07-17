import api from './restful';

const {restful} = api;

// get time keeping by student
async function getTimeKeepingByStudent() {
	try {
		const res = await restful.GET('/api/v1/timeKeeping');
		return res;
	} catch (err) {
		return err;
	}
}

// create time keeping by student
async function attendance(req) {
	try {
		const res = await restful.POST('/api/v1/timeKeeping',req);
		return res;
	} catch (err) {
		return err;
	}
}


export default {
  getTimeKeepingByStudent,
  attendance
};