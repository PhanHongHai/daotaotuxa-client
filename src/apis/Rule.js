import api from './restful';

const {restful} = api;

async function getRules(req) {
	try {
		const res = await restful.GET('/api/v1/rules', req);
		return res;
	} catch (err) {
		return err;
	}
}
async function getGroupRuleByAccount() {
	try {
		const res = await restful.GET('/api/v1/group-rules');
		return res;
	} catch (err) {
		return err;
	}
}
async function getGroupRuleByID(ID) {
	try {
		const res = await restful.GET(`/api/v1/group-rules/${ID}`);
		return res;
	} catch (err) {
		return err;
	}
}


async function decentralization(req) {
	try {
		const res = await restful.POST('/api/v1/group-rules',req);
		return res;
	} catch (err) {
		return err;
	}
}


export default {
	getRules,
	decentralization,
	getGroupRuleByAccount,
	getGroupRuleByID
};