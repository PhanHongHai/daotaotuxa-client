import api from './restful';

const { restful } = api;

// student profile

/**
 * get profile by account id
 * @param {*} ID
 */
async function getProfileStudentByID(ID) {
	try {
		const res = await restful.GET(`/api/v1/profiles/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

async function createProfileStudent(req) {
	try {
		const res = await restful.POST('/api/v1/profiles', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function updateProfileStudent({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/profiles/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}

async function removeProfileStudent(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/profiles/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getProfileStudentByID,
	createProfileStudent,
	updateProfileStudent,
	removeProfileStudent,
};
