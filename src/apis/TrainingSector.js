import api from './restful';

const { restful } = api;

async function getAndSearchSector(req) {
	try {
		const res = await restful.GET('/api/v1/trainingSectors', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getSubjectForSector(req) {
	try {
		const res = await restful.GET('/api/v1/group-subjects/getAllList', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectAllOfSector(req) {
	try {
		const res = await restful.GET('/api/v1/group-subjects', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectOfSector(req) {
	try {
		const res = await restful.GET('/api/v1/group-subjects/getListSubject', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getSubjectOfSectorGroupFile(req) {
	try {
		const res = await restful.GET('/api/v1/group-subjects/getListSubjectGroupFile', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function addSubjectToSector(req) {
	try {
		const res = await restful.POST('/api/v1/group-subjects', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function removeSubjectFromSector(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/group-subjects/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

async function getAll(req) {
	try {
		const res = await restful.GET('/api/v1/trainingSectors/all', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function createSector(req) {
	try {
		const res = await restful.POST('/api/v1/trainingSectors', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function updateSector({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/trainingSectors/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}

async function deleteSector(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/trainingSectors/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getAndSearchSector,
	createSector,
	updateSector,
	deleteSector,
	getAll,
	getSubjectForSector,
	getSubjectOfSector,
	getSubjectOfSectorGroupFile,
	addSubjectToSector,
	removeSubjectFromSector,
	getSubjectAllOfSector

};
