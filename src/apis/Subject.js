import api from './restful';

const { restful } = api;

async function getAll(req) {
	try {
		const res = await restful.GET('/api/v1/subjects/all', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjects(req) {
	try {
		const res = await restful.GET('/api/v1/subjects', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectsGroupFile(req) {
	try {
		const res = await restful.GET('/api/v1/subjects/getAndSearchSubject', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectAllBySector(req) {
	try {
		const res = await restful.GET('/api/v1/group-subjects', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getOtherSubjectsOfClass(req) {
	try {
		const res = await restful.GET('/api/v1/group-subjects/getOtherSubjects', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getInfoSubject(ID) {
	try {
		const res = await restful.GET(`/api/v1/subjects/getInfoBySubject/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectsOfClass(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getSubjectByClass', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getDetailSubject(ID) {
	try {
		const res = await restful.GET(`/api/v1/subjects/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

async function createSubject(req) {
	try {
		const res = await restful.POST('/api/v1/subjects', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateSubject({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/subjects/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}

async function deleteSubject(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/subjects/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
export default {
	getAll,
	getSubjects,
	getSubjectAllBySector,
	getSubjectsGroupFile,
	getOtherSubjectsOfClass,
	getInfoSubject,
	getSubjectsOfClass,
	getDetailSubject,
	createSubject,
	updateSubject,
	deleteSubject,
};
