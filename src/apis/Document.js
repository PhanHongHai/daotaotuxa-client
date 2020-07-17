import api from './restful';

const { restful } = api;

async function getDocuments(req) {
	try {
		const res = await restful.GET('/api/v1/documents', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getDetailDocument(ID) {
	try {
		const res = await restful.GET(`/api/v1/documents/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function createDocument(req) {
	try {
		const res = await restful.POST('/api/v1/documents', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateDocument({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/documents/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}
async function deleteDocument(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/documents/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getDocuments,
	getDetailDocument,
	createDocument,
	updateDocument,
	deleteDocument,
};
