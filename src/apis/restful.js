const API_URL = process.env.NODE_ENV === 'production' ? 'http://103.130.218.161:9000' : 'http://localhost:9000';

async function request(path, method, payload = {}) {
	try {
		const url = new URL(`${API_URL}${path}`);
		const token = localStorage.getItem('token');
		if (method === 'GET') Object.keys(payload).forEach(key => url.searchParams.append(key, payload[key]));
		const options = {
			method,
			headers: {
				accessToken: token || '',
				'Content-Type': 'application/json',
			},
		};
		if (method === 'POST' || method === 'PATCH') options.body = JSON.stringify(payload);
		const res = await fetch(url, options);
		if (res.status > 200) throw await res.json();
		return await res.json();
	} catch (err) {
		/* eslint-disable */
		if (err.toString().includes('Failed to fetch'))
			throw {
				error: 'Failed to fetch',
			};
		else throw err;
		/* eslint-disable */
	}
}

async function uploadFile(path, payload) {
	try {
		const url = new URL(`${API_URL}${path}`);
		const token = localStorage.getItem('token');
		const options = {
			method: 'POST',
			headers: {
				accessToken: token || '',
			},
			body: payload,
		};
		const res = await fetch(url, options);
		if (res.status > 200) throw await res.json();
		return await res.json();
	} catch (err) {
		throw err;
	}
}
const restful = {
	GET: (path, params) => request(path, 'GET', params),
	POST: (path, body) => request(path, 'POST', body),
	PATCH: (path, body) => request(path, 'PATCH', body),
	DELETE: (path, params) => request(path, 'DELETE', params),
};

export default { restful, uploadFile };
