import api from './restful';

const { restful } = api;

async function getSubjectProgressByStudent() {
	try {
		const res = await restful.GET('/api/v1/subject-progress');
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectProgressAllByStudentID(ID) {
	try {
		const res = await restful.GET(`/api/v1/subject-progress/student/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function getDetailSubjectProgress(req) {
	try {
		const res = await restful.GET('/api/v1/subject-progress/detail',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createProgress(req) {
	try {
		const res = await restful.POST('/api/v1/subject-progress', req);
		return res;
	} catch (err) {
		return err;
	}
}


export default {
	getSubjectProgressAllByStudentID,
	getDetailSubjectProgress,
  createProgress,
	getSubjectProgressByStudent
};
