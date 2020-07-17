import api from './restful';

const { restful, } = api;
async function login(req) {
	try {
		const res = await restful.POST('/api/v1/login', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get info account
async function getProfile(req) {
	try {
		const res = await restful.GET('/api/v1/fetch-profile', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getAndSearch(req) {
	try {
		const res = await restful.GET('/api/v1/accounts', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getAndSearchAccountNonClass(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/searchAccountNonClass', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getAndSearchAccountNotApprove(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/searchAccountNotApprove', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getDetailAccount(ID) {
	try {
		const res = await restful.GET(`/api/v1/accounts/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function authAccount(req) {
	try {
		const res = await restful.POST('/api/v1/accounts/auth-account', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createAccount(req) {
	try {
		const res = await restful.POST('/api/v1/accounts', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createStudent(req) {
	try {
		const res = await restful.POST('/api/v1/accounts/student', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createTeacher(req) {
	try {
		const res = await restful.POST('/api/v1/accounts/teacher', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function createPartner(req) {
	try {
		const res = await restful.POST('/api/v1/accounts/partner', req);
		return res;
	} catch (err) {
		return err;
	}
}

async function updateAccount({ req, ID }) {
	try {
		const res = await restful.PATCH(`/api/v1/accounts/${ID}`, req);
		return res;
	} catch (err) {
		return err;
	}
}
async function updateProfile(req) {
	try {
		const res = await restful.PATCH('/api/v1/update-account', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function removeAccount(req) {
	try {
		const res = await restful.DELETE(`/api/v1/accounts/${req}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function checkActiveAccount(req) {
	try {
		const res = await restful.GET(`/api/v1/check-active/${req}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function activeAccount(req) {
	try {
		const res = await restful.PATCH(`/api/v1/active/${req}`);
		return res;
	} catch (err) {
		return err;
	}
}
async function resendActiveAccountMail(req) {
	try {
		const res = await restful.POST('/api/v1/resend-verify', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function resendForgotPasswordMail(req) {
	try {
		const res = await restful.POST('/api/v1/resend-forgot-password', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function resetPassword(req) {
	try {
		const res = await restful.PATCH('/api/v1/reset-password', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function changePassword(req) {
	try {
		const res = await restful.PATCH('/api/v1/change-password', req);
		return res;
	} catch (err) {
		return err;
	}
}
// partner
async function getAndSearchStudentByPartner(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/partner', req);
		return res;
	} catch (err) {
		return err;
	}
}


export default {
	login,
	getProfile,
	getAndSearch,
	getDetailAccount,
	getAndSearchAccountNonClass,
	createAccount,
	createStudent,
	createTeacher,
	createPartner,
	updateAccount,
	updateProfile,
	removeAccount,
	activeAccount,
	resendActiveAccountMail,
	resendForgotPasswordMail,
	resetPassword,
	checkActiveAccount,
	changePassword,
	getAndSearchStudentByPartner,
	getAndSearchAccountNotApprove,
	authAccount
};
