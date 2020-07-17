import api from './restful';

const { restful } = api;

// analysis account
// get totals report account dashboard admin
async function getTotalsDashboard(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportsTotalsDashboard', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get totals report account
async function getTotalsAccountByGroupDate(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportsTotals', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report account admin
async function getReportsAccount(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/analysisAccount', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report user sex
async function getReportUserSex(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportTotalsSex', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report user area
async function getReportUserArea(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportAreaUser', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report student group date by partner 
async function getReportStudentGroupDateByPartner(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportAccountStudentByDatesOfPartner', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report student group year by partner 
async function getReportStudentGroupYearByPartner(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportAccountStudentByYearOfPartner', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report student group area by partner 
async function getReportStudentGroupAreaByPartner(req) {
	try {
		const res = await restful.GET('/api/v1/accounts/reportAccountStudentByAreaOfPartner', req);
		return res;
	} catch (err) {
		return err;
	}
}

// analysis class
// get total class all time
async function getTotalClassAllTime(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getTotalsAllTime', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get total class by group date
async function getTotalClassByGroupDate(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getTotalsByGroupDate', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report class by training type
async function getReportClassByTrainingType(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getReportClassByTrainingType', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report class by training sector
async function getReportClassByTrainingSector(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getReportClassByTrainingSector', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report student by training type
async function getReportStudentByTrainingType(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getReportStudentByTrainingType', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report student by training sector
async function getReportStudentByTrainingSector(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getReportStudentByTrainingSector', req);
		return res;
	} catch (err) {
		return err;
	}
}
// get report total class of month by year
async function getReportTotalClassByYear(req) {
	try {
		const res = await restful.GET('/api/v1/classes/getReportTotalClassByYear', req);
		return res;
	} catch (err) {
		return err;
	}
}

export default {
	getTotalsDashboard,
	getReportsAccount,
	getTotalsAccountByGroupDate,
	getReportUserSex,
	getReportUserArea,
	getReportStudentGroupDateByPartner,
	getReportStudentGroupYearByPartner,
	getReportStudentGroupAreaByPartner,
  // ###########
	getTotalClassAllTime,
	getTotalClassByGroupDate,
	getReportClassByTrainingType,
	getReportClassByTrainingSector,
	getReportStudentByTrainingType,
	getReportStudentByTrainingSector,
	getReportTotalClassByYear,
};
