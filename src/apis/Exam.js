import api from './restful';

const {restful} = api;


async function getExams(req) {
	try {
		const res = await restful.GET('/api/v1/exams',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getDetailExam(ID) {
	try {
		const res = await restful.GET(`/api/v1/exams/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function createExam(req) {
	try {
		const res = await restful.POST('/api/v1/exams',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createExamAuto(req) {
	try {
		const res = await restful.POST('/api/v1/exams/auto',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateExam({req,ID}) {
	try {
		const res = await restful.PATCH(`/api/v1/exams/${ID}`,req);
		return res;
	} catch (err) {
		return err;
	}
}
async function removeExam(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/exams/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {

  getDetailExam,
  getExams,
  createExam,
  updateExam,
  removeExam,
	createExamAuto
};