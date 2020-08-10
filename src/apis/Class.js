import api from './restful';

const { restful ,exportExcel} = api;

async function getInfoClassByAccount() {
	try {
		const res = await restful.GET('/api/v1/classes/getInfoClass');
		return res;
	} catch (err) {
		return err;
	}
}
async function getInfoTeacherByClassID(ID) {
	try {
		const res = await restful.GET(`/api/v1/classeDetails/info-teacher/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

async function exportExcelStudentsOfClass(ID) {
	try {
		const res = await exportExcel(`/api/v1/classeDetails/export-students-class/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function getAndSearchStudentOfClass(req) {
	try {
		const res = await restful.GET('/api/v1/classeDetails', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getAndSearchStudentOfClassByTeacher(req) {
	try {
		const res = await restful.GET('/api/v1/classeDetails/students', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getAndSearchClass(req) {
	try {
		const res = await restful.GET('/api/v1/classes', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getAndSearchClassByTrainingSector(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getBySector', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function getDetailClass(ID) {
	try {
		const res = await restful.GET(`/api/v1/classes/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function filterClass(req) {
	try {
		const res = await restful.GET('/api/v1/classes/filter', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createClass(req) {
	try {
		const res = await restful.POST('/api/v1/classes', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateClass({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/classes/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}
async function deleteClass(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/classes/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function addAccountToClass(req) {
	try {
		const res = await restful.POST('/api/v1/classeDetails', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function removeStudentOfClass(ID) {
	try {
		const res = await restful.DELETE(`/api/v1/classeDetails/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getInfoClassByAccount,
	getAndSearchStudentOfClass,
	getAndSearchStudentOfClassByTeacher,
	getAndSearchClass,
	getAndSearchClassByTrainingSector,
	getDetailClass,
	createClass,
	updateClass,
	deleteClass,
	filterClass,
	addAccountToClass,
	removeStudentOfClass,
	getInfoTeacherByClassID,
	exportExcelStudentsOfClass,
};
