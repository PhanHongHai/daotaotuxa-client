import api from './restful';

const {restful} = api;

async function getAndSearchQuestion(req) {
	try {
		const res = await restful.GET('/api/v1/questions',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getRandomQuestionsForQuickTest(req) {
	try {
		const res = await restful.GET('/api/v1/questions/get-questions-for-quick-test',req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getQuestionsForUpdateExam(req) {
	try {
		const res = await restful.GET('/api/v1/questions/exam',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getTotalQuestion(req) {
	try {
		const res = await restful.GET('/api/v1/questions/total-question',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getDetailQuestion(ID) {
	try {
		const res = await restful.GET(`/api/v1/questions/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function createQuestion(req) {
	try {
		const res = await restful.POST('/api/v1/questions',req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateQuestion({req,ID}) {
	try {
		const res = await restful.PATCH(`/api/v1/questions/${ID}`,req);
		return res;
	} catch (err) {
		return err;
	}
}
async function removeQuestion(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/questions/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getQuestionsForUpdateExam,
  getAndSearchQuestion,
  getDetailQuestion,
  createQuestion,
  updateQuestion,
  removeQuestion,
  getTotalQuestion,
	getRandomQuestionsForQuickTest
};